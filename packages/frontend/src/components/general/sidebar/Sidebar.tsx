import React from 'react';
import { css } from '@styled-system/css/css.mjs';

import { CollapseIcon, DashboardIcon, ExpandIcon, SettingsIcon, TasksIcon, TimerIcon } from '~/icons/react-icons.js';
import { Flex } from '../Flex.js';
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
    transition: 'all',
  });

  const buttonOptions: SidebarButtonStyleProps = {
    layout: 'fullWidth',
    align: 'left',
  };

  const groupStyles = css({ width: '100%' });

  return (
    <Flex justify="space-between" align="center" flexDirection="column" className={sidebarStyles}>
      <Flex direction="column" gap="sm" width="full">
        <SidebarButton label="Dashboard" icon={DashboardIcon} expanded={expanded} redirect="/" {...buttonOptions} />
        <Flex direction="column" className={groupStyles}>
          <SidebarButton
            label="Tasks"
            icon={TasksIcon}
            expanded={expanded}
            redirect="/tasks"
            position="top"
            {...buttonOptions}
          />
          <SidebarButton
            label="Timer"
            icon={TimerIcon}
            expanded={expanded}
            redirect="/timer"
            position="middle"
            {...buttonOptions}
          />
          <SidebarButton
            label="Preferences"
            icon={SettingsIcon}
            expanded={expanded}
            redirect="/settings"
            position="bottom"
            {...buttonOptions}
          />
        </Flex>
      </Flex>
      <SidebarButton
        label="Collapse"
        icon={expanded ? CollapseIcon : ExpandIcon}
        expanded={expanded}
        onClick={handleExpand}
        {...buttonOptions}
      />
    </Flex>
  );
};
