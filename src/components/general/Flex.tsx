import { clsx } from '~/utils/types.js';
import type { PropsFromCVA } from '~/utils/types.js';
import { type FlexProps as _FlexProps } from '../../styled-system/jsx/flex.mjs';
import { Flex as _Flex } from '../../styled-system/jsx/flex.mjs';
import { cva } from '../../styled-system/css/cva.mjs';

const flexRecipe = cva({
  variants: {
    full: {
      true: {
        width: 'full',
        height: 'full',
      },
    },
  },
});

export type FlexProps = _FlexProps & PropsFromCVA<typeof flexRecipe>;

export const Flex = ({ className, full, ...rest }: FlexProps) => {
  return <_Flex className={clsx(flexRecipe({ full }), className)} {...rest} />;
};
