import type { z } from 'zod';

import type { FullError } from '~/utils/types.js';
import { serializeToJson } from '~/utils/json.js';
import { BACKEND_API_ENDPOINT, buildApiCallUrl } from './url.js';
import { sessionService } from './session.js';
import type { ApiCall, ErrorBody, ResponseBody } from './query.js';

export const isHttpRequestError = (error: { message?: string }): error is FullError<Error> =>
  error.message === 'HTTP request failed';

export type BackendResponse<T> = { ok: true; message: string; data: T } | { ok: false; message: string; data: null };

export async function httpRequest<T extends ApiCall<any, any, ResponseBody, any, any, any, ErrorBody, any>>(args: {
  apiCall: T;
  headers?: z.infer<T['RequestHeadersSchema']>;
  body?: z.infer<T['RequestBodySchema']>;
  urlParams?: z.infer<T['UrlParamsSchema']>;
  query?: z.infer<T['QuerySchema']>;
  redirect?: RequestRedirect;
}): Promise<BackendResponse<z.infer<T['ResponseBodySchema']>>> {
  const { apiCall, urlParams, headers: requestHeaders, body, query, redirect } = args;

  const token = sessionService.get();
  const headers = new Headers({
    ...requestHeaders,
    ...(token && { 'Authorization': `Bearer ${token}` }),
  });

  const parsedParams = apiCall.UrlParamsSchema ? apiCall.UrlParamsSchema.parse(urlParams) : urlParams;
  const parsedQuery = apiCall.QuerySchema ? apiCall.QuerySchema.parse(query) : query;

  const url = buildApiCallUrl({
    apiCall,
    urlParams: parsedParams,
    prefixWithSlash: false,
    query: parsedQuery,
    skipSearch: true,
  });

  try {
    let requestBody = undefined;
    if (body) {
      if (apiCall.type !== 'form') {
        headers.append('Content-Type', 'application/json');
      }
      if (apiCall.type === 'form') {
        requestBody = new FormData();
        for (const [field, value] of Object.entries(body)) {
          if (!Array.isArray(value)) {
            requestBody.append(field, value);
          } else {
            for (const element of value) {
              requestBody.append(field, element);
            }
          }
        }
      } else {
        if (apiCall.RequestBodySchema) {
          const parsed = apiCall.RequestBodySchema.parse(body);
          requestBody = serializeToJson(parsed);
        } else {
          requestBody = '{}';
        }
      }
    }

    const result = await fetch(url, {
      redirect,
      method: apiCall.HttpMethod,
      headers,
      body: requestBody,
    });

    if (result.status === 200) {
      const responseBody: BackendResponse<any> = await result.json();
      if (!('ok' in responseBody) || !('message' in responseBody) || !('data' in responseBody)) {
        return {
          ok: false,
          message: 'Invalid Server Response',
          data: null,
        };
      }
      return {
        ok: true,
        message: responseBody.message,
        data: apiCall.ResponseBodySchema.parse(responseBody.data),
      };
    } else {
      let errorBody = await result.json();
      try {
        errorBody = apiCall.ResponseErrorBodySchema.parse(errorBody);
      } catch {
        // Ignore
      }
      throw errorBody;
    }
  } catch (error) {
    throw new Error('HTTP request failed', { cause: error });
  }
}

export const getDetectionUrl = (detectionId: string, path: string, teamId: string | null = null): string => {
  let baseUrl: string;

  if (path.startsWith('detections')) {
    baseUrl = `/${path}`;
  } else {
    baseUrl = `${BACKEND_API_ENDPOINT}/api/detection/${detectionId}/download/${path}`;
  }

  const url = new URL(baseUrl);

  if (teamId) {
    url.searchParams.append('teamId', teamId);
  }

  return url.toString();
};
