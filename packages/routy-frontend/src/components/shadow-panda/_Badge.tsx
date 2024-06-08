import type { HTMLStyledProps } from '@styled-system/types/jsx.mjs';
import { badge } from '@styled-system/recipes/badge.mjs';
import { styled } from '@styled-system/jsx/factory.mjs';

export const _Badge = styled('div', badge);

export type _BadgeProps = HTMLStyledProps<typeof _Badge>;
