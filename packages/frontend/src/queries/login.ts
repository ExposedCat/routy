import { z } from 'zod';

import { buildApiCall } from '~/services/query.js';

export const RequestBodySchema = z.object({
  email: z.string(),
  password: z.string().min(6, 'Password must be at least 6 characters long.'),
});
export type LoginInput = z.infer<typeof RequestBodySchema>;

const ResponseBodySchema = z.object({ token: z.string() });

export const login_query = buildApiCall({
  HttpMethod: 'post',
  PathTemplate: '/login',
  RequestBodySchema,
  ResponseBodySchema,
  UrlParamsSchema: undefined,
  QuerySchema: undefined,
  RequestHeadersSchema: undefined,
});
