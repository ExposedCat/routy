import { clsx } from '~/utils/types.js';
import type { Customizable } from '~/utils/types.js';
import { Skeleton } from '../shadow-panda/Skeleton.js';
import { css } from '../../styled-system/css/css.mjs';

export const ButtonSkeleton = (props: Customizable): React.JSX.Element => {
  const styles = css({
    rounded: 'common',
    minWidth: 'skeleton.button.width',
    minHeight: 'skeleton.button.height',
  });

  return <Skeleton className={clsx(styles, props.className)} />;
};
