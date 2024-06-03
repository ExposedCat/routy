import { clsx } from '~/utils/types.js';
import type { Customizable } from '~/utils/types.js';
import { Skeleton } from '../shadow-panda/Skeleton.js';
import { css } from '../../styled-system/css/css.mjs';

export const TextareaSkeleton = (props: Customizable): React.JSX.Element => {
  const styles = css({
    rounded: 'common',
    minWidth: 'skeleton.textarea.width',
    minHeight: 'skeleton.textarea.height',
  });

  return <Skeleton className={clsx(styles, props.className)} />;
};
