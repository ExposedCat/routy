import { SessionSchema } from '@routy/routy-shared';

import { buildLoaderApiCall } from '~/services/query.js';

const ResponseSchema = SessionSchema.nullable();

export const get_session = buildLoaderApiCall({
  HttpMethod: 'get',
  PathTemplate: '/session',
  ResponseBodySchema: ResponseSchema,
  UrlParamsSchema: undefined,
  QuerySchema: undefined,
  RequestHeadersSchema: undefined,
});
