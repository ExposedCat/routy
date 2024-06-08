import { z } from 'zod';

export const GetSessionResponseSchema = z
  .object({
    name: z.string(),
    email: z.string(),
  })
  .partial();

export type GetSessionResponse = z.infer<typeof GetSessionResponseSchema>;
