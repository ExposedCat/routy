import { z } from 'zod';
import { TaskSchema } from '@routy/routy-shared';

import { buildLoaderApiCall } from '~/services/query.js';

const ResponseSchema = z.object({
  tasks: TaskSchema.array(),
});

export const get_tasks = buildLoaderApiCall({
  HttpMethod: 'get',
  PathTemplate: '/user/tasks',
  ResponseBodySchema: ResponseSchema,
  UrlParamsSchema: undefined,
  QuerySchema: undefined,
  RequestHeadersSchema: undefined,
});
