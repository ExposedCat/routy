import { z } from 'zod';

import { TaskSchema } from '../task.js';

export const DashboardDataSchema = z.object({
  total: z.number(),
  open: z.number(),
  overdue: z.number(),
  today: z.number(),
  mostOverdue: TaskSchema.array(),
  next: TaskSchema.nullish(),
});
export type DashboardData = z.infer<typeof DashboardDataSchema>;
