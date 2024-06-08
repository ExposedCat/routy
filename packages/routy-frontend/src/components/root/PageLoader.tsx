import type { UseApiLoadResult } from '~/hooks/fetch/load.js';
import { TableSkeleton } from '../skeletons/Table.js';
import { QueryErrorHandler } from './QueryErrorHandler.js';
import { Page, type PageProps } from './Page.js';

export type PageLoaderProps<T extends string = ''> = PageProps<T> & {
  query?: UseApiLoadResult<any> | null;
};

export const PageLoader = <T extends string = ''>(props: PageLoaderProps<T>) => {
  const { query, children, ...pageProps } = props;

  return (
    <>
      {(!query || !query.finished) && (
        <Page<T> {...pageProps}>
          <TableSkeleton rows={5} />
        </Page>
      )}
      {query && <QueryErrorHandler query={query} />}
      {query && query.hasData && children}
    </>
  );
};
