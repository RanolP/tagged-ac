import { APIEvent } from '@solidjs/start/server/types';
import dayjs from 'dayjs';
import { z, ZodError } from 'zod';

import { advertisement } from '~/server/database/schema';

const Params = z.object({
  id: z.string().min(3),
});

export async function PUT(event: APIEvent) {
  try {
    const params = Params.parse(event.params);

    const validUntil = dayjs().add(1, 'minute');

    await event.context.db
      .insert(advertisement)
      .values({
        id: params.id,
        valid_until: validUntil.toISOString(),
      })
      .onConflictDoUpdate({
        target: advertisement.id,
        set: { valid_until: validUntil.toISOString() },
      })
      .execute();

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
