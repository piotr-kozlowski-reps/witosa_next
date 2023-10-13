import * as Yup from 'yup';
import {
  activityTypeArrayYupSchema,
  customLinkToDetailsYupSchema,
  cyclicalActivityExpiresAtYupSchema,
  forWhomArrayYupSchema,
  imagesArrayYupSchema,
  isBooleanYupSchema,
  longDescriptionYupSchema,
  nameSchemaYup_Required_Min2,
  occurrenceYupSchema,
  placesYupSchema,
} from '../yupSchemas';

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
// export function getCyclicalActivityValidationSchemaForStageOne() {
//   return cyclicalActivityValidationSchemaStageOne;
// }
// export const cyclicalActivityValidationSchemaStageOne: z.ZodType<TCyclicalActivitiesFormValuesStageOne> =
//   z
//     .object({
//       name: nameSchema_Required_Min2,
//       activityTypes: activityTypeArraySchema,
//       activitiesForWhom: forWhomArraySchema,
//       places: placesArraySchema,
//       isToBePublished: isBooleanSchema,
//       isExpiresAtRequired: isBooleanSchema,
//       expiresAt: isDateOrNullSchema,
//     })
//     .superRefine((values, context) => {
//       if (!values.isExpiresAtRequired) {
//         return;
//       }

//       const isValidated = isDateSchema.safeParse(values.expiresAt);
//       if (!isValidated.success) {
//         context.addIssue({
//           code: z.ZodIssueCode.custom,
//           message: 'Data musi być określona.',
//           path: ['expiresAt'],
//         });
//       }
//     });

// export function getCyclicalActivityValidationSchemaForStageTwo() {
//   return cyclicalActivityValidationSchemaStageTwo;
// }
// export const cyclicalActivityValidationSchemaStageTwo: z.ZodType<TCyclicalActivitiesFormValuesStageTwo> =
//   z
//     .object({
//       shortDescription: shortDescription_Required_Min5,
//       isCustomLinkToDetails: isBooleanSchema,
//       customLinkToDetails: customLinkToDetails_Required_Or_Null,
//       longDescription: customLinkToDetails_Required_Or_Null,
//     })
//     .superRefine((values, context) => {
//       if (values.isCustomLinkToDetails) {
//         const isValidated = customLinkToDetails_Required.safeParse(
//           values.customLinkToDetails
//         );

//         if (!isValidated.success) {
//           context.addIssue({
//             code: z.ZodIssueCode.custom,
//             message: 'błąd.',
//             path: ['longDescription'],
//           });
//         }
//       }
//       if (!values.isCustomLinkToDetails) {
//         const isValidated = customLinkToDetails_Required.safeParse(
//           values.longDescription
//         );

//         if (!isValidated.success) {
//           context.addIssue({
//             code: z.ZodIssueCode.custom,
//             message: 'błąd.',
//             path: ['longDescription'],
//           });
//         }
//       }
//     });

////union (unfortunately I have no idea how to do it dynamically)
// export function getCyclicalActivityValidationSchema(): z.ZodType<TCyclicalActivitiesFormValues> {
//   return z.object({
//     //stage1
//     name: nameSchema_Required_Min2,
//     activityTypes: activityTypeArraySchema,
//     activitiesForWhom: forWhomArraySchema,
//     places: placesArraySchema,
//     isToBePublished: isBooleanSchema,
//     isExpiresAtRequired: isBooleanSchema,
//     expiresAt: isDateOrNullSchema,

//     //stage2
//     shortDescription: shortDescription_Required_Min5,
//     isCustomLinkToDetails: isBooleanSchema,
//     customLinkToDetails: customLinkToDetails_Required_Or_Null,
//     longDescription: longDescription_Required_Or_Null,
//   });
// .superRefine((values, context) => {
//   console.log('inside');
//   // if (!values.isExpiresAtRequired) {
//   //   // return;
//   // }

//   const isValidated = isDateSchema.safeParse(values.expiresAt);
//   if (!isValidated.success) {
//     context.addIssue({
//       code: z.ZodIssueCode.custom,
//       message: 'Data musi być określona.',
//       path: ['expiresAt'],
//     });
//   }
// })
// .superRefine((values, context) => {
//   if (values.isCustomLinkToDetails) {
//     const isValidated = customLinkToDetails_Required.safeParse(
//       values.customLinkToDetails
//     );

//     if (!isValidated.success) {
//       context.addIssue({
//         code: z.ZodIssueCode.custom,
//         message: 'błąd.',
//         path: ['longDescription'],
//       });
//     }
//   }
//   if (!values.isCustomLinkToDetails) {
//     const isValidated = customLinkToDetails_Required.safeParse(
//       values.longDescription
//     );

//     if (!isValidated.success) {
//       context.addIssue({
//         code: z.ZodIssueCode.custom,
//         message: 'błąd.',
//         path: ['longDescription'],
//       });
//     }
//   }
// });
// }

export const cyclicalActivityValidationSchemaStageOneWithYup = {
  name: nameSchemaYup_Required_Min2,
  activityTypes: activityTypeArrayYupSchema,
  activitiesForWhom: forWhomArrayYupSchema,
  places: placesYupSchema,
  isToBePublished: isBooleanYupSchema,
  isExpiresAtRequired: isBooleanYupSchema,
  expiresAt: cyclicalActivityExpiresAtYupSchema,
};

export const cyclicalActivityValidationSchemaStageTwoWithYup = {
  shortDescription: nameSchemaYup_Required_Min2,
  isCustomLinkToDetails: isBooleanYupSchema,
  customLinkToDetails: customLinkToDetailsYupSchema,
  longDescription: longDescriptionYupSchema,
  images: imagesArrayYupSchema,
};

export const cyclicalActivityValidationSchemaStageThreeWithYup = {
  occurrence: occurrenceYupSchema,
};

const yupSchema = Yup.object({
  ...cyclicalActivityValidationSchemaStageOneWithYup,
  ...cyclicalActivityValidationSchemaStageTwoWithYup,
  ...cyclicalActivityValidationSchemaStageThreeWithYup,
});

export function generateValidationForCyclicalActivities() {
  return yupSchema;
}
export function validateValuesForCyclicalActivitiesStageOne(values: Object) {
  return Yup.object({
    ...cyclicalActivityValidationSchemaStageOneWithYup,
  }).isValidSync(values, { context: values });
}
export function validateValuesForCyclicalActivitiesStageTwo(values: Object) {
  return Yup.object({
    ...cyclicalActivityValidationSchemaStageTwoWithYup,
  }).isValidSync(values, { context: values });
}

export function validateValuesForCyclicalActivities(values: Object) {
  return yupSchema.isValidSync(values, { context: values });
}

export type TCyclicalActivityFormInputs = Yup.InferType<typeof yupSchema>;
