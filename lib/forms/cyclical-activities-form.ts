import { TCyclicalActivityFormInputs, TFormStage } from '@/types';
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

/**
 * initial stages
 * */
export function getInitialFormStagesForCyclicalActivitiesObject(
  values: TCyclicalActivityFormInputs
): TFormStage[] {
  return [
    {
      isAccessToStage: true,
      linkName: 'informacje ogólne',
      isActive: true,
      callbackValidatingStage: validateValuesForCyclicalActivitiesStageOne,
    },
    {
      isAccessToStage: false,
      linkName: 'opis zajęć oraz zdjęcia',
      isActive: false,
      callbackValidatingStage: validateValuesForCyclicalActivitiesStageTwo,
    },
    {
      isAccessToStage: false,
      linkName: 'godziny zajęć',
      isActive: false,
    },
  ];
}

/**
 * stages validation
 * */

//stage1
export const cyclicalActivityValidationSchemaStageOneWithYup = {
  id: nameSchemaYup_Required_Min2,
  name: nameSchemaYup_Required_Min2,
  activityTypes: activityTypeArrayYupSchema,
  activitiesForWhom: forWhomArrayYupSchema,
  places: placesYupSchema,
  isToBePublished: isBooleanYupSchema,
  isExpiresAtRequired: isBooleanYupSchema,
  expiresAt: cyclicalActivityExpiresAtYupSchema,
};
export function validateValuesForCyclicalActivitiesStageOne(values: Object) {
  return Yup.object({
    ...cyclicalActivityValidationSchemaStageOneWithYup,
  }).isValidSync(values, { context: values });
}

//stage2
export const cyclicalActivityValidationSchemaStageTwoWithYup = {
  shortDescription: nameSchemaYup_Required_Min2,
  isCustomLinkToDetails: isBooleanYupSchema,
  customLinkToDetails: customLinkToDetailsYupSchema,
  longDescription: longDescriptionYupSchema,
  images: imagesArrayYupSchema,
};
export function validateValuesForCyclicalActivitiesStageTwo(values: Object) {
  return Yup.object({
    ...cyclicalActivityValidationSchemaStageTwoWithYup,
  }).isValidSync(values, { context: values });
}

//stage3
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

export function validateValuesForCyclicalActivities(values: Object) {
  return yupSchema.isValidSync(values, { context: values });
}

// export type TCyclicalActivityFormInputs = Yup.InferType<typeof yupSchema>;
