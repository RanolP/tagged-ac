import { APIEvent, APIHandler } from '@solidjs/start/server/types';
import { z } from 'zod';

export function defineApiRoute<T extends Config>(
  config: T,
  handler: (request: Request<T>) => Promise<unknown> | unknown,
): APIHandler {
  return async (event) => {
    try {
      const params = config.params?.safeParse(event.params);
      if (!params || params.success) {
        return handler({
          params: params?.data as any,
          db: event.context.db,
        });
      } else {
        return new Response(
          JSON.stringify({
            ok: false,
            errors: {
              params: params.error.flatten(),
            },
          }),
          {
            status: 400,
          },
        );
      }
    } catch (e) {
      return new Response(
        JSON.stringify({
          ok: false,
          errors: [e instanceof Error ? e.message : 'Unknown Error'],
        }),
        {
          status: 500,
        },
      );
    }
  };
}

interface Config {
  params?: z.AnyZodObject;
}

type Request<T extends Config> = {
  params: T['params'] extends z.ZodType ? z.infer<T['params']> : undefined;
  db: APIEvent['context']['db'];
};
