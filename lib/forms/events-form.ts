import { TEventFormInputs, TFormStage } from '@/types';
import * as Yup from 'yup';
import {
  eventTypeArrayYupSchema,
  forWhomArrayYupSchema,
  nameSchemaYup_Required_Min2,
  placesYupSchema,
} from '../yupSchemas';

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
};
export function validateValuesForEventsStageOne(values: Object) {
  return Yup.object({
    ...eventsValidationSchemaStageOneWithYup,
  }).isValidSync(values, { context: values });
}

//stage2
export const eventsValidationSchemaStageTwoWithYup = {
  IsPayed: nameSchemaYup_Required_Min2, //TODO: wywal - to tylko tymczasowe
};
export function validateValuesForEventsStageTwo(values: Object) {
  return Yup.object({
    ...eventsValidationSchemaStageTwoWithYup,
  }).isValidSync(values, { context: values });
}

//stage3
export const eventsValidationSchemaStageThreeWithYup = {
  IsPayed: nameSchemaYup_Required_Min2, //TODO: wywal - to tylko tymczasowe
};
export function validateValuesForEventsStageThree(values: Object) {
  return Yup.object({
    ...eventsValidationSchemaStageTwoWithYup,
  }).isValidSync(values, { context: values });
}

//stage4
export const eventsValidationSchemaStageFourWithYup = {
  IsPayed: nameSchemaYup_Required_Min2, //TODO: wywal - to tylko tymczasowe
};
export function validateValuesForEventsStageFour(values: Object) {
  return Yup.object({
    ...eventsValidationSchemaStageTwoWithYup,
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
