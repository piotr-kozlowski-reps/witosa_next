import { TCyclicalActivitiesFormValues } from '@/types';
import { z } from 'zod';
import {
  activityTypeArraySchema,
  forWhomArraySchema,
  isBooleanSchema,
  isDateOrNullSchema,
  isDateSchema,
  nameSchema_Required_Min2,
  placesArraySchema,
} from '../zodSchemas';

// export function getCyclicalActivityValidationSchema(
//   isExpiresAtShouldBePresent: boolean
// ) {
//   const cyclicalActivityValidationSchema: z.ZodType<TCyclicalActivitiesFormValues> =
//     z.object({
//       name: nameSchema_Required_Min2,
//       activityTypes: activityTypeArraySchema,
//       activitiesForWhom: forWhomArraySchema,
//       places: placesArraySchema,
//       isToBePublished: isBooleanSchema,

//       expiresAt: isExpiresAtShouldBePresent ? isDateSchema : isDateOrNullSchema,
//     });

//   return cyclicalActivityValidationSchema;
// }

export function getCyclicalActivityValidationSchema() {
  return cyclicalActivityValidationSchemaStageOne;
}

export const cyclicalActivityValidationSchemaStageOne: z.ZodType<TCyclicalActivitiesFormValues> =
  z
    .object({
      name: nameSchema_Required_Min2,
      activityTypes: activityTypeArraySchema,
      activitiesForWhom: forWhomArraySchema,
      places: placesArraySchema,
      isToBePublished: isBooleanSchema,
      isExpiresAtRequired: isBooleanSchema,
      expiresAt: isDateOrNullSchema,
    })
    .superRefine((values, context) => {
      if (!values.isExpiresAtRequired) {
        return;
      }

      const isValidated = isDateSchema.safeParse(values.expiresAt);
      if (isValidated.success) {
        return;
      }

      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Data musi być określona.',
        path: ['expiresAt'],
      });
    });

export type TCyclicalActivityFormInputs = z.TypeOf<
  typeof cyclicalActivityValidationSchemaStageOne
>;
