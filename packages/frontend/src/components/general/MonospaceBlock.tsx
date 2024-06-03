import { Flex } from '@styled-system/jsx/flex.mjs';
import { css } from '@styled-system/css/css.mjs';

import { clsx } from '~/utils/types.js';
import { CopyIcon } from '~/icons/react-icons.js';
import { useCopyWithToast } from '~/hooks/copy.js';
import { Label } from './Text.js';
import type { StyledTextProps } from './Text.js';
import { Button } from './Button.js';

export type MonospaceBlockProps = Omit<StyledTextProps, 'text'> & {
  code: string;
  entity?: string;
  canCopy?: boolean;
  wrapperStyles?: string;
};

export const MonospaceBlock = (props: MonospaceBlockProps) => {
  const { code, canCopy = true, entity = 'Code', wrapperStyles, ...textProps } = props;

  const copy = useCopyWithToast();

  const blockStyles = clsx(
    css({
      wordBreak: 'break-all',
      backgroundColor: 'light.gray',
      rounded: 'common',
      padding: 'sm',
      justifyContent: 'space-between',
    }),
    wrapperStyles,
  );
  const textStyles = css({ fontFamily: 'mono' });

  return (
    <Flex className={blockStyles}>
      <Label text={code} className={textStyles} weight="bold" {...textProps} />
      {canCopy && (
        <Button //
          icon={CopyIcon}
          onClick={() => copy({ text: code, entity })}
          variant="ghost"
          size="icon"
        />
      )}
    </Flex>
  );
};
