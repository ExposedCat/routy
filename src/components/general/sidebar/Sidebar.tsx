import React from 'react';
import { Flex } from '@styled-system/jsx/flex.mjs';
import { css } from '@styled-system/css/css.mjs';

import { CollapseIcon, ExpandIcon } from '~/icons/react-icons.js';
import { SidebarButton, type SidebarButtonStyleProps } from './SidebarButton.js';

export const Sidebar = (): React.JSX.Element => {
  const [expanded, setExpanded] = React.useState<boolean>(() => {
    const sidebarExpanded = localStorage.getItem('sidebarExpanded');
    return sidebarExpanded === 'true' || sidebarExpanded == null;
  });

  React.useEffect(() => {
    localStorage.setItem('sidebarExpanded', String(expanded));
  }, [expanded]);

  const handleExpand = React.useCallback(() => {
    setExpanded(prevExpanded => !prevExpanded);
  }, []);

  const sidebarStyles = css({
    width: expanded ? 'container.side-bar.expanded' : 'container.side-bar.collapsed',
    paddingX: expanded ? 'smaller.sm' : 'xxs',
    paddingY: 'sm',
    background: 'light.gray',
    borderTop: 'none',
    borderRight: 'border.base',
    flexShrink: 0,
  });

  const buttonOptions: SidebarButtonStyleProps = {
    layout: 'fullWidth',
    align: 'left',
  };

  return (
    <Flex justify="space-between" align="center" flexDirection="column" className={sidebarStyles}>
      <SidebarButton
        label="Collapse"
        icon={expanded ? CollapseIcon : ExpandIcon}
        expanded={expanded}
        onClick={handleExpand}
        {...buttonOptions}
        data-cy={'sidebar-collapse-button'}
      />
    </Flex>
  );
};
