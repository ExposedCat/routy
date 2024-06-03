import { z } from 'zod';

import { ze } from '../utils/schema.js';

export const TaskPrioritySchema = z.enum(['low', 'normal', 'high', 'urgent']);
export type TaskPriority = z.infer<typeof TaskPrioritySchema>;

export const TaskStatusSchema = z.enum(['open', 'active', 'done', 'closed']);
export type TaskStatus = z.infer<typeof TaskStatusSchema>;

export const TaskSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional().default(''),
  priority: TaskPrioritySchema,
  status: TaskStatusSchema,
  deadline: ze.dateOrString(),
});
export type Task = z.infer<typeof TaskSchema>;
