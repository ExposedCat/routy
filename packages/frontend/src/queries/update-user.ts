import { z } from 'zod';
import { UpdateUserInputSchema } from '@routy/routy-shared';

import { buildApiCall } from '~/services/query.js';

const ResponseBodySchema = z.object({ ok: z.literal(true) });

export const update_user = buildApiCall({
  HttpMethod: 'post',
  PathTemplate: '/user/details',
  RequestBodySchema: UpdateUserInputSchema,
  ResponseBodySchema,
  UrlParamsSchema: undefined,
  QuerySchema: undefined,
  RequestHeadersSchema: undefined,
});
