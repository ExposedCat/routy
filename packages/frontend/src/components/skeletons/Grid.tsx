import React from 'react';

import { clsx } from '~/utils/types.js';
import type { PropsFromCVA } from '~/utils/types.js';
import { Skeleton } from '../shadow-panda/Skeleton.js';
import { Grid } from '../general/Grid.js';
import { cva } from '../../styled-system/css/cva.mjs';

const gridSkeletonItemStyles = cva({
  base: {
    rounded: 'common',
    minWidth: 'full',
    minHeight: 'skeleton.grid.height.sm',
  },
  variants: {
    size: {
      xs: { minHeight: 'skeleton.grid.height.xs' },
      sm: { minHeight: 'skeleton.grid.height.sm' },
      md: { minHeight: 'skeleton.grid.height.md' },
      lg: { minHeight: 'skeleton.grid.height.lg' },
      xl: { minHeight: 'skeleton.grid.height.xl' },
    },
  },
});

export type GridSkeletonProps = PropsFromCVA<typeof gridSkeletonItemStyles> &
  React.ComponentProps<typeof Skeleton> & {
    rows?: number;
    columns?: number;
    itemStyles?: string;
  };

export const GridSkeleton = (args: GridSkeletonProps) => {
  const { rows = 3, columns = 5, className, size, ...rest } = args;

  const iterator = React.useMemo(() => Array.from({ length: columns * rows }), [columns, rows]);

  return (
    <Grid gridTemplateColumns={columns} width="full">
      {iterator.map((_, i) => (
        <Skeleton key={`grid-skeleton-${i}`} className={clsx(gridSkeletonItemStyles({ size }), className)} {...rest} />
      ))}
    </Grid>
  );
};
