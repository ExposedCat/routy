import { css } from '~/styled-system/css/css.mjs';
import { staticImageUrl } from '~/services/url.js';
import { Flex } from '../general/Flex.js';
import type { PageProps } from './Page.js';

export const PublicPage = <T extends string = ''>(props: React.PropsWithChildren<PageProps<T>>): React.JSX.Element => {
  const { children } = props;

  const pageStyles = css({
    overflowY: 'auto',
    width: 'full',
    backgroundColor: 'light.gray',
  });

  const rightFlex = css({
    backgroundColor: 'white',
    roundedLeft: 'common',
    hideBelow: 'md',
  });

  const leftFlex = css({
    paddingX: '3xs',
    paddingY: 'md',
    gap: 'sm',
    maxWidth: 'container.sm',
    position: 'relative',
  });

  return (
    <Flex className={pageStyles} full>
      <Flex direction="column" className={leftFlex} full>
        <Flex gap="sm" justify="center" align="center" direction="column" full>
          {children}
        </Flex>
      </Flex>
      <Flex
        justify="center"
        align="center"
        direction="column"
        gap="sm"
        position="relative"
        minWidth="container.xs"
        className={rightFlex}
        full
      >
        {/* TODO: */}
        <img src={staticImageUrl('login')} />
      </Flex>
    </Flex>
  );
};
