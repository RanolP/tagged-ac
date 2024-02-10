'use client';

import * as PeerJS from 'peerjs';
import { DataConnection } from 'peerjs';
import { createSignal } from 'solid-js';

import { createEventYielder } from '~/utils/event-yielder';

// Due to weird import bug on CJS modules
const Peer: typeof PeerJS.Peer =
  (PeerJS.default as any).default ?? PeerJS.default;

const [myPeerId, setMyPeerId] = createSignal<string>();

let isHosting = false;

let conn: DataConnection | undefined;
const peer = new Peer();
peer.on('open', (id) => setMyPeerId(id));
peer.on('connection', (conn) => {
  if (!isHosting) {
    conn.close();
    return;
  }
});

function join(id: string) {
  leave();

  conn = peer.connect(id, {});
}

// @TODO: Graceful Shutdown
function leave() {
  if (!conn) return;

  conn.close();
  conn = undefined;
}

function startHost() {
  if (!conn) return;
  isHosting = true;
  const { stream, listener, done } = createEventYielder<DataConnection>();
  peer.on('connection', listener);
  const { promise, resolve: stopHosting } = Promise.withResolvers();
  promise.then(() => {
    isHosting = false;
    done();
  });
  return [stream, stopHosting];
}

export { join, leave, myPeerId, startHost };
