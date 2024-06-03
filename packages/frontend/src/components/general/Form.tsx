import type { ZodType } from 'zod';
import type { IconType } from 'react-icons';
import { useForm as _useForm } from 'react-hook-form';
import type { ControllerRenderProps, DefaultValues, Mode, Path, UseFormReturn } from 'react-hook-form';
import React from 'react';
import { formMessage } from '@styled-system/recipes/form-message.mjs';
import { styled } from '@styled-system/jsx/factory.mjs';
import { css } from '@styled-system/css/css.mjs';
import { zodResolver } from '@hookform/resolvers/zod';

import { clsx } from '~/utils/types.js';
import { log } from '~/utils/logger.js';
import { serializeToJson, parseJson } from '~/utils/json.js';
import { Flex } from '~/styled-system/jsx/flex.mjs';
import { useToast } from '~/hooks/use-toast.js';
import {
  _Form,
  _FormField,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  useFormField,
} from '../shadow-panda/Form.js';
import { LightSubLabel } from './Text.js';
import { Button } from './Button.js';

export type { UseFormReturn, ControllerRenderProps } from 'react-hook-form';
export { useFieldArray } from 'react-hook-form';

export function useForm<T extends Record<any, any>>(
  schema: ZodType<T, any, any>,
  defaultValues?: DefaultValues<T>,
  mode: Mode = 'onSubmit',
): UseFormReturn<T, any, any> {
  const serializedDefaults = serializeToJson(defaultValues ?? {});

  const form = _useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
    mode,
  });

  React.useEffect(() => {
    form.reset(parseJson<DefaultValues<T>>(serializedDefaults));
  }, [form, serializedDefaults]);

  return form;
}

export type FormProps<T extends Record<any, any>> = {
  form: UseFormReturn<T, any, any>;
  submitLabel?: string | null;
  submitIcon?: IconType | null;
  submitActionFull?: boolean;
  submitVariant?: 'link' | 'outline' | 'filled' | 'light' | 'ghost' | undefined;
  actions?: React.ReactNode;
  onSubmit?: (values: T) => void;
  className?: string;
  disabled?: (values: T) => boolean;
  errorToast?: boolean;
  canDiscard?: boolean;
};

export const Form = <T extends Record<any, any>>(props: React.PropsWithChildren<FormProps<T>>) => {
  const {
    form,
    submitLabel,
    submitIcon,
    submitVariant,
    actions,
    onSubmit = () => {},
    children,
    className,
    disabled,
    submitActionFull = false,
    errorToast = true,
    canDiscard = false,
  } = props;

  const { toast } = useToast();

  const formStyles = css({ spaceY: 'sm' });
  const buttonStyles = css({ width: submitActionFull ? 'full' : undefined });

  React.useEffect(() => {
    if (form.formState.errors.submit?.message) {
      log.error({ error: form.formState.errors.submit }, 'Form sumbission threw an error');
      form.setError('root', { message: 'Unknown error' });
      if (errorToast) {
        toast({ description: 'Unexpected error', colorVariant: 'error' });
      }
    }
  }, [errorToast, form.formState.errors.submit?.message, toast, form.formState.submitCount, form]);

  const handleSubmitFn = (values: T) => {
    onSubmit(values);
    form.reset(values, { keepDirty: false });
  };

  const handleDiscard = React.useCallback(() => {
    form.reset();
  }, [form]);

  return (
    <_Form {...form}>
      <styled.form onSubmit={form.handleSubmit(handleSubmitFn)} className={clsx(formStyles, className)}>
        {children}
        <Flex gap="sm" justify="flex-end">
          {actions}
          {canDiscard && (
            <Button
              onClick={handleDiscard}
              disabled={!form.formState.isDirty || disabled?.(form.watch())}
              variant="outline"
              colorVariant="white"
              label="Discard Changes"
            />
          )}
          {(submitLabel || submitIcon) && (
            <Button
              icon={submitIcon}
              label={submitLabel}
              className={buttonStyles}
              type="submit"
              variant={submitVariant}
              disabled={disabled?.(form.watch()) ?? false}
            />
          )}
        </Flex>
      </styled.form>
    </_Form>
  );
};

const BaseFormMessage = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ children, ...props }, ref) => {
    const { error, formMessageId } = useFormField();
    const body = error && error?.message ? String(error?.message) : children;

    if (!body) {
      return null;
    }

    return (
      <p ref={ref} id={formMessageId} {...props}>
        {body}
      </p>
    );
  },
);
BaseFormMessage.displayName = 'FormMessage';

const FormMessage = styled(BaseFormMessage, formMessage);

export type FormFieldProps<T extends Record<any, any>, N extends Path<T>> = {
  form: UseFormReturn<T, any, any>;
  name: N;
  label?: React.ReactNode;
  description?: string;
  render: (field: ControllerRenderProps<T, N>) => React.JSX.Element;
  maxLength?: number;
};

export const FormField = <T extends Record<any, any>, N extends Path<T>>(props: FormFieldProps<T, N>) => {
  const { form, name, label, description, render, maxLength } = props;

  return (
    <_FormField
      control={form.control}
      name={name}
      render={({ field }: { field: ControllerRenderProps<T, N> }) => {
        return (
          <FormItem>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>{render(field)}</FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            {maxLength && (
              <Flex justifyContent="flex-end">
                <LightSubLabel
                  text={`${field.value ? field.value.length : 0}/${maxLength}`}
                  color={field.value && field.value.length >= maxLength ? 'error' : 'light'}
                />
              </Flex>
            )}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export { FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '../shadow-panda/Form.js';
