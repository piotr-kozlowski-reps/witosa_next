import ImagesUploadFormik from '@/app/(site)/components/forms/ImagesUploadFormik';
import InputFormik from '@/app/(site)/components/forms/InputFormik';
import RichTextEditorFormik from '@/app/(site)/components/forms/RichTextEditorFormik';
import SelectFormik from '@/app/(site)/components/forms/SelectFormik';
import TextareaFormik from '@/app/(site)/components/forms/TextareaFormik';
import ComponentTransitionFromRightToLeft from '@/app/(site)/components/motionWrappers/ComponentTransitionFromRightToLeft';
import { useIsMounted } from '@/hooks/useIsMounted';
import { FormikProps } from 'formik';
import { AnimatePresence } from 'framer-motion';
import { Fragment } from 'react';
import CustomLinkToDetailsComment from '../form_comments/CustomLinkToDetailsComment';
import IsCustomLinkToDetailsComment from '../form_comments/IsCustomLinkToDetailsComment';

type Props<T> = {
  isCurrentFormToPUTData: string;
  formik: FormikProps<T>;
};

// const optionsForUserRoles = (Object.keys(UserRole) as Array<UserRole>).map(
//   (role) => ({ value: role, label: getPolishUserRoleName(role) })
// );
const optionsForCustomLinkToDetails = [
  { value: false, label: 'uzupełnię szczegółowy opis oraz obrazki' },
  { value: true, label: 'podam adres www do strony z detalami' },
];

export default function CyclicalActivityAddFormStageTwo<T>(props: Props<T>) {
  ////vars
  const { isCurrentFormToPUTData, formik } = props;
  const isCustomLinkToDetails = formik.getFieldProps(
    'isCustomLinkToDetails'
  ).value;
  const isMounted = useIsMounted();

  function defineCurrentIndex() {
    const currentValue = formik.getFieldProps('isCustomLinkToDetails').value;
    const indexOfOptionsThatContainsCurrentValue =
      optionsForCustomLinkToDetails.findIndex(
        (item) => item.value === currentValue
      );

    return indexOfOptionsThatContainsCurrentValue;
  }

  ////tsx
  return (
    <ComponentTransitionFromRightToLeft>
      <Fragment>
        <div className="-mt-[13px] mr-8">
          <TextareaFormik<T>
            name="shortDescription"
            label={
              isCurrentFormToPUTData ? 'zmień krótki opis:' : 'krótki opis:'
            }
            placeholder="dodaj krótki opis..."
            formik={formik}
          />
        </div>

        <div className=" mt-[20px] form-input-width">
          <SelectFormik<boolean, T>
            name="isCustomLinkToDetails"
            label="wybierz, jak przekażesz szczegółowe informacje do zajęć:"
            options={optionsForCustomLinkToDetails}
            formik={formik}
            isCommentPopupVisible={true}
            commentContent={<IsCustomLinkToDetailsComment />}
            indexForChosenOptionWhenInitializing={defineCurrentIndex()}
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
                {isMounted() ? (
                  <div className=" mt-[20px]">
                    <RichTextEditorFormik<T>
                      name="longDescription"
                      label="szczegółowy opis:"
                      formik={formik}
                    />
                  </div>
                ) : null}

                <div className="mt-[20px]">
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
    </ComponentTransitionFromRightToLeft>
  );
}
