import React from 'react';

import type { FullError } from '~/utils/types.js';
import { log } from '~/utils/logger.js';
import { parseJson, serializeToJson } from '~/utils/json.js';
import { AccessDeniedSvg, ErrorSvg } from '~/icons/index.js';
import type { ErrorSvgProps } from '~/icons/index.js';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../shadow-panda/Accordion.js';
import { NormalText, Label } from '../general/Text.js';
import { MonospaceBlock } from '../general/MonospaceBlock.js';
import { EmptyView } from './EmptyView.js';

export type ErrorViewProps<T> = {
  error: FullError<T>;
  type?: 'access' | 'default';
  iconVariant?: ErrorSvgProps['variant'];
  actions?: React.ReactNode;
};

const serializeError = (error: FullError<any>): { message: string; context?: string | null } => {
  let message = error.message;
  let context = error.cause;

  if (context && 'message' in context && 'cause' in context) {
    return serializeError(context);
  }

  try {
    const parsedMessage = parseJson(message);
    message = 'Unknown Error';
    context = parsedMessage;
  } catch {
    // Plain text error
  }

  const replacer = (_: any, value: any) =>
    value instanceof Error
      ? {
          message: value.message,
          cause: value.cause,
        }
      : value;

  return {
    message,
    context: context
      ? serializeToJson({ message, context }, replacer, 1)?.replaceAll('\\n', '\n')?.replaceAll('\\"', '"')
      : null,
  };
};

export const ErrorView = <T extends Record<any, any>>(props: ErrorViewProps<T>) => {
  const { error, actions, type, iconVariant = 'normal' } = props;

  const { message, context } = serializeError(error);

  React.useEffect(() => {
    if (context) {
      log.error({ context }, message);
    }
  }, [context, error, message]);

  return (
    <EmptyView
      rawIcon={type === 'access' ? <AccessDeniedSvg /> : <ErrorSvg variant={iconVariant} />}
      title={
        <>
          <NormalText text={message} color="error" weight="medium" />
          {context && (
            <Accordion type="single" collapsible>
              <AccordionItem value="context" border="none">
                <AccordionTrigger gap="xs">
                  <Label text="See technical details" />
                </AccordionTrigger>
                <AccordionContent>
                  <MonospaceBlock code={context} entity="Error details" spaces="preserve" />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}
          {actions}
        </>
      }
    />
  );
};
