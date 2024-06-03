import React from 'react';
import { css } from '@styled-system/css/css.mjs';
import { Portal } from '@radix-ui/react-tooltip';

import { clsx } from '~/utils/types.js';
import { _Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../shadow-panda/_Tooltip.js';
import { Label } from './Text.js';

export type TooltipButtonProps = Omit<React.ComponentProps<typeof _Tooltip>, 'content'> &
  Pick<React.ComponentProps<typeof TooltipContent>, 'side'> & {
    content: React.ReactNode;
    className?: string;
  };

export const Tooltip = React.forwardRef<HTMLDivElement, TooltipButtonProps>((props, ref): React.JSX.Element => {
  const { className, content, children, side = 'top', ...rest } = props;

  const contentWrapper = css({
    'display': 'inline-block',
    'lineHeight': 1,
  });

  return (
    <TooltipProvider>
      <_Tooltip ref={ref} {...rest}>
        <TooltipTrigger asChild>
          <div className={clsx(contentWrapper, className)}>{children}</div>
        </TooltipTrigger>
        {content && (
          <Portal>
            <TooltipContent side={side}>
              {typeof content === 'string' ? <Label text={content} /> : content}
            </TooltipContent>
          </Portal>
        )}
      </_Tooltip>
    </TooltipProvider>
  );
});
