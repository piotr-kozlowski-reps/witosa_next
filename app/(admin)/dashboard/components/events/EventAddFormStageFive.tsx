import CustomButton from '@/app/(site)/components/CustomButton';
import CheckboxFormik from '@/app/(site)/components/forms/CheckboxFormik';
import DatePickerFormik from '@/app/(site)/components/forms/DatePickerFormik';
import ImageUploadFormik from '@/app/(site)/components/forms/ImageUploadFormik';
import ComponentTransitionFromRightToLeft from '@/app/(site)/components/motionWrappers/ComponentTransitionFromRightToLeft';
import { useNotificationState } from '@/context/notificationState';
import { dateOfVisibleFromIsNotDefined } from '@/lib/api/apiTextResponses';
import { copyDateFromOneFormikFieldToAnother } from '@/lib/forms/events-form';
import { isDateYupSchema } from '@/lib/yupSchemas';
import { FormikProps } from 'formik';
import { AnimatePresence } from 'framer-motion';
import { Fragment } from 'react';
import SliderImageUrlComment from '../form_comments/SliderImageUrlComment';
import VisibleInSliderFromComment from '../form_comments/VisibleInSliderFromComment';
import VisibleInSliderToComment from '../form_comments/VisibleInSliderToComment';
type Props<T> = {
  isCurrentFormToPUTData: string;
  formik: FormikProps<T>;
};

// const optionsForCustomLinkToDetails =
//   serveOptionsForCustomLinkToDetailsInEvents();

export default function EventAddFormStageFive<T>(props: Props<T>) {
  ////vars
  const { isCurrentFormToPUTData, formik } = props;
  const { setShowNotification } = useNotificationState();

  /** when isToBeOnlyInNewsSection_NotSeenInEvents===true nothing should be available  */
  const isDetailsToBeAdded = !formik.getFieldProps(
    'isToBeOnlyInNewsSection_NotSeenInEvents'
  ).value;
  const isToBeInSlider = formik.getFieldProps('isToBeInSlider').value;

  const isVisibleFromDateValid = isDateYupSchema.isValidSync(
    formik.getFieldMeta('visibleFrom').value
  );
  const isVisibleToDateValid = isDateYupSchema.isValidSync(
    formik.getFieldMeta('visibleTo').value
  );

  const copyVisibleFrom_To_visibleInSliderFrom__Handler = (
    formik: FormikProps<T>
  ) => {
    try {
      copyDateFromOneFormikFieldToAnother(
        formik,
        'visibleFrom',
        'visibleInSliderFrom'
      );
    } catch (error) {
      setShowNotification('ERROR', dateOfVisibleFromIsNotDefined);
      return;
    }
  };
  const copyVisibleTo_To_VisibleInSliderTo__Handler = (
    formik: FormikProps<T>
  ) => {
    try {
      copyDateFromOneFormikFieldToAnother(
        formik,
        'visibleTo',
        'visibleInSliderTo'
      );
    } catch (error) {
      setShowNotification('ERROR', dateOfVisibleFromIsNotDefined);
      return;
    }
  };

  return (
    <Fragment>
      {!isDetailsToBeAdded ? (
        <div className="font-base-regular -mt-[9px]">
          Nie ma możliwości dodania większej ilości informacji.
          <br /> W sekcji &quot;aktualności&quot; została wybrana opcja,
          mówiąca, iż wydarzenie ma się pojawić TYLKO w dziale aktualności.
        </div>
      ) : null}

      {isDetailsToBeAdded ? (
        <Fragment>
          <div className="-mt-[30px]">
            <CheckboxFormik<T>
              name="isToBeInSlider"
              label="Czy wydarzenie ma się pojawić w slajderze?"
              isToBeUsedAsPartFormik={true}
              formik={formik}
            />
          </div>

          <AnimatePresence mode="wait">
            {isToBeInSlider ? (
              <ComponentTransitionFromRightToLeft>
                <Fragment>
                  <div className="mt-[22px]">
                    <ImageUploadFormik<T>
                      imageFieldName="sliderImageUrl"
                      altFieldName="sliderImageAlt"
                      label="obraz dla slajdera:"
                      isCurrentFormToPUTData={isCurrentFormToPUTData}
                      formik={formik}
                      isCommentPopupVisible={true}
                      commentContent={<SliderImageUrlComment />}
                      imagePreviewType={'THREE_DISPLAYS_PREVIEW'}
                      isToHaveCopyFromImagesButton={true}
                    />
                  </div>

                  <div className="flex items-center justify-start">
                    <div className="mt-[28px]">
                      <DatePickerFormik<T>
                        name="visibleInSliderFrom"
                        label={
                          isCurrentFormToPUTData
                            ? 'zmień datę rozpoczęcia publikacji w slajderze:'
                            : 'data rozpoczęcia publikacji w slajderze:'
                        }
                        formik={formik}
                        isErrorValidationTurnedOn={true}
                        isCommentPopupVisible={true}
                        commentContent={<VisibleInSliderFromComment />}
                      />
                    </div>
                    <div className="mt-[46px] ml-4">
                      <CustomButton
                        text="kopiuj datę rozpoczęcia publikacji"
                        descriptionText="Kopiuj datę rozpoczęcia publikacji."
                        disabled={!isVisibleFromDateValid}
                        actionFn={() =>
                          copyVisibleFrom_To_visibleInSliderFrom__Handler(
                            formik
                          )
                        }
                        outlined={true}
                        currentlyActive={false}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-start">
                    <div className="mt-[28px]">
                      <DatePickerFormik<T>
                        name="visibleInSliderTo"
                        label={
                          isCurrentFormToPUTData
                            ? 'zmień datę zakończenia publikacji w slajderze:'
                            : 'data zakończenia publikacji w slajderze:'
                        }
                        formik={formik}
                        isErrorValidationTurnedOn={true}
                        isCommentPopupVisible={true}
                        commentContent={<VisibleInSliderToComment />}
                      />
                    </div>
                    <div className="mt-[46px] ml-4">
                      <CustomButton
                        text="kopiuj datę zakończenia publikacji"
                        descriptionText="Kopiuj datę zakończenia publikacji."
                        disabled={!isVisibleToDateValid}
                        actionFn={() =>
                          copyVisibleTo_To_VisibleInSliderTo__Handler(formik)
                        }
                        outlined={true}
                        currentlyActive={false}
                      />
                    </div>
                  </div>
                </Fragment>
              </ComponentTransitionFromRightToLeft>
            ) : null}
          </AnimatePresence>
        </Fragment>
      ) : null}
    </Fragment>
  );
}
