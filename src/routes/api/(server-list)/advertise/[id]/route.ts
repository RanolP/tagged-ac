import { APIEvent } from '@solidjs/start/server/types';
import dayjs from 'dayjs';
import { z, ZodError } from 'zod';

import { db } from '~/server/database';

const Params = z.object({
  id: z.string().min(3),
});

export function PUT(event: APIEvent) {
  try {
    const params = Params.parse(event.params);

    const validUntil = dayjs().add(1, 'minute');

    db.insertInto('Advertisement')
      .values({
        id: params.id,
        valid_until: validUntil.toISOString(),
      })
      .onConflict((oc) =>
        oc.doUpdateSet({ valid_until: validUntil.toISOString() }),
      );

    return {
      ok: true,
      value: {
        id: params.id,
        validUntil: validUntil.toISOString(),
      },
    };
  } catch (e) {
    if (e instanceof ZodError) {
      return new Response(
        JSON.stringify({
          ok: false,
          errors: e.flatten(),
        }),
        {
          status: 400,
        },
      );
    }
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
}
