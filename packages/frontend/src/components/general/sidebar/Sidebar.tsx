import React from 'react';
import { css } from '@styled-system/css/css.mjs';

import { useNullableSession } from '~/providers/session.js';
import {
  CollapseIcon,
  CollapseUpIcon,
  DashboardIcon,
  ExpandIcon,
  LoginIcon,
  MenuIcon,
  SettingsIcon,
  TasksIcon,
  TimerIcon,
} from '~/icons/react-icons.js';
import { useNetworkState } from '~/hooks/network.js';
import { useOnMobile } from '~/hooks/mobile.js';
import { Flex } from '../Flex.js';
import { SidebarButton, type SidebarButtonStyleProps } from './SidebarButton.js';

export const Sidebar = (): React.JSX.Element => {
  const session = useNullableSession();
  const isOnline = useNetworkState();
  const onMobile = useOnMobile();

  const [expanded, setExpanded] = React.useState<boolean>(() => {
    const sidebarExpanded = localStorage.getItem('sidebarExpanded');
    return sidebarExpanded === 'true' || (sidebarExpanded == null && !onMobile);
  });

  React.useEffect(() => {
    localStorage.setItem('sidebarExpanded', String(expanded));
  }, [expanded]);

  const handleExpand = React.useCallback(() => {
    setExpanded(prevExpanded => !prevExpanded);
  }, []);

  const sidebarStyles = css({
    width: {
      base: expanded ? 'full' : 'auto',
      sm: expanded ? 'container.sideBar.expanded' : 'container.sideBar.collapsed',
    },
    borderTop: 'none',
    flexShrink: 0,
    background: !expanded && onMobile ? 'transparent' : 'light.gray',
    borderBottom: expanded && onMobile ? 'border.base' : 'none',
    // Mobile view
    ...(expanded && {
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 42,
      padding: 'sm',
    }),
    sm: {
      transition: 'all',
      position: 'unset',
      borderRight: 'border.base',
      paddingX: expanded ? 'smaller.sm' : 'xxs',
      paddingY: 'sm',
    },
  });

  const buttonOptions: SidebarButtonStyleProps = {
    layout: 'fullWidth',
    align: 'left',
    disabled: !isOnline || !session,
  };

  const groupStyles = css({ width: '100%' });

  return (
    <Flex justify="space-between" align="center" flexDirection="column" className={sidebarStyles} gap="sm">
      {(expanded || !onMobile) && (
        <Flex direction="column" gap="sm" width="full">
          <Flex direction="column" className={groupStyles}>
            <SidebarButton
              label="Dashboard"
              icon={DashboardIcon}
              expanded={expanded}
              redirect="/"
              position={session ? 'single' : 'top'}
              {...buttonOptions}
            />
            {!session && (
              <SidebarButton
                label="Log In / Sign Up"
                icon={LoginIcon}
                expanded={expanded}
                redirect="/login"
                position="bottom"
                {...buttonOptions}
                disabled={false}
              />
            )}
          </Flex>
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
              disabled={false}
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
      )}
      <SidebarButton
        label={expanded ? 'Collapse' : 'Menu'}
        icon={expanded ? (onMobile ? CollapseUpIcon : CollapseIcon) : onMobile ? MenuIcon : ExpandIcon}
        expanded={expanded}
        onClick={handleExpand}
        {...buttonOptions}
        layout={onMobile ? undefined : buttonOptions.layout}
        width={undefined}
        disabled={false}
        iconProps={{ size: onMobile ? 'md' : 'sm' }}
        variant="outline"
        colorVariant={!expanded && onMobile ? 'active' : 'white'}
        className={css({
          justifyContent: 'center',
        })}
      />
    </Flex>
  );
};
