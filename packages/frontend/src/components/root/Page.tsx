import { Flex } from '@styled-system/jsx/flex.mjs';
import { css } from '@styled-system/css/css.mjs';

import type { NavigationProps } from '~/router.js';
import { BackIcon } from '~/icons/react-icons.js';
import { PageTitle } from '../general/Text.js';
import { RedirectButton } from '../general/Button.js';

export type PageProps<T extends string = ''> = {
  title?: React.ReactNode;
  actions?: React.ReactNode;
  backTo?: NavigationProps<T>;
};

export const Page = <T extends string = ''>(props: React.PropsWithChildren<PageProps<T>>): React.JSX.Element => {
  const { title, actions, children, backTo } = props;

  const pageStyles = css({
    overflowY: 'auto',
    padding: 'sm',
    gap: 'sm',
    width: 'full',
  });

  return (
    <Flex justify="start" align="center" flexDirection="column" className={pageStyles}>
      {(title || actions) && (
        <Flex justify={!title && actions ? 'end' : 'space-between'} align="center" width="full" maxWidth="container.xl">
          {(title || backTo) && (
            <Flex align="center" gap="xs" width="full">
              {backTo && <RedirectButton navigate={backTo} variant="ghost" colorVariant="white" icon={BackIcon} />}
              {title && (typeof title === 'string' ? <PageTitle text={title} /> : title)}
            </Flex>
          )}
          {actions}
        </Flex>
      )}
      <Flex
        justify="start"
        align="start"
        flexDirection="column"
        width="full"
        gap="sm"
        maxWidth="container.xl"
        position="relative"
      >
        {children}
      </Flex>
    </Flex>
  );
};
