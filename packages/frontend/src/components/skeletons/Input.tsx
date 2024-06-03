import { clsx } from '~/utils/types.js';
import type { Customizable } from '~/utils/types.js';
import { Skeleton } from '../shadow-panda/Skeleton.js';
import { css } from '../../styled-system/css/css.mjs';

export const InputSkeleton = (props: Customizable): React.JSX.Element => {
  const styles = css({
    rounded: 'common',
    minWidth: 'skeleton.input.width',
    minHeight: 'skeleton.input.height',
  });

  return <Skeleton className={clsx(styles, props.className)} />;
};
