import {
  TEventFormInputs,
  TFormStage,
  TImageEventFormValue,
  TOptionsForFormikSelect,
} from '@/types';
import { FormikProps } from 'formik';
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
  isDateYupSchema,
  isPayedYupSchema,
  kindOfEnterInfoYupSchema,
  nameSchemaYup_Required_Min2,
  newsSectionImageUrlYupSchema,
  placesYupSchema,
  sliderImageAltYupSchema,
  sliderImageUrlYupSchema,
  ticketBuyingIdYupSchema,
  visibleInSliderFromAndToYupSchema,
} from '../yupSchemas';
import { serveOptionsForCustomLinkToDetails } from './cyclical-activities-form';
import {
  prepareImageForBackend,
  remapImagesIntoBackendPreparedData,
} from './form-helpers';

export function serveOptionsForCustomLinkToDetailsInEvents(): TOptionsForFormikSelect<boolean>[] {
  return serveOptionsForCustomLinkToDetails();
}

export const prepareEventValuesForBackend = (
  formikValues: TEventFormInputs
) => {
  const values = { ...formikValues };

  // news image
  const isToBeInNewsSection = values.isToBeInNewsSection;
  const originalNewsImage = values.newsSectionImageUrl;
  let newsImagePreparedForBackend: string = '';
  if (isToBeInNewsSection) {
    try {
      newsImagePreparedForBackend = prepareImageForBackend(originalNewsImage);
    } catch (error) {
      throw new Error(
        'Brak obrazka (lub niepoprawny plik) w dziale aktualności.'
      );
    }
  }
  values.newsSectionImageUrl = newsImagePreparedForBackend;

  let isIncludeImages = true;
  values.isCustomLinkToDetails ? (isIncludeImages = false) : null;
  values.isToBeOnlyInNewsSection_NotSeenInEvents
    ? (isIncludeImages = false)
    : null;

  const originalImages = values.images as TImageEventFormValue[];
  let imagesRemapped: TImageEventFormValue[] = [];

  if (isIncludeImages) {
    try {
      imagesRemapped = remapImagesIntoBackendPreparedData(originalImages);
    } catch (error) {
      console.error((error as Error).stack);
      throw new Error(
        'Nastąpił błąd podczas procesowania obrazków, jakiegoś obrazka może brakować, lub jest uszkodzony.'
      );
    }
  }
  values.images = imagesRemapped;

  //slider
  const isToBeInSlider =
    values.isToBeInSlider && !values.isToBeOnlyInNewsSection_NotSeenInEvents;
  const originalSliderImage = values.sliderImageUrl;
  let sliderImagePreparedForBackend: string = '';
  if (isToBeInSlider) {
    try {
      sliderImagePreparedForBackend =
        prepareImageForBackend(originalSliderImage);
    } catch (error) {
      throw new Error('Brak obrazka (lub niepoprawny plik) w dziale slajder.');
    }
  }
  values.sliderImageUrl = sliderImagePreparedForBackend;

  return values;
};

/**
 * initial stages
 * */
export function getInitialFormStagesForEventsObject(
  _values: TEventFormInputs
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
  isToBeInSlider: isBooleanYupSchema,
  sliderImageUrl: sliderImageUrlYupSchema,
  sliderImageAlt: sliderImageAltYupSchema,
  visibleInSliderFrom: visibleInSliderFromAndToYupSchema,
  visibleInSliderTo: visibleInSliderFromAndToYupSchema,
};
export function validateValuesForEventsStageFour(values: Object) {
  return Yup.object({
    ...eventsValidationSchemaStageFourWithYup,
  }).isValidSync(values, { context: values });
}

//stage5
export const eventsValidationSchemaStageFiveWithYup = {
  kindOfEnterInfo: kindOfEnterInfoYupSchema,
  isPayed: isPayedYupSchema,
  ticketBuyingId: ticketBuyingIdYupSchema,
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

export function validateValuesForEvents(values: Object) {
  return yupSchema.isValidSync(values, { context: values });
}

/**
 * helpers
 * */
export const copyDateFromOneFormikFieldToAnother = <T>(
  formik: FormikProps<T>,
  fieldToCopyFrom: string,
  fieldToCopyTo: string
) => {
  const dateToCopyFrom = formik.getFieldMeta(fieldToCopyFrom).value;

  if (!dateToCopyFrom || !isDateYupSchema.isValidSync(dateToCopyFrom)) {
    throw new Error('Bad date');
  }
  formik.getFieldHelpers(fieldToCopyTo).setValue(dateToCopyFrom);
};
