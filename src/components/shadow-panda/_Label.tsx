import type { HTMLStyledProps } from '@styled-system/types/jsx.mjs';
import { label } from '@styled-system/recipes/label.mjs';
import { styled } from '@styled-system/jsx/factory.mjs';

export const _Label = styled('label', label);
export type _LabelProps = HTMLStyledProps<typeof _Label>;
