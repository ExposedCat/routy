import type { AnyApiCall } from '~/services/query.js';
import type { UseApiLoadResult } from '~/hooks/fetch/load.js';
import { ErrorView } from './ErrorView.js';

export type QueryErrorHandlerProps<T extends AnyApiCall> = {
  query: UseApiLoadResult<T>;
};

export const QueryErrorHandler = <T extends AnyApiCall>(props: QueryErrorHandlerProps<T>) => {
  const { query } = props;

  if (!query.hasError) {
    return <></>;
  }

  return <ErrorView error={query.error} />;
};
