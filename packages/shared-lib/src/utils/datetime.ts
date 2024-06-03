import { formatInTimeZone, zonedTimeToUtc } from 'date-fns-tz';
import { formatDistance, format as fnsFormat, differenceInCalendarDays } from 'date-fns';

export const SECOND = 1000;
export const MINUTE = 60 * SECOND;
export const HOUR = MINUTE * 60;
export const DAY = HOUR * 24;
export const WEEK = DAY * 7;
export const MONTH = DAY * 30;
export const YEAR = DAY * 365;

export function getShortTimeElapsed(uptime: number): string {
  if (uptime) {
    return formatDistance(new Date(Date.now() + uptime * 1000), new Date(), { addSuffix: false });
  }

  return 'now';
}

export function formatDate(date: Date, format: 'iso' | 'time-dayofyear' | 'full'): string {
  switch (format) {
    case 'iso':
      return date.toISOString();
    case 'time-dayofyear':
      return fnsFormat(date, 'D HH:mm:ss', { useAdditionalDayOfYearTokens: true });
    case 'full':
      return fnsFormat(date, 'yyyy/MM/dd, HH:mm a');
  }
}

function hasTimezone(date: Date | string): boolean {
  const dateString = date instanceof Date ? date.toISOString() : date;
  const timezonePattern = /Z|([+-]\d{2}:\d{2})$/;
  return timezonePattern.test(dateString);
}

export function getDateWithTimezone(date: Date | string): Date {
  return new Date(hasTimezone(date) ? date : `${date.toString()}Z`);
}

export function formatDateISOInTimezone(date: Date, timezone: string): string {
  return formatInTimeZone(date, timezone, 'yyyy-MM-dd HH:mm:ss zzz');
}

export function getShortDateOrDistance(
  date: Date | null | string,
  opts?: {
    addSuffix?: boolean;
  },
): string {
  if (date) {
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const currentUTCDate = zonedTimeToUtc(new Date(), 'UTC');
    const serverDate = zonedTimeToUtc(getDateWithTimezone(date), 'UTC');
    if (differenceInCalendarDays(serverDate, currentUTCDate) > 30) {
      return formatInTimeZone(serverDate, userTimezone, 'MMM dd, yyyy');
    }
    return formatDistance(serverDate, currentUTCDate, { addSuffix: opts?.addSuffix ?? true });
  }

  return '';
}

export function getDistance(
  date: Date | null | string,
  opts?: {
    addSuffix?: boolean;
  },
): string {
  if (date) {
    return formatDistance(new Date(date), new Date(), { addSuffix: opts?.addSuffix ?? true });
  }

  return '';
}

export function getShortDate(date: Date | null | string): string {
  if (date) {
    return fnsFormat(new Date(date), 'MMM dd, yyyy');
  }
  return '';
}

export function getTime(date: Date | null | string): string {
  if (date) {
    return fnsFormat(new Date(date), 'hh:mm:ss a');
  }
  return '';
}

export function getShortTime(date: Date | null | string): string {
  if (date) {
    return fnsFormat(new Date(date), 'h:mm a');
  }
  return '';
}

export function getShortDateTime(date: Date | null | string): string {
  if (date) {
    return fnsFormat(new Date(date), 'MMM dd - h:mm a');
  }
  return '';
}

export function unixTimestamp(): number {
  return Math.floor(unixTimestampWithMillis());
}

export function unixTimestampWithMillis(): number {
  return new Date().getTime() / 1000;
}

export function unixTimestampAtUtc(): number {
  return Math.floor(unixTimestampWithMillisAtUtc());
}

export function unixTimestampWithMillisAtUtc(): number {
  return zonedTimeToUtc(new Date(), Intl.DateTimeFormat().resolvedOptions().timeZone).getTime() / 1000;
}

export function toTwoDigits(number: number): string {
  return `${number <= 9 ? 0 : ''}${number}`;
}

export function secondsToTime(seconds: number): string {
  return `${toTwoDigits(Math.trunc(seconds / 60))}:${toTwoDigits(Math.floor(seconds % 60))}`;
}

export function newestFirstByCreatedAt<T extends { createdAt: Date }>(a: T, b: T): number {
  return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
}
export function oldestFirstByCreatedAt<T extends { createdAt: Date }>(a: T, b: T): number {
  return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
}
