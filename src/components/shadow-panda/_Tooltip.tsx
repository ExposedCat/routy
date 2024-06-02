'use client';

import { tooltip } from '@styled-system/recipes/tooltip.mjs';
import { styled } from '@styled-system/jsx/factory.mjs';
import { createStyleContext } from '@shadow-panda/style-context';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

import type { Nested, Provider } from '~/utils/types.js';

const { withProvider, withContext } = createStyleContext(tooltip);

export const TooltipProvider = TooltipPrimitive.Provider;
const __Tooltip = styled(TooltipPrimitive.Root);
export const _Tooltip: Provider<typeof __Tooltip, typeof tooltip> = withProvider(__Tooltip, 'root');
const _TooltipTrigger = styled(TooltipPrimitive.Trigger);
export const TooltipTrigger: Nested<typeof _TooltipTrigger> = withContext(_TooltipTrigger, 'trigger');
const _TooltipContent = styled(TooltipPrimitive.Content);
export const TooltipContent: Nested<typeof _TooltipContent> = withContext(_TooltipContent, 'content', {
  sideOffset: 4,
});
