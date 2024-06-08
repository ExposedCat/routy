import { z } from 'zod';
import { TaskSchema } from '@routy/routy-shared';

import { buildApiCall } from '~/services/query.js';

export const RequestBodySchema = TaskSchema.pick({ id: true });
export type AddTaskInput = z.infer<typeof RequestBodySchema>;

const ResponseBodySchema = z.object({ ok: z.literal(true) });

export const remove_task = buildApiCall({
  HttpMethod: 'post',
  PathTemplate: '/user/task/remove',
  RequestBodySchema,
  ResponseBodySchema,
  UrlParamsSchema: undefined,
  QuerySchema: undefined,
  RequestHeadersSchema: undefined,
});
