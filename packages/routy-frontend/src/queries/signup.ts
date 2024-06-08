import { z } from 'zod';

import { buildApiCall } from '~/services/query.js';

export const RequestBodySchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters long.'),
  email: z.string(),
  password: z.string().min(6, 'Password must be at least 6 characters long.'),
});
export type RegisterInput = z.infer<typeof RequestBodySchema>;

const ResponseBodySchema = z.object({ token: z.string() });

export const signup_query = buildApiCall({
  HttpMethod: 'post',
  PathTemplate: '/register',
  RequestBodySchema,
  ResponseBodySchema,
  UrlParamsSchema: undefined,
  QuerySchema: undefined,
  RequestHeadersSchema: undefined,
});
