import { z } from 'zod';

export const requestLoginSchema = z.object({
  email: z.string().email({ message: 'Invalid email format' }),
});

export const verifyLoginSchema = z.object({
  email: z.string().email({ message: 'Invalid email format' }),
  code: z.string().length(6, { message: 'OTP must be exactly 6 digits' }),
});

export const validate =
  (schema: z.ZodSchema<any>) =>
  (req: any, res: any, next: any): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const flat = result.error.flatten();
      const fieldErrors = flat.fieldErrors;
      const generalErrors = flat.formErrors;

      const hasFieldErrors = Object.keys(fieldErrors).length > 0;

      return res.status(400).json({
        message: 'Validation failed',
        errors: hasFieldErrors
          ? fieldErrors
          : { requestBody: generalErrors.length ? generalErrors : ['Invalid request body'] },
      });
    }

    req.body = result.data;
    next();
  };
