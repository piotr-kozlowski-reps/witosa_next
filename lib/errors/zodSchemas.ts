import { z } from 'zod';

export const loginEmailSchema = z
  .string({
    required_error: 'E-mail jest wymagany.',
    description: 'E-mail jest wymagany.',
  })
  .email('Podany e-mail jest niepoprawny.');
export const loginPasswordSchema = z
  .string({
    required_error: 'Hasło jest wymagane.',
    description: 'Hasło jest wymagane.',
  })
  .min(5, 'Hasło musi mieć minimum 5 znaków.')
  .max(20, 'Długość hasła nie może przekraczać 20 znaków.');
