import { TEventFormInputs, TFormStage, TOptionsForFormikSelect } from '@/types';
import * as Yup from 'yup';
import {
  altFieldNameYupSchema,
  customLinkToDetailsEventYupSchema,
  detailedDescriptionYupSchema,
  eventIsToBeOnlyInNewsSection_NotSeenInEvents__And__IsDateToBeHiddenInNewsSection_YupSchema,
  eventTypeArrayYupSchema,
  eventVisibleFromAndVisibleToYupSchema,
  forWhomArrayYupSchema,
  imagesArrayEventsYupSchema,
  isBooleanYupSchema,
  isDateOrNullYupSchema_AndThenRequired,
  nameSchemaYup_Required_Min2,
  newsSectionImageUrlYupSchema,
  placesYupSchema,
} from '../yupSchemas';
import { serveOptionsForCustomLinkToDetails } from './cyclical-activities-form';

export function serveOptionsForCustomLinkToDetailsInEvents(): TOptionsForFormikSelect<boolean>[] {
  return serveOptionsForCustomLinkToDetails();
}

/**
 * initial stages
 * */
export function getInitialFormStagesForEventsObject(
  values: TEventFormInputs
): TFormStage[] {
  return [
    {
      isAccessToStage: true,
      linkName: 'informacje ogólne',
      isActive: true,
      callbackValidatingStage: validateValuesForEventsStageOne,
    },
    {
      isAccessToStage: false,
      linkName: 'aktualności',
      isActive: false,
      callbackValidatingStage: validateValuesForEventsStageTwo,
    },
    {
      isAccessToStage: false,
      linkName: 'szczegóły / zdjęcia',
      isActive: false,
      callbackValidatingStage: validateValuesForEventsStageThree,
    },
    {
      isAccessToStage: false,
      linkName: 'slider',
      isActive: false,
      callbackValidatingStage: validateValuesForEventsStageFour,
    },
    {
      isAccessToStage: false,
      linkName: 'płatności',
      isActive: false,
    },
  ];
}

/**
 * stages validation
 * */

//stage1
export const eventsValidationSchemaStageOneWithYup = {
  id: nameSchemaYup_Required_Min2,
  title: nameSchemaYup_Required_Min2,
  eventTypes: eventTypeArrayYupSchema,
  eventForWhom: forWhomArrayYupSchema,
  places: placesYupSchema,
  eventStartDate: isDateOrNullYupSchema_AndThenRequired,
  isToBePublished: isBooleanYupSchema,
  visibleFrom: eventVisibleFromAndVisibleToYupSchema,
  visibleTo: eventVisibleFromAndVisibleToYupSchema,
};
export function validateValuesForEventsStageOne(values: Object) {
  return Yup.object({
    ...eventsValidationSchemaStageOneWithYup,
  }).isValidSync(values, { context: values });
}

//stage2
export const eventsValidationSchemaStageTwoWithYup = {
  isToBeInNewsSection: isBooleanYupSchema,
  isToBeOnlyInNewsSection_NotSeenInEvents:
    eventIsToBeOnlyInNewsSection_NotSeenInEvents__And__IsDateToBeHiddenInNewsSection_YupSchema,
  isDateToBeHiddenInNewsSection:
    eventIsToBeOnlyInNewsSection_NotSeenInEvents__And__IsDateToBeHiddenInNewsSection_YupSchema,
  newsSectionImageUrl: newsSectionImageUrlYupSchema,
  newsSectionImageAlt: altFieldNameYupSchema,
};
export function validateValuesForEventsStageTwo(values: Object) {
  return Yup.object({
    ...eventsValidationSchemaStageTwoWithYup,
  }).isValidSync(values, { context: values });
}

//stage3
export const eventsValidationSchemaStageThreeWithYup = {
  isCustomLinkToDetails: isBooleanYupSchema,
  shortDescription: nameSchemaYup_Required_Min2,
  customLinkToDetails: customLinkToDetailsEventYupSchema,
  detailedDescription: detailedDescriptionYupSchema,
  images: imagesArrayEventsYupSchema,
};
export function validateValuesForEventsStageThree(values: Object) {
  return Yup.object({
    ...eventsValidationSchemaStageThreeWithYup,
  }).isValidSync(values, { context: values });
}

//stage4
export const eventsValidationSchemaStageFourWithYup = {
  IsPayed: nameSchemaYup_Required_Min2, //TODO: wywal - to tylko tymczasowe
};
export function validateValuesForEventsStageFour(values: Object) {
  return Yup.object({
    ...eventsValidationSchemaStageFourWithYup,
  }).isValidSync(values, { context: values });
}

//stage5
export const eventsValidationSchemaStageFiveWithYup = {
  // id: nameSchemaYup_Required_Min2,
};

const yupSchema = Yup.object({
  ...eventsValidationSchemaStageOneWithYup,
  ...eventsValidationSchemaStageTwoWithYup,
  ...eventsValidationSchemaStageThreeWithYup,
  ...eventsValidationSchemaStageFourWithYup,
  ...eventsValidationSchemaStageFiveWithYup,
});

export function generateValidationForEvents() {
  return yupSchema;
}
