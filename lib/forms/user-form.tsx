import { TRegisterFormValues } from '@/types';
import { z } from 'zod';
import {
  emailSchema,
  nameSchema_Required_Min2,
  passwordSchema_Required_Min5_Max20,
  useRoleSchema,
} from '../zodSchemas';

export const userValidationSchema: z.ZodType<TRegisterFormValues> = z
  .object({
    name: nameSchema_Required_Min2,
    email: emailSchema,
    password: passwordSchema_Required_Min5_Max20,
    confirmPassword: passwordSchema_Required_Min5_Max20,
    userRole: useRoleSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Wpisane hasła się różnią',
    path: ['confirmPassword'],
  });

export type TRegisterFormInputs = z.TypeOf<typeof userValidationSchema>;
