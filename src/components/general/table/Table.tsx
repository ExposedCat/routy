import React from 'react';
import { Link } from '@tanstack/react-router';
import { css } from '@styled-system/css/css.mjs';

import { clsx } from '~/utils/types.js';
import type { NavigationProps } from '~/router.js';
import { buildProvider } from '~/hooks/provider.js';
import type { FlexProps } from '../Flex.js';
import { _TableCell } from '../../shadow-panda/Table.js';
import type { _TableCellProps } from '../../shadow-panda/Table.js';
import { RawTableRow } from './RawTable.js';

export type TableRowProps<T extends string = ''> = {
  navigate?: NavigationProps<T>;
} & React.ComponentPropsWithoutRef<typeof RawTableRow>;

const { Provider: ProvideRowNavigation, useValue: useRowNavigation } =
  buildProvider<NavigationProps>('ProvideRowNavigation');

export const TableRow = <T extends string = ''>(props: TableRowProps<T>) => {
  const { navigate, children, ...rest } = props;

  const styles = css({
    position: 'relative',
    height: '100%',
  });

  return (
    <RawTableRow {...rest} className={clsx(rest.className, styles)}>
      <ProvideRowNavigation value={navigate as NavigationProps}>{children}</ProvideRowNavigation>
    </RawTableRow>
  );
};

export type TableCellProps = Omit<_TableCellProps, 'align' | 'justify'> & {
  align?: FlexProps['align'];
  justify?: FlexProps['justify'];
  disableNavigation?: boolean;
};

export const TableCell = <T extends string = ''>(props: TableCellProps) => {
  const { children, className, align, justify, disableNavigation = false, ...rest } = props;

  const navigation = useRowNavigation() as NavigationProps<T>;

  const cellStyles = css({
    height: 'full',
    padding: 0,
  });

  const wrapperStyles = css({
    display: 'flex',
    justifyContent: justify ?? 'start',
    alignItems: align ?? 'center',
    width: 'full',
    height: 'full',
    padding: 'sm',
  });

  return (
    <_TableCell {...rest} className={clsx(className, cellStyles)}>
      {navigation && !disableNavigation ? (
        <Link {...(navigation as NavigationProps)} className={wrapperStyles}>
          {children}
        </Link>
      ) : (
        <div className={wrapperStyles}>{children}</div>
      )}
    </_TableCell>
  );
};

export { Table, TableHeader, TableHead } from './RawTable.js';
export { TableBody, TableCaption, TableFooter } from '../../shadow-panda/Table.js';
