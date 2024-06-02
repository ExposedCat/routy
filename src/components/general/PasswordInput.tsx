import React from 'react';

import { css } from '~/styled-system/css/css.mjs';
import { HideIcon, ShowIcon } from '~/icons/react-icons.js';
import { Input, type InputProps } from './Input.js';
import { Flex } from './Flex.js';
import { Button } from './Button.js';

export type PasswordInputProps = InputProps & {
  variant?: 'new' | 'current';
  showPasswordButton?: boolean;
};

export const PasswordInput = React.forwardRef(
  (props: PasswordInputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    const { showPasswordButton = true, variant = 'current', ...inputProps } = props;

    const [showPassword, setShowPassword] = React.useState<boolean>(false);

    return (
      <Flex gap="xs">
        <Input
          ref={ref}
          placeholder={inputProps.placeholder}
          autoComplete={variant === 'new' ? 'new-password' : 'current-password'}
          type={showPassword ? 'text' : 'password'}
          wrapperProps={{
            className: css({ width: 'full' }),
          }}
          {...inputProps}
        />
        {showPasswordButton && (
          <Button
            variant="outline"
            colorVariant="white"
            size="icon"
            type="button"
            icon={showPassword ? HideIcon : ShowIcon}
            onClick={() => setShowPassword(!showPassword)}
          />
        )}
      </Flex>
    );
  },
);
