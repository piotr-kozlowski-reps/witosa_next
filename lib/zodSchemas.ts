import { UserRole } from '@prisma/client';
import { z } from 'zod';

export const emailSchema = z
  .string({
    required_error: 'E-mail jest wymagany.',
    description: 'E-mail jest wymagany.',
  })
  .email('Podany e-mail jest niepoprawny.');

export const passwordSchema_Required_Min5_Max20 = z
  .string({
    required_error: 'Hasło jest wymagane.',
    description: 'Hasło jest wymagane.',
  })
  .min(5, 'Hasło musi mieć minimum 5 znaków.')
  .max(20, 'Długość hasła nie może przekraczać 20 znaków.');

export const nameSchema_Required_Min2 = z
  .string({
    required_error: 'Pole jest wymagane',
  })
  .min(2, { message: 'min 2 znaki' });

export const useRoleSchema = z.nativeEnum(UserRole);

export const password_NotRequired_CanBeUndefined = z
  .string({
    required_error: 'Pole jest wymagane',
  })
  .min(2, { message: 'min 2 znaki' });
