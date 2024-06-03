import { z } from 'zod';

import { ze } from '../utils/schema.js';

export const TaskPrioritySchema = z.enum(['low', 'normal', 'high', 'urgent']);
export type TaskPriority = z.infer<typeof TaskPrioritySchema>;

export const TaskStatusSchema = z.enum(['open', 'active', 'done', 'closed']);
export type TaskStatus = z.infer<typeof TaskStatusSchema>;

export const PrivateTaskSchema = z.object({
  userId: z.string(),
  title: z.string(),
  description: z.string().nullish(),
  priority: TaskPrioritySchema,
  status: TaskStatusSchema,
  deadline: ze.dateOrString(),
});
export type PrivateTask = z.infer<typeof PrivateTaskSchema>;

export const TaskSchema = PrivateTaskSchema.extend({
  id: z.string(),
});
export type Task = z.infer<typeof TaskSchema>;
