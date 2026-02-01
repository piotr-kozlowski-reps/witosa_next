import * as Yup from 'yup';
import {
  activityTypeArrayYupSchema,
  customLinkToDetailsYupSchema,
  cyclicalActivityExpiresAtYupSchema,
  detailedDescriptionYupSchema,
  forWhomArrayYupSchema,
  imagesArrayYupSchema,
  isBooleanYupSchema,
  longDescriptionYupSchema,
  nameSchemaYup_Required_Min2,
  occurrenceYupSchema,
  placesYupSchema,
} from '../yupSchemas';

export const artisticGroupValidationSchemaStageOneWithYup = {
  id: nameSchemaYup_Required_Min2,
  title: nameSchemaYup_Required_Min2,
  isToBePublished: isBooleanYupSchema,
  detailedDescription: nameSchemaYup_Required_Min2,
  images: imagesArrayYupSchema,

  // activityTypes: activityTypeArrayYupSchema,
  // activitiesForWhom: forWhomArrayYupSchema,
  // places: placesYupSchema,
  // isExpiresAtRequired: isBooleanYupSchema,
  // expiresAt: cyclicalActivityExpiresAtYupSchema,
};

export function validateValuesForCyclicalActivitiesStageOne(values: Object) {
  return Yup.object({
    ...artisticGroupValidationSchemaStageOneWithYup,
  }).isValidSync(values, { context: values });
}

const yupSchema = Yup.object({
  ...artisticGroupValidationSchemaStageOneWithYup,
  // ...cyclicalActivityValidationSchemaStageTwoWithYup,
  // ...cyclicalActivityValidationSchemaStageThreeWithYup,
});

export function generateValidationForArtisticGroups() {
  return yupSchema;
}
