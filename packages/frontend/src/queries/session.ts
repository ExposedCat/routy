import { SessionSchema } from '@routy/routy-shared';

import { buildLoaderApiCall } from '~/services/query.js';

const ResponseSchema = SessionSchema.nullable();

export const session_query = buildLoaderApiCall({
  HttpMethod: 'get',
  PathTemplate: '/session',
  ResponseBodySchema: ResponseSchema,
  UrlParamsSchema: undefined,
  QuerySchema: undefined,
  RequestHeadersSchema: undefined,
});
