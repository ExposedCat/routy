import * as React from 'react';
import { alert, alertDescription, alertTitle } from '@styled-system/recipes/index.mjs';
import { styled } from '@styled-system/jsx/factory.mjs';

export const _BaseAlert = (props: React.HTMLAttributes<HTMLDivElement>, ref: React.ForwardedRef<HTMLDivElement>) => (
  <div ref={ref} {...props} role="alert" />
);

export const _Alert = styled(React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(_BaseAlert), alert);
export const _AlertTitle = styled('h5', alertTitle);
export const _AlertDescription = styled('div', alertDescription);
