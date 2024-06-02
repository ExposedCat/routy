import React, { useEffect, useRef } from 'react';
import type { HTMLStyledProps } from '@styled-system/types/jsx.mjs';
import { textarea } from '@styled-system/recipes/textarea.mjs';
import { styled } from '@styled-system/jsx/factory.mjs';

export const _Textarea = styled('textarea', textarea);
export type _TextareaProps = Omit<HTMLStyledProps<typeof _Textarea>, 'value'> & {
  value?: string | null;
  autoResize?: boolean;
};

export const Textarea = React.forwardRef<HTMLTextAreaElement, _TextareaProps>((props, ref) => {
  const { value = '', autoResize, ...rest } = props;

  // TODO: use forwardRef
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (autoResize && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value, autoResize]);

  return <_Textarea ref={textareaRef || ref} value={value === null ? undefined : value} {...rest} />;
});
