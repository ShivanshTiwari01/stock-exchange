import * as z from 'zod';

export const marketSchema = z.object({
  name: z.string().min(2, 'market name should have atleast 2 characters'),
  symbol: z.string().min(2, 'market symobl must have atleast 2 characters'),
});
