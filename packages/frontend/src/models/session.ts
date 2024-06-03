import { z } from 'zod';

export const SessionSchema = z.object({
  userId: z.string(),
  userName: z.string(),
});
export type Session = z.infer<typeof SessionSchema>;
