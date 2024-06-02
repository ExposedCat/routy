import type { HTMLStyledProps } from '@styled-system/types/jsx.mjs';
import { input } from '@styled-system/recipes/input.mjs';
import { styled } from '@styled-system/jsx/factory.mjs';

export const _Input = styled('input', input);
export type _InputProps = HTMLStyledProps<typeof _Input>;
