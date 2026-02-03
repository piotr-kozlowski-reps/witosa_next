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
import {
  TArtisticGroupFormInputs,
  TImageArtisticGroupFormValues,
} from '@/types';
import { remapImagesIntoBackendPreparedData } from './form-helpers';

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

export const prepareArtisticGroupValuesForBackend = async (
  formikValues: TArtisticGroupFormInputs
): Promise<TArtisticGroupFormInputs> => {
  const values = { ...formikValues };
  const originalImages = values.images as TImageArtisticGroupFormValues[];
  let imagesRemapped: TImageArtisticGroupFormValues[] = [];

  try {
    imagesRemapped = remapImagesIntoBackendPreparedData(originalImages);
  } catch (error) {
    throw new Error(
      'Nastąpił błąd podczas procesowania obrazków, jakiegoś obrazka może brakować, lub jest uszkodzony.'
    );
  }

  //   // imagesRemapped = originalImages.map((image) => ({
  //   //   alt: image.alt,
  //   //   url: image.url,
  //   //   index: image.index,
  //   //   additionInfoThatMustBeDisplayed: image.additionInfoThatMustBeDisplayed,
  //   //   file: typeof image.file! === 'string' ? image.file! : image.file!.preview,
  //   //   id: image.id as string,
  //   // }));
  // }
  values.images = imagesRemapped;
  return values;
};
