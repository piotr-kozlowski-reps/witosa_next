import { ActivityType, ForWhom, Place, UserRole } from '@prisma/client';
import { z } from 'zod';

//
/** email */
export const emailSchema = z
  .string({
    required_error: 'E-mail jest wymagany.',
    description: 'E-mail jest wymagany.',
  })
  .email('Podany e-mail jest niepoprawny.');

//
/** pass */
export const passwordSchema_Required_Min5_Max20 = z
  .string({
    required_error: 'Hasło jest wymagane.',
    description: 'Hasło jest wymagane.',
  })
  .min(5, 'Hasło musi mieć minimum 5 znaków.')
  .max(20, 'Długość hasła nie może przekraczać 20 znaków.');

//
/** name */
export const nameSchema_Required_Min2 = z
  .string({
    required_error: 'Pole jest wymagane',
  })
  .min(2, { message: 'min 2 znaki' });

export const useRoleSchema = z.nativeEnum(UserRole);

//
/** activity type */
export const activityTypeSchema = z.nativeEnum(ActivityType);
export const activityTypeArraySchema = z
  .array(activityTypeSchema)
  .nonempty({ message: 'Chociaż jeden rodzaj zajęć musi być wybrany.' });

//
/** for whom */
export const forWhomSchema = z.nativeEnum(ForWhom);
export const forWhomArraySchema = z
  .array(forWhomSchema)
  .nonempty({ message: 'Chociaż jeden element musi być wybrany.' });

//
/** place */
export const placeSchema = z.nativeEnum(Place);
export const placesArraySchema = z
  .array(placeSchema)
  .nonempty({ message: 'Chociaż jedno miejsce musi być wybrane.' });

//
/** pass can be undefined */
export const password_NotRequired_CanBeUndefined = z
  .string({
    required_error: 'Pole jest wymagane',
  })
  .min(2, { message: 'min 2 znaki' });

//
/** date */
export const isDateSchema = z.date({ description: 'Data ma zły format.' });

//
/** boolean*/
export const isBooleanSchema = z.boolean();

//
/** date or null */
export const isDateOrNullSchema = z.nullable(
  z.date({ description: 'Data ma zły format.' })
); //TODO: nie bardzo - muszę to poprawić - czy realnie jest tam data?
