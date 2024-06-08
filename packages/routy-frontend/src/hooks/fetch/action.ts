import type { z } from 'zod';
import React from 'react';
import { useMutation } from '@tanstack/react-query';

import type { AnyApiCall } from '~/services/query.js';
import { httpRequest } from '~/services/http.js';
import type { BackendResponse } from '~/services/http.js';
import { log } from '../../utils/logger.js';
import { useFetchResult } from './result.js';
import type { QueryErrorType, UseFetchResult } from './result.js';

type UseApiActionArgs<T extends AnyApiCall> = {
  apiCall: T;
  uniqueKey?: string;
  preExecute?: ApiActionExecuteProps<T>;
  onSuccess?: (data: z.TypeOf<T['ResponseBodySchema']>) => void;
  onError?: (error: QueryErrorType<z.TypeOf<T['ResponseErrorBodySchema']>>) => void;
} & (T['UrlParamsSchema'] extends undefined ? { urlParams?: never } : { urlParams?: z.input<T['UrlParamsSchema']> }) &
  (T['QuerySchema'] extends undefined ? { searchParams?: never } : { searchParams: z.input<T['QuerySchema']> }) &
  (T['RequestHeadersSchema'] extends undefined ? { headers?: never } : { headers: z.input<T['RequestHeadersSchema']> });

type ApiActionExecuteProps<T extends AnyApiCall> = {
  body: z.TypeOf<T['RequestBodySchema']>;
  urlParams?: z.TypeOf<T['UrlParamsSchema']>;
};

export type UseApiActionResult<T extends AnyApiCall> = UseFetchResult<
  z.TypeOf<T['ResponseBodySchema']>,
  z.TypeOf<T['ResponseErrorBodySchema']>
> & {
  execute: (props: ApiActionExecuteProps<T>) => void;
  executeAsync: (props: ApiActionExecuteProps<T>) => Promise<z.TypeOf<T['ResponseBodySchema']>>;
};

const handleQueryError = (queryError: QueryErrorType<any>) => {
  const { cause: error, message } = queryError;
  log.error({ error }, message);
};

export function useApiAction<T extends AnyApiCall>(args: UseApiActionArgs<T>): UseApiActionResult<T> {
  const { uniqueKey, apiCall, onError, onSuccess, headers, urlParams: callUrlParams, searchParams, preExecute } = args;

  const executed = React.useRef(false);

  const mutationFn = React.useMemo(
    () =>
      ({ body, urlParams }: ApiActionExecuteProps<T>) =>
        httpRequest({
          body,
          apiCall: {
            ...apiCall,
            PathTemplate: apiCall.PathTemplate,
          },
          headers,
          urlParams: !urlParams && !callUrlParams ? null : { ...urlParams, ...callUrlParams },
          query: searchParams,
        }),
    [apiCall, callUrlParams, searchParams, headers],
  );

  const query = useMutation<
    BackendResponse<z.TypeOf<T['ResponseBodySchema']>>,
    QueryErrorType<z.TypeOf<T['ResponseErrorBodySchema']>>,
    ApiActionExecuteProps<T>
  >({
    mutationKey: ['api', apiCall.PathTemplate, uniqueKey],
    mutationFn,
    onSuccess: data =>
      data.ok
        ? onSuccess?.(data.data)
        : (onError ?? handleQueryError)({
            message: data.message,
          }),
    onError: onError ?? handleQueryError,
  });

  if (!executed.current && preExecute) {
    executed.current = true;
    query.mutate(preExecute);
  }

  const result = useFetchResult(query);

  return {
    ...result,
    execute: props => query.mutate(props),
    executeAsync: async props => query.mutateAsync(props),
  };
}
