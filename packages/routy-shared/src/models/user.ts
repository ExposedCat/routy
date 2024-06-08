import { z } from 'zod';

export const PrivateUserSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
});
export type PrivateUser = z.infer<typeof PrivateUserSchema>;

export const UserSchema = PrivateUserSchema.omit({
  password: true,
}).extend({
  id: z.string(),
});
export type User = z.infer<typeof UserSchema>;
