'use client';

import * as PeerJS from 'peerjs';
import { DataConnection } from 'peerjs';
import {
  Accessor,
  createContext,
  createSignal,
  ParentProps,
  useContext,
} from 'solid-js';

import { createEventYielder } from '~/utils/event-yielder';

// Due to weird import bug on CJS modules
const Peer: typeof PeerJS.Peer =
  (PeerJS.default as any).default ?? PeerJS.default;

const PeerContext = createContext<PeerInstance>();

export interface PeerInstance {
  myId: Accessor<string | undefined>;
  join: (id: string) => Promise<void>;
  leave: () => void;
  startHost: () => {
    stream: AsyncGenerator<DataConnection>;
    stopHosting: () => void;
  };
}

export function PeerProvider(props: ParentProps) {
  const peer = new Peer();

  const [isHosting, setHosting] = createSignal(false);

  const [myId, setMyId] = createSignal<string>();
  peer.on('open', (id) => setMyId(id));

  const [connection, setConnection] = createSignal<
    [string, DataConnection] | [null, null]
  >([null, null]);
  peer.on('connection', (conn) => {
    if (!isHosting) {
      conn.close();
      return;
    }
  });

  const join = (id: string): Promise<void> => {
    const [currentConnectionId] = connection();
    if (currentConnectionId === id) return Promise.resolve();

    const { promise, resolve, reject } = Promise.withResolvers<void>();
    leave();

    const conn = peer.connect(id, {});
    conn.on('open', () => {
      setConnection([id, conn]);
      resolve();
    });
    conn.on('error', (e) => reject(e));

    return promise;
  };

  // @TODO: Graceful Shutdown
  function leave() {
    const [, conn] = connection();
    if (!conn) return;

    conn.close();
    setConnection([null, null]);
  }

  function startHost() {
    setHosting(true);
    const { stream, listener, done } = createEventYielder<DataConnection>();
    peer.on('connection', listener);
    const { promise, resolve: stopHosting } = Promise.withResolvers<void>();
    promise.then(() => {
      setHosting(false);
      done();
    });
    return { stream, stopHosting };
  }

  return (
    <PeerContext.Provider
      value={{
        myId,
        join,
        leave,
        startHost,
      }}
    >
      {props.children}
    </PeerContext.Provider>
  );
}

export function usePeerInstance() {
  const value = useContext(PeerContext);
  if (!value) throw new Error('no peer instance');
  return value;
}
