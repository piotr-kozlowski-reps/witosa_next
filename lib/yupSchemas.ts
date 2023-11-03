import { ActivityType, Day, EventType, ForWhom, Place } from '@prisma/client';
import * as Yup from 'yup';

//
/** error texts */
const imageDescriptionRequired = 'Opis obrazka musi być podany.';
const fieldIsRequired = 'Pole jest wymagane.';
const imageIsRequired = 'Plik graficzny jest wymagany.';

//
/** name */
export const nameSchemaYup_Required_Min2 = Yup.string()
  .required(fieldIsRequired)
  .min(2, 'Min. 2 znaki.');

//
/** string required */
export const stringRequiredYupSchema = Yup.string().required(fieldIsRequired);

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
export const isBooleanYupSchema = Yup.boolean().required(
  'Pole musi mieć określoną wartość.'
);

//
/** date or null */
export const isDateYupSchema = Yup.date()
  .typeError('Data ma zły format.')
  .required('Data musi być określona.');
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
export const isDateOrNullYupSchemaForOccurrenceHours_AndThenRequired =
  isDateOrNullYupSchema.test(
    'date is required',
    'Godzina musi być określona.',
    (value) => {
      const validation = isDateYupSchema.isValidSync(value);

      if (!validation) {
        return false;
      }

      return true;
    }
  );

//
/** cyclicalActivityExpiresAt */
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
/** event visibleFrom / visibleTo */
export const eventVisibleFromAndVisibleToYupSchema = Yup.mixed()
  .test(
    'can be whatever when isToBePublished is false',
    'Data musi być określona.',
    (value, context) => {
      const isVisibleFromRequired = context.parent.isToBePublished;

      if (isVisibleFromRequired) {
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
    fieldIsRequired,
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
    fieldIsRequired,
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
  NO_FILE: imageIsRequired,
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
const imageOrStringFieldYupSchema = Yup.lazy((val) => {
  if (typeof val === 'string') {
    return Yup.string().required(fieldIsRequired);
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
      .test('fileType', fileErrorMessages.ERROR_FILE_TYPE, (value, context) => {
        const isCustomLinkToDetails =
          context.options.context?.isCustomLinkToDetails;

        if (isCustomLinkToDetails) {
          return true;
        }

        if (!value) {
          return true;
        }
        return getIsFileTypesValid(value as File, fileTypes);
      })
      .test('file size', fileErrorMessages.FILE_TO_LARGE, (value, context) => {
        const isCustomLinkToDetails =
          context.options.context?.isCustomLinkToDetails;

        if (isCustomLinkToDetails) {
          return true;
        }

        if (!value) {
          return true;
        }

        return getIsFileSizeValid(value as File, maxFileSize);
      });
  }
});
export const imagesArrayYupSchema = Yup.array(
  Yup.object().shape({
    //file
    file: imageOrStringFieldYupSchema,

    //alt
    alt: Yup.string().test(
      'needed only when isCustomLinkToDetails is false',
      imageDescriptionRequired,
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
    activityStart: isDateOrNullYupSchemaForOccurrenceHours_AndThenRequired,
    activityEnd: isDateOrNullYupSchemaForOccurrenceHours_AndThenRequired,
  })
);

//
/** event isToBeOnlyInNewsSection_NotSeenInEvents */
export const eventIsToBeOnlyInNewsSection_NotSeenInEvents__And__IsDateToBeHiddenInNewsSection_YupSchema =
  Yup.mixed()
    .test(
      'has to be a boolean only when isToBeInNewsSection is true',
      'Wartość tego pola musi być określona.',
      (value, context) => {
        const isToBeInNewsSection = context.parent.isToBeInNewsSection;

        if (isToBeInNewsSection) {
          const validation = isBooleanYupSchema.isValidSync(value);
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
/** newsSectionImageUrl */
const imageOrStringFieldGeneralYupSchema = Yup.lazy((val) => {
  if (typeof val === 'string') {
    return Yup.string().required(fieldIsRequired);
  } else {
    return imageYupSchema
      .test('is there any file', fileErrorMessages.NO_FILE, (value) => {
        if (!value) {
          return false;
        }
        return true;
      })
      .test('fileType', fileErrorMessages.ERROR_FILE_TYPE, (value, context) => {
        return getIsFileTypesValid(value as File, fileTypes);
      })
      .test('file size', fileErrorMessages.FILE_TO_LARGE, (value, context) => {
        return getIsFileSizeValid(value as File, maxFileSize);
      });
  }
});
export const newsSectionImageUrlYupSchema = Yup.mixed()
  .test(
    'has to be a string or image only when isToBeInNewsSection is true',
    imageIsRequired,
    (value, context) => {
      const isToBeInNewsSection = context.parent.isToBeInNewsSection;

      if (isToBeInNewsSection) {
        const validation =
          imageOrStringFieldGeneralYupSchema.isValidSync(value);
        if (validation) {
          return true;
        }
        return false;
      }
      return true;
    }
  )
  .nullable();

export const imagesArrayEventsYupSchema = Yup.array(
  Yup.object().shape({
    file: Yup.mixed().test(
      'has to be a string or image and is required only when isCustomLinkToDetails equals false and isToBeOnlyInNewsSection_NotSeenInEvents is also false',
      imageIsRequired,
      (value, context) => {
        const isCustomLinkToDetails =
          context.options.context?.isCustomLinkToDetails;
        const isToBeOnlyInNewsSection_NotSeenInEvents =
          context.options.context?.isToBeOnlyInNewsSection_NotSeenInEvents;

        if (isToBeOnlyInNewsSection_NotSeenInEvents) {
          return true;
        }

        if (isCustomLinkToDetails) {
          return true;
        }

        const validation =
          imageOrStringFieldGeneralYupSchema.isValidSync(value);

        if (!validation) {
          return false;
        }

        return true;
      }
    ),

    //alt
    alt: Yup.string().test(
      'needed only when !isCustomLinkToDetails and !isToBeOnlyInNewsSection_NotSeenInEvents',
      imageDescriptionRequired,
      (value, context) => {
        const isCustomLinkToDetails =
          context.options.context?.isCustomLinkToDetails;
        const isToBeOnlyInNewsSection_NotSeenInEvents =
          context.options.context?.isToBeOnlyInNewsSection_NotSeenInEvents;

        if (isToBeOnlyInNewsSection_NotSeenInEvents) {
          return true;
        }

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

export const altFieldNameYupSchema = Yup.mixed()
  .test(
    'has to be a string only when isToBeInNewsSection is true',
    imageDescriptionRequired,
    (value, context) => {
      const isToBeInNewsSection = context.parent.isToBeInNewsSection;

      if (isToBeInNewsSection) {
        const validation = stringRequiredYupSchema.isValidSync(value);
        if (validation) {
          return true;
        }
        return false;
      }
      return true;
    }
  )
  .nullable();

export const customLinkToDetailsEventYupSchema = Yup.mixed()
  .test(
    'has to be a string only when isCustomLinkToDetails is true and isToBeOnlyInNewsSection_NotSeenInEvents is  false',
    imageDescriptionRequired,
    (value, context) => {
      const isCustomLinkToDetails = context.parent.isCustomLinkToDetails;
      const isToBeOnlyInNewsSection_NotSeenInEvents =
        context.parent.isToBeOnlyInNewsSection_NotSeenInEvents;

      if (isCustomLinkToDetails && !isToBeOnlyInNewsSection_NotSeenInEvents) {
        const validation = stringRequiredYupSchema.isValidSync(value);
        if (validation) {
          return true;
        }
        return false;
      }
      return true;
    }
  )
  .nullable();

export const detailedDescriptionYupSchema = Yup.mixed()
  .nullable()
  .test(
    'detailedDescription has to be string and is required when isCustomLinkToDetails equals false and isToBeOnlyInNewsSection_NotSeenInEvents is false',
    fieldIsRequired,
    (value, context) => {
      const isCustomLinkToDetails = context.parent.isCustomLinkToDetails;
      const isToBeOnlyInNewsSection_NotSeenInEvents =
        context.parent.isToBeOnlyInNewsSection_NotSeenInEvents;

      if (!isCustomLinkToDetails && !isToBeOnlyInNewsSection_NotSeenInEvents) {
        const validation = stringRequiredYupSchema.isValidSync(value);

        if (!validation) {
          return false;
        }
      }

      return true;
    }
  );

export const sliderImageUrlYupSchema = Yup.mixed()
  .test(
    'has to be a string or image only when: !isToBeOnlyInNewsSection_NotSeenInEvents and isToBeInSlider',
    imageIsRequired,
    (value, context) => {
      const isToBeOnlyInNewsSection_NotSeenInEvents =
        context.parent.isToBeOnlyInNewsSection_NotSeenInEvents;
      const isToBeInSlider = context.parent.isToBeInSlider;

      const isToBeProcessed =
        !isToBeOnlyInNewsSection_NotSeenInEvents && isToBeInSlider;

      if (isToBeProcessed) {
        const validation =
          imageOrStringFieldGeneralYupSchema.isValidSync(value);
        if (validation) {
          return true;
        }
        return false;
      }
      return true;
    }
  )
  .nullable();

export const sliderImageAltYupSchema = Yup.mixed()
  .test(
    'has to be a string only when isToBeInNewsSection is true',
    imageDescriptionRequired,
    (value, context) => {
      const isToBeOnlyInNewsSection_NotSeenInEvents =
        context.parent.isToBeOnlyInNewsSection_NotSeenInEvents;
      const isToBeInSlider = context.parent.isToBeInSlider;

      const isToBeProcessed =
        !isToBeOnlyInNewsSection_NotSeenInEvents && isToBeInSlider;

      if (isToBeProcessed) {
        const validation = stringRequiredYupSchema.isValidSync(value);
        if (validation) {
          return true;
        }
        return false;
      }
      return true;
    }
  )
  .nullable();

export const visibleInSliderFromAndToYupSchema = Yup.mixed()
  .test(
    'has to be a string only when isToBeInNewsSection is true',
    imageDescriptionRequired,
    (value, context) => {
      const isToBeOnlyInNewsSection_NotSeenInEvents =
        context.parent.isToBeOnlyInNewsSection_NotSeenInEvents;
      const isToBeInSlider = context.parent.isToBeInSlider;

      const isToBeProcessed =
        !isToBeOnlyInNewsSection_NotSeenInEvents && isToBeInSlider;

      if (isToBeProcessed) {
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

export const kindOfEnterInfoYupSchema = Yup.mixed()
  .test(
    'has to be a string only when !isToBeOnlyInNewsSection_NotSeenInEvents',
    imageDescriptionRequired,
    (value, context) => {
      const isToBeOnlyInNewsSection_NotSeenInEvents =
        context.parent.isToBeOnlyInNewsSection_NotSeenInEvents;

      if (!isToBeOnlyInNewsSection_NotSeenInEvents) {
        const validation = stringRequiredYupSchema.isValidSync(value);
        if (validation) {
          return true;
        }
        return false;
      }
      return true;
    }
  )
  .nullable();

export const isPayedYupSchema = Yup.mixed()
  .test(
    'has to be a string only when !isToBeOnlyInNewsSection_NotSeenInEvents',
    imageDescriptionRequired,
    (value, context) => {
      const isToBeOnlyInNewsSection_NotSeenInEvents =
        context.parent.isToBeOnlyInNewsSection_NotSeenInEvents;

      if (!isToBeOnlyInNewsSection_NotSeenInEvents) {
        const validation = isBooleanYupSchema.isValidSync(value);
        if (validation) {
          return true;
        }
        return false;
      }
      return true;
    }
  )
  .nullable();

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
