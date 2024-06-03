import { z } from 'zod';

export const UpdateUserInputSchema = z
  .object({
    name: z.string().min(3, 'Name must be at least 3 characters long.'),
    email: z.string(),
    currentPassword: z.string().min(6, 'Password must be at least 6 characters long.'),
    password: z.string().min(6, 'Password must be at least 6 characters long.'),
  })
  .partial();

export type UpdateUserInput = z.infer<typeof UpdateUserInputSchema>;
