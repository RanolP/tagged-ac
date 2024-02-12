import { APIHandler } from '@solidjs/start/server/types';
import { z } from 'zod';

import { DrizzleDatabase } from '~/server/database';

import { ApiResponse, Result } from '../_dto/result';

export function defineApiRoute<T extends Config, Res>(
  config: T,
  apiHandler: (request: Request<T>) => ApiResponse<Res> | Result<Res>,
  fetchHandler: (params: Params<T>) => Promise<Response>,
): [APIHandler, (params: Params<T>) => ApiResponse<Res>] {
  return [
    async (event) => {
      try {
        const params = config.params?.safeParse(event.params);
        if (!params || params.success) {
          return apiHandler({
            params: params?.data as any,
            db: event.locals.db,
          });
        } else {
          return new Response(
            JSON.stringify({
              ok: false,
              errors: {
                params: params.error.flatten(),
              },
            } satisfies Result<unknown>),
            {
              status: 400,
            },
          );
        }
      } catch (e) {
        return new Response(
          JSON.stringify({
            ok: false,
            errors: {
              generic: e instanceof Error ? e.message : 'Unknown Error',
            },
          } satisfies Result<unknown>),
          {
            status: 500,
          },
        );
      }
    },
    async (params) => {
      const response = await fetchHandler(params);
      try {
        return response.json();
      } catch {
        return {
          ok: false,
          errors: {
            fetch: `${response.status} ${response.statusText}`,
          },
        };
      }
    },
  ];
}

interface Config {
  params?: z.AnyZodObject;
}

type Request<T extends Config> = {
  params: Params<T>;
  db: DrizzleDatabase;
};

type Params<T extends Config> = T['params'] extends z.ZodType
  ? z.infer<T['params']>
  : void;
