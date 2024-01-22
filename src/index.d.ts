import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import { DrizzleD1Database } from 'drizzle-orm/d1';
import type { AttributifyAttributes } from 'unocss/preset-attributify';

declare module 'solid-js' {
  export namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    export interface HTMLAttributes<T> extends AttributifyAttributes {
      lh?: string;
    }
  }
}

declare module 'vinxi/server' {
  export interface H3EventContext {
    cloudflare: {
      env: {
        DB: string;
      };
    };
    db: DrizzleD1Database<typeof schema> | BetterSQLite3Database<typeof schema>;
  }
}
