import React from 'react';
import { Link } from '@tanstack/react-router';
import { css } from '@styled-system/css/css.mjs';

import { clsx } from '~/utils/types.js';
import type { Customizable } from '~/utils/types.js';
import type { NavigationProps } from '~/router.js';

export type WithNavigate<
  C extends keyof React.JSX.IntrinsicElements | React.JSXElementConstructor<any>,
  T extends string = '',
> = {
  navigate?: NavigationProps<T>;
} & React.ComponentProps<C>;

export type NavigationalProps<T extends string = ''> = React.PropsWithChildren<
  Customizable<{
    navigate: NavigationProps<T> | undefined | null;
  }>
>;

export const Navigational = <T extends string = ''>(props: NavigationalProps<T>) => {
  const { navigate, children, className } = props;

  const linkStyles = css({
    width: 'full',
    height: 'full',
    display: 'inline-block',
  });

  return (
    <>
      {navigate ? (
        <Link as="div" {...(navigate as NavigationProps)} className={clsx(linkStyles, className)}>
          {children}
        </Link>
      ) : (
        children
      )}
    </>
  );
};
