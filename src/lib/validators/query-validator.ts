import { z } from 'zod';

export const QueryValidator = z.object({
  catergory: z.string().optional(),
  sort: z.enum(['asc', 'desc']).optional(),
  limit: z.number().optional(),
});

export type TQueryValidator = z.infer<typeof QueryValidator>;
