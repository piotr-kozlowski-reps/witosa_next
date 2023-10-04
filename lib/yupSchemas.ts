import { ActivityType, ForWhom, Place } from '@prisma/client';
import * as Yup from 'yup';

//
/** name */
export const nameSchemaYup_Required_Min2 = Yup.string()
  .required('Pole jest wymagane.')
  .min(2, 'Min. 2 znaki.');

//
/** string required */
export const stringRequiredYupSchema = Yup.string().required(
  'Pole jest wymagane.'
);

//
/** activity type */
export const activityTypeArrayYupSchema = Yup.array()
  .test(
    "array can't be empty",
    'Chociaż jeden rodzaj zajęć musi być wybrany.',
    (value) => {
      return value!.length === 0 ? false : true;
    }
  )
  .test(
    'array has to incude only ',
    'Wybrany rodzaj zajęć jest niepoprawny.',
    (value) => {
      let isValid = true;
      value!.forEach((el) => {
        if (Object.values(ActivityType).includes(el) === false) {
          isValid = false;
          return;
        }
      });

      return isValid;
    }
  );

//
/** activity type */
export const forWhomArrayYupSchema = Yup.array()
  .test(
    "array can't be empty",
    'Chociaż jeden element musi być wybrany.',
    (value) => {
      return value!.length === 0 ? false : true;
    }
  )
  .test(
    'array has to incude only ',
    'Wybrany element jest niepoprawny.',
    (value) => {
      let isValid = true;
      value!.forEach((el) => {
        if (Object.values(ForWhom).includes(el) === false) {
          isValid = false;
          return;
        }
      });

      return isValid;
    }
  );

//
/** places */
export const placesYupSchema = Yup.array()
  .test(
    "array can't be empty",
    'Chociaż jeden element musi być wybrany.',
    (value) => {
      return value!.length === 0 ? false : true;
    }
  )
  .test(
    'array has to incude only ',
    'Wybrany element jest niepoprawny.',
    (value) => {
      let isValid = true;
      value!.forEach((el) => {
        if (Object.values(Place).includes(el) === false) {
          isValid = false;
          return;
        }
      });

      return isValid;
    }
  );

//
/** boolean*/
export const isBooleanYupSchema = Yup.boolean();

//
/** date or null */
export const isDateOrNullYupSchema = Yup.date().nullable();
//

/** date or null */
export const isDateYupSchema = Yup.date().required('Data musi być określona.');

//
/** cyclicalActivityExpiresAt*/
export const cyclicalActivityExpiresAtYupSchema = Yup.mixed()
  .test(
    'can be whatever when isExpiresAtRequired is false',
    'Data musi być określona.',
    (value, context) => {
      const isExpiresAtRequired = context.parent.isExpiresAtRequired;

      if (isExpiresAtRequired) {
        const validation = isDateYupSchema.isValidSync(value);
        if (validation) {
          return true;
        }
        return false;
      }
      return true;
    }
  )
  .nullable();

//
/** customLinkToDetails*/
export const customLinkToDetailsYupSchema = Yup.string()
  .test(
    'customLinkToDetails has to be string when isCustomLinkToDetails equals true',
    'Pole jest wymagane.',
    (value, context) => {
      const isCustomLinkToDetails = context.parent.isCustomLinkToDetails;

      if (isCustomLinkToDetails) {
        const validation = stringRequiredYupSchema.isValidSync(value);
        if (!validation) {
          return false;
        }
      }
      return true;
    }
  )
  .nullable();

//
/** longDescription*/
export const longDescriptionYupSchema = Yup.string()
  .test(
    'longDescription has to be string and is required when isCustomLinkToDetails equals false',
    'Pole jest wymagane.',
    (value, context) => {
      const isCustomLinkToDetails = context.parent.isCustomLinkToDetails;

      if (!isCustomLinkToDetails) {
        const validation = stringRequiredYupSchema.isValidSync(value);
        if (!validation) {
          return false;
        }
      }
      return true;
    }
  )
  .nullable();
