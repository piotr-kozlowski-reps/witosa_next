import { TCyclicalActivitiesFormValues } from '@/types';
import { z } from 'zod';
import { nameSchema_Required_Min2 } from '../zodSchemas';

export const cyclicalActivityValidationSchema: z.ZodType<TCyclicalActivitiesFormValues> =
  z.object({
    name: nameSchema_Required_Min2,
    // expiresAt: isDateSchema,

    // email: emailSchema,
    // password: passwordSchema_Required_Min5_Max20,
    // confirmPassword: passwordSchema_Required_Min5_Max20,
    // userRole: useRoleSchema,
  });
// .refine((data) => data.password === data.confirmPassword, {
//   message: 'Wpisane hasła się różnią',
//   path: ['confirmPassword'],
// });

export type TCyclicalActivityFormInputs = z.TypeOf<
  typeof cyclicalActivityValidationSchema
>;
