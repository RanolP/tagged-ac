import dayjs from 'dayjs';
import { gte } from 'drizzle-orm';

import { advertisement } from '~/server/database/schema';

import { Advertisement } from '../../_dto/advertisement';
import { ApiResponse } from '../../_dto/result';
import { defineApiRoute } from '../../_util/define-api-route';

export const [GET, requestServerList] = defineApiRoute(
  {},
  async ({ db }): ApiResponse<Pick<Advertisement, 'id'>[]> => ({
    ok: true,
    value: await db
      .select({
        id: advertisement.id,
      })
      .from(advertisement)
      .where(gte(advertisement.valid_until, dayjs().toISOString()))
      .execute(),
  }),
  () => fetch(`/api/servers`, { method: 'GET' }),
);
