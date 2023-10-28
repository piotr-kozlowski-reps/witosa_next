import ImagesUploadFormik from '@/app/(site)/components/forms/ImagesUploadFormik';
import InputFormik from '@/app/(site)/components/forms/InputFormik';
import RichTextEditorFormik from '@/app/(site)/components/forms/RichTextEditorFormik';
import SelectFormik from '@/app/(site)/components/forms/SelectFormik';
import TextareaFormik from '@/app/(site)/components/forms/TextareaFormik';
import ComponentTransitionFromRightToLeft from '@/app/(site)/components/motionWrappers/ComponentTransitionFromRightToLeft';
import { defineCurrentIndex } from '@/lib/forms/cyclical-activities-form';
import { serveOptionsForCustomLinkToDetailsInEvents } from '@/lib/forms/events-form';
import { FormikProps } from 'formik';
import { AnimatePresence } from 'framer-motion';
import { Fragment } from 'react';
import CustomLinkToDetailsComment from '../form_comments/CustomLinkToDetailsComment';
import IsCustomLinkToDetailsComment from '../form_comments/IsCustomLinkToDetailsComment';

type Props<T> = {
  isCurrentFormToPUTData: string;
  formik: FormikProps<T>;
};

const optionsForCustomLinkToDetails =
  serveOptionsForCustomLinkToDetailsInEvents();

export default function EventAddFormStageThree<T>(props: Props<T>) {
  ////vars
  const { isCurrentFormToPUTData, formik } = props;
  /** when isToBeOnlyInNewsSection_NotSeenInEvents is true, only shortDescription should be available  */
  const isDetailsToBeAdded = !formik.getFieldProps(
    'isToBeOnlyInNewsSection_NotSeenInEvents'
  ).value;
  const isCustomLinkToDetails = formik.getFieldProps(
    'isCustomLinkToDetails'
  ).value;

  return (
    <Fragment>
      <div className="-mt-[9px] mr-8">
        <TextareaFormik<T>
          name="shortDescription"
          label={isCurrentFormToPUTData ? 'zmień krótki opis:' : 'krótki opis:'}
          placeholder="dodaj krótki opis..."
          formik={formik}
        />
      </div>

      {!isDetailsToBeAdded ? (
        <div className="font-base-regular mt-[27px]">
          Nie ma możliwości dodania większej ilości informacji.
          <br /> W sekcji &quot;aktualności&quot; została wybrana opcja,
          mówiąca, iż wydarzenie ma się pojawić TYLKO w dziale aktualności.
        </div>
      ) : null}

      {isDetailsToBeAdded ? (
        <Fragment>
          <div className="mt-[28px] form-input-width">
            <SelectFormik<boolean, T>
              name="isCustomLinkToDetails"
              label="wybierz, jak przekażesz szczegółowe informacje o wydarzeniu:"
              options={optionsForCustomLinkToDetails}
              formik={formik}
              isCommentPopupVisible={true}
              indexForChosenOptionWhenInitializing={defineCurrentIndex(
                formik,
                optionsForCustomLinkToDetails
              )}
              commentContent={<IsCustomLinkToDetailsComment />}
            />
          </div>

          <AnimatePresence mode="wait">
            {isCustomLinkToDetails ? (
              <ComponentTransitionFromRightToLeft>
                <div className=" mt-[20px] form-input-width">
                  <InputFormik<T>
                    name="customLinkToDetails"
                    type="text"
                    label={
                      isCurrentFormToPUTData
                        ? 'zmień adres www do strony z detalami:'
                        : 'adres www do strony z detalami:'
                    }
                    placeholder="adres www do strony z detalami"
                    formik={formik}
                    isCommentPopupVisible={true}
                    commentContent={<CustomLinkToDetailsComment />}
                  />
                </div>
              </ComponentTransitionFromRightToLeft>
            ) : null}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {!isCustomLinkToDetails ? (
              <ComponentTransitionFromRightToLeft>
                <Fragment>
                  <div className="mt-[24px]">
                    <RichTextEditorFormik<T>
                      name="detailedDescription"
                      label="szczegółowy opis:"
                      formik={formik}
                    />
                  </div>
                  <div className="mt-[24px]">
                    <ImagesUploadFormik<T>
                      formik={formik}
                      name="images"
                      label="obrazki:"
                      isCurrentFormToPUTData={isCurrentFormToPUTData}
                    />
                  </div>
                </Fragment>
              </ComponentTransitionFromRightToLeft>
            ) : null}
          </AnimatePresence>
        </Fragment>
      ) : null}

      {/* <AnimatePresence mode="wait">
        {isToBeInNewsSection ? (
          <ComponentTransitionFromRightToLeft>
            <Fragment>
              <div className="mt-[5px]">
                <CheckboxFormik<T>
                  name="isToBeOnlyInNewsSection_NotSeenInEvents"
                  label="Czy wydarzenie ma się pojawić TYLKO w aktualnościach (w żadnym innym dziale)?"
                  isToBeUsedAsPartFormik={true}
                  formik={formik}
                  isCommentPopupVisible={true}
                  commentContent={<IsToBeOnlyInNewsSectionComment />}
                />
              </div>
              <div>
                <CheckboxFormik<T>
                  name="isDateToBeHiddenInNewsSection"
                  label="Czy data wydarzenia ma być niewidoczna w aktualnościach?"
                  isToBeUsedAsPartFormik={true}
                  formik={formik}
                  isCommentPopupVisible={true}
                  commentContent={<IsDateToBeHiddenInNewsSectionComment />}
                />
              </div>
              <div className="mt-[22px]">
                <ImageUploadFormik<T>
                  imageFieldName="newsSectionImageUrl"
                  altFieldName="newsSectionImageAlt"
                  label="obraz dla aktualności:"
                  isCurrentFormToPUTData={isCurrentFormToPUTData}
                  formik={formik}
                  isCommentPopupVisible={true}
                  commentContent={<NewsSectionImageUrlComment />}
                />
              </div>
            </Fragment>
          </ComponentTransitionFromRightToLeft>
        ) : null}
      </AnimatePresence> */}
    </Fragment>
  );
}
