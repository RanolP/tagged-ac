import dayjs from 'dayjs';
import { z } from 'zod';

import { Advertisement } from '~/routes/api/_dto/advertisement';
import { ApiResponse } from '~/routes/api/_dto/result';
import { defineApiRoute } from '~/routes/api/_util/define-api-route';
import { advertisement } from '~/server/database/schema';

export const [PUT, requestAdvertise] = defineApiRoute(
  {
    params: z.object({
      id: z.string().uuid(),
    }),
  },
  async ({ params, db }): ApiResponse<Advertisement> => {
    const validUntil = dayjs().add(1, 'minute');

    await db
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
  },
  ({ id }) => fetch(`/api/advertise/${id}`, { method: 'PUT' }),
);
