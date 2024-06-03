import { z } from 'zod';

export const UpdateUserInputSchema = z
  .object({
    name: z.string(),
    email: z.string(),
    currentPassword: z.string(),
    password: z.string(),
  })
  .partial();

export type UpdateUserInput = z.infer<typeof UpdateUserInputSchema>;
