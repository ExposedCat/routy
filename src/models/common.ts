import { z } from 'zod';

export const ZodErrorItemSchema = z.object({
  code: z.string(),
  message: z.string(),
  path: z.array(z.string()),
  expected: z.string().optional(),
  received: z.string().optional(),
  validation: z.string().optional(),
  inclusive: z.boolean().optional(),
  minimum: z.number().optional(),
  type: z.string().optional(),
});
export type ZodErrorItem = z.infer<typeof ZodErrorItemSchema>;

export const CommonFailedBodySchema = z.object({
  __type: z.literal('zod').optional().default('zod'),
  message: z.string(),
  errors: z.array(ZodErrorItemSchema).optional(),
});
export type CommonFailedBody = z.infer<typeof CommonFailedBodySchema>;
