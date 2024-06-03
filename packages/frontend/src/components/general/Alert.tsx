import { clsx } from '~/utils/types.js';
import { _Alert } from '../shadow-panda/_Alert.js';
import { colorStyles, type ColorStylesProps } from '../../recipes/colors.js';
import { NormalText, SubHeader } from './Text.js';
import { Flex } from './Flex.js';

type BaseAlertProps = Omit<
  React.ComponentProps<typeof _Alert>,
  'children' | 'variant' | 'colorVariant' | 'title' | 'description' | 'actions'
>;

export type AlertProps = BaseAlertProps &
  ColorStylesProps & {
    title?: React.ReactNode;
    description?: React.ReactNode;
    actions?: React.ReactNode;
  };

export const Alert = (props: AlertProps) => {
  const { variant, colorVariant, className, title, description, actions, ...rest } = props;
  return (
    <_Alert padding="sm" className={clsx(colorStyles({ colorVariant, variant }), className)} {...rest}>
      {title && <SubHeader text={title} color="unset" />}
      <Flex justify="space-between" align="center">
        {description && <NormalText text={description} color="unset" />}
        {actions}
      </Flex>
    </_Alert>
  );
};
