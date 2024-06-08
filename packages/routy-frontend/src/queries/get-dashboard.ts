import { DashboardDataSchema } from '@routy/routy-shared';

import { buildLoaderApiCall } from '~/services/query.js';

export const get_dashboard = buildLoaderApiCall({
  HttpMethod: 'get',
  PathTemplate: '/user/dashboard',
  ResponseBodySchema: DashboardDataSchema,
  UrlParamsSchema: undefined,
  QuerySchema: undefined,
  RequestHeadersSchema: undefined,
});
