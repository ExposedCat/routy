import React from 'react';
import { styled } from '@styled-system/jsx/factory.mjs';
import { cva } from '@styled-system/css/cva.mjs';

import { clsx } from '~/utils/types.js';
import type { PropsFromCVA, Customizable } from '~/utils/types.js';

const styledText = cva({
  variants: {
    break: {
      character: { wordBreak: 'break-all' },
      word: { wordBreak: 'break-word' },
      space: { whiteSpace: 'break-spaces' },
      none: { whiteSpace: 'nowrap' },
    },
    size: {
      primary: { fontSize: 'primary' },
      pageTitle: { fontSize: 'xl' },
      header: { fontSize: 'lg' },
      subHeader: { fontSize: 'md' },
      label: { fontSize: 'sm' },
      small: { fontSize: 'xs' },
      extraSmall: { fontSize: 'xxs' },
    },
    color: {
      unset: {},
      normal: { color: 'text.normal' },
      active: { color: 'text.active' },
      link: {
        color: 'text.active',
        _hover: { textDecoration: 'underline' },
      },
      label: { color: 'text.label' },
      light: { color: 'text.light' },
      success: { color: 'text.success' },
      warning: { color: 'text.warning' },
      error: { color: 'text.error' },
      black: { color: 'black' },
      white: { color: 'white' },
    },
    weight: {
      primary: { fontWeight: 'primary' },
      medium: { fontWeight: 'md' },
      bold: { fontWeight: 'lg' },
      extraBold: { fontWeight: 'xl' },
    },
    font: {
      normal: { fontFamily: 'body' },
      monospace: { fontFamily: 'mono' },
    },
    fontStyle: {
      italic: { fontStyle: 'italic' },
    },
    spaces: {
      trim: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
      preserve: { whiteSpace: 'pre-wrap' },
    },
    pointerEvents: {
      'none': {
        pointerEvents: 'none',
      },
    },
    align: {
      center: { textAlign: 'center' },
      left: { textAlign: 'left' },
      right: { textAlign: 'right' },
    },
  },
});

export type StyledTextProps = PropsFromCVA<typeof styledText> & Customizable<{ text: React.ReactNode }>;

export const StyledText = (props: StyledTextProps): React.JSX.Element => {
  const { className, text, ...options } = props;
  return <span className={clsx(styledText(options), className)}>{text}</span>;
};

export const PageTitle = (props: StyledTextProps): React.JSX.Element => (
  <StyledText size="pageTitle" color="normal" weight="extraBold" {...props} />
);

export const Header = (props: StyledTextProps): React.JSX.Element => (
  <StyledText size="header" color="normal" weight="bold" {...props} />
);

export const SubHeader = (props: StyledTextProps): React.JSX.Element => <Header size="subHeader" {...props} />;

export const NormalText = (props: StyledTextProps): React.JSX.Element => (
  <StyledText size="primary" color="normal" weight="primary" {...props} />
);

export const Label = (props: StyledTextProps): React.JSX.Element => (
  <StyledText size="label" color="label" weight="primary" {...props} />
);

export const SubLabel = (props: StyledTextProps): React.JSX.Element => (
  <StyledText size="small" color="label" weight="medium" {...props} />
);

export const LightSubLabel = (props: StyledTextProps): React.JSX.Element => (
  <StyledText size="small" color="light" weight="primary" {...props} />
);

export const SingleLine = ({
  children,
  ...props
}: React.PropsWithChildren<React.HtmlHTMLAttributes<HTMLDivElement>>): React.JSX.Element => {
  return (
    <styled.div
      whiteSpace="nowrap"
      width="full"
      overflow="hidden"
      textOverflow="ellipsis"
      pointerEvents="none"
      {...props}
    >
      {children}
    </styled.div>
  );
};
