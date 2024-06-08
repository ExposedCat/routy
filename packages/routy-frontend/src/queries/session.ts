import { GetSessionResponseSchema } from '@routy/routy-shared';

import { buildLoaderApiCall } from '~/services/query.js';

export const get_session = buildLoaderApiCall({
  HttpMethod: 'get',
  PathTemplate: '/session',
  ResponseBodySchema: GetSessionResponseSchema,
  UrlParamsSchema: undefined,
  QuerySchema: undefined,
  RequestHeadersSchema: undefined,
});
