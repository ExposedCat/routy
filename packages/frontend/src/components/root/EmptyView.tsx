import type { IconType } from 'react-icons';
import { Flex } from '@styled-system/jsx/flex.mjs';
import type { FlexProps } from '@styled-system/jsx/flex.mjs';

import { Label, SubLabel } from '../general/Text.js';
import { Icon } from '../general/Icon.js';
import { EmptyPageSvg } from '../../icons/svg/Empty.js';

export type EmptyViewProps = Omit<FlexProps, 'icon' | 'title' | 'subtitle'> & {
  icon?: IconType;
  rawIcon?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
};

export const EmptyView = (props: EmptyViewProps): JSX.Element => {
  const { icon, title, subtitle, rawIcon, ...flexProps } = props;

  return (
    <Flex direction="column" align="center" width="full" gap="xs" {...flexProps}>
      {rawIcon}
      {!rawIcon && (icon !== null && icon ? <Icon icon={icon} /> : <EmptyPageSvg />)}
      {typeof title === 'string' ? <Label text={title} /> : title}
      {typeof subtitle === 'string' ? <SubLabel text={subtitle} /> : subtitle}
    </Flex>
  );
};
