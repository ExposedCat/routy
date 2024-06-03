import type { z } from 'zod';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import type { QueryKey } from '@tanstack/react-query';

import { SECOND } from '~/utils/datetime.js';
import { fillUrlParamsInUrl } from '~/services/url.js';
import type { AnyLoaderApiCall } from '~/services/query.js';
import { httpRequest } from '~/services/http.js';
import type { BackendResponse } from '~/services/http.js';
import { useNullableSession } from '~/providers/session.js';
import { useFetchResult } from './result.js';
import type { QueryErrorType, UseFetchResult } from './result.js';

const STATIC_REFETCH_INTERVAL = 15 * SECOND;

type UseApiLoadArgs<T extends AnyLoaderApiCall> = {
  apiCall: T;
  uniqueKey?: string;
  fetchImmediately?: boolean;
  refetchFilter?: () => boolean;
  dependencies?: any[];
  onLoaded?: (data: z.TypeOf<T['ResponseBodySchema']>) => void;
} & (T['UrlParamsSchema'] extends undefined ? { urlParams?: never } : { urlParams: z.input<T['UrlParamsSchema']> }) &
  (T['QuerySchema'] extends undefined ? { searchParams?: never } : { searchParams: z.input<T['QuerySchema']> }) &
  (T['RequestHeadersSchema'] extends undefined ? { headers?: never } : { headers: z.input<T['RequestHeadersSchema']> });

export type UseApiLoadResult<T extends AnyLoaderApiCall> = UseFetchResult<
  z.TypeOf<T['ResponseBodySchema']>,
  z.TypeOf<T['ResponseErrorBodySchema']>
> & {
  refetch: () => void;
};

export function useApiLoad<T extends AnyLoaderApiCall>(args: UseApiLoadArgs<T>): UseApiLoadResult<T> {
  const {
    uniqueKey,
    apiCall,
    headers,
    urlParams,
    searchParams,
    fetchImmediately = true,
    refetchFilter = () => true,
    dependencies = [],
    onLoaded,
  } = args;
  const session = useNullableSession();

  const wasEnabled = React.useRef(fetchImmediately);

  const queryFn = React.useMemo(
    () => async () => {
      const data = await httpRequest({
        apiCall: {
          ...apiCall,
          PathTemplate: apiCall.PathTemplate,
        },
        headers,
        urlParams: urlParams ?? null,
        query: searchParams,
      });
      onLoaded?.(data);
      return data;
    },
    [apiCall, onLoaded, searchParams, urlParams, headers],
  );

  const url: string = React.useMemo(
    () => (urlParams ? fillUrlParamsInUrl(apiCall.PathTemplate, urlParams) : apiCall.PathTemplate),
    [apiCall.PathTemplate, urlParams],
  );

  const queryKey: QueryKey = React.useMemo(
    () => [session?.userId ?? '', 'api', url, uniqueKey ?? ''],
    [session?.userId, uniqueKey, url],
  );

  const query = useQuery<
    BackendResponse<z.TypeOf<T['ResponseBodySchema']>>,
    QueryErrorType<z.TypeOf<T['ResponseErrorBodySchema']>>
  >({
    queryKey,
    queryFn,
    enabled: fetchImmediately,
  });

  React.useEffect(() => {
    const interval = setInterval(() => {
      void query.refetch();
    }, STATIC_REFETCH_INTERVAL);
    return () => clearInterval(interval);
  }, [query]);

  React.useEffect(() => {
    if (wasEnabled.current && dependencies.length !== 0 && refetchFilter()) {
      void query.refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  const result = useFetchResult(query);

  return {
    ...result,
    refetch: () => {
      wasEnabled.current = true;
      void query.refetch();
    },
  };
}
