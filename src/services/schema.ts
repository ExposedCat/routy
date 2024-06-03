import { z } from 'zod';

import { getDateWithTimezone } from '~/utils/datetime.js';

export const ze = {
  dateOrString: (): z.ZodType<Date, any, Date | string> =>
    z.date().or(z.string().transform(it => getDateWithTimezone(it))),
};
