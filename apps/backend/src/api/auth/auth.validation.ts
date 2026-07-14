import * as z from 'zod';

export const user = z.object({
  username: z.string().min(4, 'Username should have atlest 4 characters'),
  password: z.string().min(8, 'Password should have atleast 8 characters'),
});
