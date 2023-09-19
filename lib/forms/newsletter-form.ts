import { TNewsletterFormValues } from '@/types';
import { z } from 'zod';

export const newsletterValidationSchema: z.ZodType<TNewsletterFormValues> =
  z.object({
    email: z
      .string({
        required_error: 'Wprowadź e-mail w poprawnej formie.',
      })
      .email('Wprowadź e-mail w poprawnej formie.'),
  });

export type NewsletterFormInputs = z.TypeOf<typeof newsletterValidationSchema>;
