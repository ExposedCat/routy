import { z } from 'zod';
import { TaskSchema } from '@routy/routy-shared';

import { buildApiCall } from '~/services/query.js';

export const RequestBodySchema = TaskSchema.omit({ userId: true }).partial();
export type UpdateTaskInput = z.infer<typeof RequestBodySchema>;

const ResponseBodySchema = z.object({ ok: z.literal(true) });

export const update_task = buildApiCall({
  HttpMethod: 'post',
  PathTemplate: '/user/task/details',
  RequestBodySchema,
  ResponseBodySchema,
  UrlParamsSchema: undefined,
  QuerySchema: undefined,
  RequestHeadersSchema: undefined,
});
