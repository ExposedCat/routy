import { clsx } from '~/utils/types.js';
import type { Customizable } from '~/utils/types.js';
import { Skeleton } from '../shadow-panda/Skeleton.js';
import { Flex } from '../general/Flex.js';
import { css } from '../../styled-system/css/css.mjs';

export type TableSkeletonProps = {
  rows?: number;
  wrapperClassName?: string;
};

export const TableSkeleton = (props: Customizable<TableSkeletonProps>): React.JSX.Element => {
  const { rows = 5, wrapperClassName, className } = props;
  const wrapperStyles = css({ width: 'full' });
  const skeletonStyles = css({
    minWidth: 'full',
    minHeight: 'skeleton.height',
  });

  return (
    <Flex direction="column" gap="xs" className={clsx(wrapperStyles, wrapperClassName)}>
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={`table-skeleton-${i}`} className={clsx(skeletonStyles, className)} />
      ))}
    </Flex>
  );
};
