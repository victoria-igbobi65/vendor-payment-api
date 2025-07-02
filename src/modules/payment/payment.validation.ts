import { z } from 'zod';

export const createPaymentSchema = z.object({
  amount: z.number().positive('Amount must be greater than 0'),
  currency: z.string().min(1, 'Currency is required'),
  vendorId: z.string().uuid('Invalid vendor ID'),
});
