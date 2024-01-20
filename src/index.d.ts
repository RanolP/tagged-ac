import type { AttributifyAttributes } from 'unocss/preset-attributify';

declare module 'solid-js' {
  export namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    export interface HTMLAttributes<T> extends AttributifyAttributes {
      lh?: string;
    }
  }
}
