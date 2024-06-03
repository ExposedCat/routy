import React from 'react';
import { localShortISO } from '@routy/routy-shared';

import { Input } from './Input.js';
import type { InputProps } from './Input.js';

export type DateTimePickerProps = InputProps & {
  date?: Date;
  setDate: (date: Date) => void;
};

export const DateTimePicker: React.FC<DateTimePickerProps> = props => {
  const { date, setDate, ...rest } = props;

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => setDate(new Date(event.target.value)),
    [setDate],
  );

  return (
    <Input width="auto" type="datetime-local" value={date && localShortISO(date)} onChange={handleChange} {...rest} />
  );
};
