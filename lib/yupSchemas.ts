import { ActivityType, Day, EventType, ForWhom, Place } from '@prisma/client';
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
/** event type */
export const eventTypeArrayYupSchema = Yup.array()
  .test(
    "array can't be empty",
    'Chociaż jeden typ wydarzenia musi być wybrany.',
    (value) => {
      return value!.length === 0 ? false : true;
    }
  )
  .test(
    'array has to incude only EventTypes',
    'Wybrany rodzaj wydarzenia jest niepoprawny.',
    (value) => {
      let isValid = true;
      value!.forEach((el) => {
        if (Object.values(EventType).includes(el) === false) {
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
export const isDateYupSchema = Yup.date().required('Data musi być określona.');
export const isDateOrNullYupSchema = Yup.date()
  .typeError('Data ma zły format.')
  .nullable();
export const isDateOrNullYupSchema_AndThenRequired = isDateOrNullYupSchema.test(
  'date is required',
  'Data musi być określona.',
  (value) => {
    const validation = isDateYupSchema.isValidSync(value);

    if (!validation) {
      return false;
    }

    return true;
  }
);

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
  .nullable()
  .test(
    'customLinkToDetails has to be string when isCustomLinkToDetails equals true',
    'Pole jest wymagane.',
    (value, context) => {
      const isCustomLinkToDetails =
        context.options.context?.isCustomLinkToDetails;

      if (!isCustomLinkToDetails) {
        return true;
      }

      if (isCustomLinkToDetails) {
        const validation = stringRequiredYupSchema.isValidSync(value);
        if (!validation) {
          return false;
        }
      }
      return true;
    }
  );

//
/** longDescription*/
export const longDescriptionYupSchema = Yup.mixed()
  .nullable()
  .test(
    'longDescription has to be string and is required when isCustomLinkToDetails equals false',
    'Pole jest wymagane.',
    (value, context) => {
      const isCustomLinkToDetails =
        context.options.context?.isCustomLinkToDetails;

      if (isCustomLinkToDetails) {
        return true;
      }

      if (!isCustomLinkToDetails) {
        const validation = stringRequiredYupSchema.isValidSync(value);
        // console.log({ validation });

        if (!validation) {
          return false;
        }
      }

      return true;
    }
  );

//
/** images */
const fileErrorMessages = {
  FILE_TO_LARGE: 'Plik graficzny jest za duży - maksymalna wielkość to 4mb.',
  ONLY_ONE_FILE: 'Zbyt dużo plików, przyjmowany jest tylko jeden plik.',
  ERROR_FILE_TYPE: 'Zły format pliku.',
  NO_FILE: 'Brakuje pliku graficznego.',
};
const maxFileSize = 2048 * 1000;
const fileTypes = [
  'image/png',
  'image/jpg',
  'image/jpeg',
  'image/gif',
  'image/webp',
  'image/bmp',
  'image/tiff',
];
const imageYupSchema = Yup.mixed().nullable();
// email: yup.lazy((val) =>
//   Array.isArray(val) ? yup.array().of(yup.string()) : yup.string()
// );
// if (typeof userName === 'string') {
export const imagesArrayYupSchema = Yup.array(
  Yup.object().shape({
    //file
    file: Yup.lazy((val) => {
      if (typeof val === 'string') {
        return Yup.string().required('Pole jest wymagane.');
      } else {
        return imageYupSchema
          .test(
            'is there any file',
            fileErrorMessages.NO_FILE,
            (value, context) => {
              const isCustomLinkToDetails =
                context.options.context?.isCustomLinkToDetails;

              if (isCustomLinkToDetails) {
                return true;
              }

              if (!value) {
                return false;
              }
              return true;
            }
          )
          .test(
            'fileType',
            fileErrorMessages.ERROR_FILE_TYPE,
            (value, context) => {
              const isCustomLinkToDetails =
                context.options.context?.isCustomLinkToDetails;

              if (isCustomLinkToDetails) {
                return true;
              }

              if (!value) {
                return true;
              }
              return getIsFileTypesValid(value as File, fileTypes);
            }
          )
          .test(
            'file size',
            fileErrorMessages.FILE_TO_LARGE,
            (value, context) => {
              const isCustomLinkToDetails =
                context.options.context?.isCustomLinkToDetails;

              if (isCustomLinkToDetails) {
                return true;
              }

              if (!value) {
                return true;
              }

              return getIsFileSizeValid(value as File, maxFileSize);
            }
          );
      }
    }),

    //alt
    alt: Yup.string().test(
      'needed only when isCustomLinkToDetails is false',
      'Opis obrazka musi być podany.',
      (value, context) => {
        const isCustomLinkToDetails =
          context.options.context?.isCustomLinkToDetails;

        if (isCustomLinkToDetails) {
          return true;
        }

        const validation = stringRequiredYupSchema.isValidSync(value);
        if (!validation) {
          return false;
        }

        return true;
      }
    ),

    // additionInfo
    additionInfoThatMustBeDisplayed: Yup.string().nullable(),

    //index
    index: Yup.number()
      .typeError('Index musi być numerem.')
      .min(0)
      .required('Index jest wymagany.'),

    //id
    id: Yup.string(),
  })
);

//////////////////////
//     imageSourceFull: Yup.mixed().test(
//   "image type or string",
//   "Entering image is required. Image can only be in format -> .jpg/.jpeg/.png/.gif",
//   (value) => {
//     if (!value) return;
//     if (
//       Object.prototype.toString.call(value) === "[object String]"
//     ) {
//       const isNotEmpty = value.trim().length > 0 ? true : false;
//       return isNotEmpty;
//     }
//     return (
//       value.type === "image/jpeg" ||
//       value.type === "image/png" ||
//       value.type === "image/jpg" ||
//       value.type === "image/gif"
//     );
//   }
// ),
//////////////////////

/** day type */
export const dayYupSchema = Yup.mixed()
  .test(
    'only one value of Day',
    'Wybrany dzień tygodnia jest niepoprawny.',
    (value) => {
      if (Object.values(Day).includes(value as Day)) {
        return true;
      }
      return false;
    }
  )
  .required();

export const occurrenceYupSchema = Yup.array(
  Yup.object().shape({
    day: dayYupSchema,
    activityStart: isDateOrNullYupSchema_AndThenRequired,
    activityEnd: isDateOrNullYupSchema_AndThenRequired,
  })
);

////utils
export function getIsFileSizeValid(file: File, maxFileSize: number) {
  if (!file) return true;
  return file.size < maxFileSize;
}
export function getIsFileTypesValid(file: File, fileTypes: string[]) {
  if (!file) return true;
  if (!fileTypes.includes(file.type)) {
    return false;
  }
  return true;
}
