import { z } from 'zod';

import { buildLoaderApiCall } from '~/services/query.js';
import { SessionSchema } from '~/models/session.js';

const ResponseSchema = z.object({
  session: SessionSchema,
});

export const session_query = buildLoaderApiCall({
  HttpMethod: 'get',
  PathTemplate: '/session',
  ResponseBodySchema: ResponseSchema,
  UrlParamsSchema: undefined,
  QuerySchema: undefined,
  RequestHeadersSchema: undefined,
});
