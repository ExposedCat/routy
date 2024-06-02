import type { z } from 'zod';
import React from 'react';
import type { UseMutationResult, UseQueryResult } from '@tanstack/react-query';

import type { FullError } from '~/utils/types.js';
import type { AnyApiCall } from '~/services/query.js';
import type { BackendResponse } from '~/services/http.js';
import type { CommonFailedBody } from '~/models/common.js';

export type QueryErrorType<ErrorType = CommonFailedBody> = FullError<ErrorType>;

export const isCommonError = (error: QueryErrorType<any>): error is QueryErrorType<CommonFailedBody> =>
  '__type' in error && error.__type === 'zod';

type IdleQueryResult = {
  isIdle: true;
  isPending: false;
  finished: false;
  hasError: false;
  hasData: false;
  error: null;
  data: null;
};

type PendingQueryResult<Data = undefined> = {
  isIdle: false;
  isPending: true;
  hasError: false;
  error: null;
} & (
  | { hasData: true; finished: true; data: Data } //
  | { hasData: false; finished: false; data: null }
);

type FailedQueryResult<ErrorType> = {
  isIdle: false;
  isPending: false;
  finished: true;
  hasError: true;
  hasData: false;
  error: QueryErrorType<ErrorType>;
  data: null;
};

type SuccessQueryResult<R> = {
  isIdle: false;
  isPending: false;
  finished: true;
  hasError: false;
  hasData: true;
  error: null;
  data: R;
};

type WithOptionalData<T, Data = undefined> = T &
  (
    | { hasData: true; data: Data } //
    | { hasData: false; data: null }
  );

export type UseFetchResult<R, E> = WithOptionalData<
  PendingQueryResult | FailedQueryResult<E> | SuccessQueryResult<R> | IdleQueryResult,
  R
>;
export type UsePreparedFetchResult<I, R, E> = UseFetchResult<R, E> & {
  execute: (params: I) => void;
  executeAsync: (params: I) => Promise<R>;
};

export type ImmediateQuery<R, E> = UseQueryResult<R, E>;
export type PreparedQuery<I, R, E> = UseMutationResult<R, E, I>;
export type AnyQuery<I, R, E> = ImmediateQuery<R, E> | PreparedQuery<I, R, E>;

export function useFetchResult<T extends AnyApiCall>(
  query: AnyQuery<
    z.TypeOf<T['RequestBodySchema']>,
    BackendResponse<z.TypeOf<T['ResponseBodySchema']>>,
    z.TypeOf<T['ResponseErrorBodySchema']>
  >,
): UseFetchResult<z.TypeOf<T['ResponseBodySchema']>, z.TypeOf<T['ResponseErrorBodySchema']>> {
  const pendingResult = React.useMemo(
    () =>
      (!query.data
        ? {
            isIdle: false,
            isPending: true,
            hasError: false,
            error: null,
            hasData: false,
            finished: false,
            data: null,
          }
        : query.data.ok
          ? {
              isIdle: false,
              isPending: true,
              hasError: false,
              error: null,
              hasData: true,
              finished: true,
              data: query.data,
            }
          : {
              isIdle: false,
              isPending: true,
              hasError: true,
              error: { message: query.data.message },
              hasData: false,
              finished: true,
              data: null,
            }) as PendingQueryResult<z.TypeOf<T['ResponseBodySchema']>>,
    [query.data],
  );

  if ('isIdle' in query && query.isIdle) {
    return {
      isIdle: true,
      isPending: false,
      finished: false,
      hasError: false,
      hasData: false,
      error: null,
      data: null,
    };
  }
  if (query.isPending || ('isFetching' in query && query.isFetching)) {
    return pendingResult;
  }

  if (query.isError) {
    return {
      isIdle: false,
      isPending: false,
      finished: true,
      hasError: true,
      hasData: false,
      error: query.error,
      data: null,
    };
  }

  if (query.isSuccess) {
    if (query.data.ok) {
      return {
        isIdle: false,
        isPending: false,
        finished: true,
        hasError: false,
        hasData: true,
        error: null,
        data: query.data,
      };
    }

    return {
      isIdle: false,
      isPending: false,
      finished: true,
      hasError: true,
      hasData: false,
      error: { message: query.data.message },
      data: null,
    };
  }

  return pendingResult;
}
