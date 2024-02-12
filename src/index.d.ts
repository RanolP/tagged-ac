import type { AttributifyAttributes } from 'unocss/preset-attributify';

import { DrizzleDatabase } from './server/database';

declare module 'solid-js' {
  export namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    export interface HTMLAttributes<T> extends AttributifyAttributes {
      lh?: string;
    }
  }
}

declare module 'solidjs/start/server' {
  export interface RequestEventLocals {
    db: DrizzleDatabase;
  }
}
