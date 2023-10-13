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
