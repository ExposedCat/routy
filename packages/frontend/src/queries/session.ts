import { buildLoaderApiCall } from '~/services/query.js';
import { SessionSchema } from '~/models/session.js';

const ResponseSchema = SessionSchema.nullable();

export const session_query = buildLoaderApiCall({
  HttpMethod: 'get',
  PathTemplate: '/session',
  ResponseBodySchema: ResponseSchema,
  UrlParamsSchema: undefined,
  QuerySchema: undefined,
  RequestHeadersSchema: undefined,
});
