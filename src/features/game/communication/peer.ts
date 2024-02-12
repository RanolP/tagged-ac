'use client';

import * as PeerJS from 'peerjs';
import { DataConnection } from 'peerjs';
import { createSignal } from 'solid-js';

import { createEventYielder } from '~/utils/event-yielder';

// Due to weird import bug on CJS modules
const Peer: typeof PeerJS.Peer =
  (PeerJS.default as any).default ?? PeerJS.default;

const [myPeerId, setMyPeerId] = createSignal<string>();
const [connection, setConnection] = createSignal<
  [string, DataConnection] | [null, null]
>([null, null]);

let isHosting = false;

const peer = new Peer();
peer.on('open', (id) => setMyPeerId(id));
peer.on('connection', (conn) => {
  if (!isHosting) {
    conn.close();
    return;
  }
});

function join(id: string): Promise<void> {
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
}

// @TODO: Graceful Shutdown
function leave() {
  const [, conn] = connection();
  if (!conn) return;

  conn.close();
  setConnection([null, null]);
}

function startHost() {
  isHosting = true;
  const { stream, listener, done } = createEventYielder<DataConnection>();
  peer.on('connection', listener);
  const { promise, resolve: stopHosting } = Promise.withResolvers<void>();
  promise.then(() => {
    isHosting = false;
    done();
  });
  return { stream, stopHosting };
}

export { join, leave, myPeerId, startHost };
