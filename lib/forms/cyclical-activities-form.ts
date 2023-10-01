import {
  TCyclicalActivitiesFormValues,
  TCyclicalActivitiesFormValuesStageOne,
  TCyclicalActivitiesFormValuesStageTwo,
} from '@/types';
import { z } from 'zod';
import {
  activityTypeArraySchema,
  forWhomArraySchema,
  isBooleanSchema,
  isDateOrNullSchema,
  isDateSchema,
  nameSchema_Required_Min2,
  placesArraySchema,
  shortDescription_Required_Min5,
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

////stage one
export function getCyclicalActivityValidationSchemaForStageOne() {
  return cyclicalActivityValidationSchemaStageOne;
}
export const cyclicalActivityValidationSchemaStageOne: z.ZodType<TCyclicalActivitiesFormValuesStageOne> =
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

export function getCyclicalActivityValidationSchemaForStageTwo() {
  return cyclicalActivityValidationSchemaStageTwo;
}
export const cyclicalActivityValidationSchemaStageTwo: z.ZodType<TCyclicalActivitiesFormValuesStageTwo> =
  z.object({
    shortDescription: shortDescription_Required_Min5,
  });

////union (unfortunately I have no idea how to do it dynamically)
export function getCyclicalActivityValidationSchema(): z.ZodType<TCyclicalActivitiesFormValues> {
  return z
    .object({
      //stage1
      name: nameSchema_Required_Min2,
      activityTypes: activityTypeArraySchema,
      activitiesForWhom: forWhomArraySchema,
      places: placesArraySchema,
      isToBePublished: isBooleanSchema,
      isExpiresAtRequired: isBooleanSchema,
      expiresAt: isDateOrNullSchema,

      //stage2
      shortDescription: shortDescription_Required_Min5,
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
}

export type TCyclicalActivityFormInputs = z.TypeOf<
  typeof cyclicalActivityValidationSchemaStageOne &
    typeof cyclicalActivityValidationSchemaStageTwo
>;
