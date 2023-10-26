import CheckboxFormik from '@/app/(site)/components/forms/CheckboxFormik';
import ImageUploadFormik from '@/app/(site)/components/forms/ImageUploadFormik';
import ComponentTransitionFromRightToLeft from '@/app/(site)/components/motionWrappers/ComponentTransitionFromRightToLeft';
import { FormikProps } from 'formik';
import { AnimatePresence } from 'framer-motion';
import { Fragment } from 'react';
import IsDateToBeHiddenInNewsSectionComment from '../form_comments/IsDateToBeHiddenInNewsSectionComment';
import IsToBeOnlyInNewsSectionComment from '../form_comments/IsToBeOnlyInNewsSectionComment';
import NewsSectionImageUrlComment from '../form_comments/NewsSectionImageUrlComment';

type Props<T> = {
  isCurrentFormToPUTData: string;
  formik: FormikProps<T>;
};

export default function EventAddFormStageTwo<T>(props: Props<T>) {
  ////vars
  const { isCurrentFormToPUTData, formik } = props;
  const isToBeInNewsSection = formik.getFieldProps('isToBeInNewsSection').value;

  return (
    <Fragment>
      <div className="-mt-[30px]">
        <CheckboxFormik<T>
          name="isToBeInNewsSection"
          label="Czy wydarzenie ma się pojawić w aktualnościach?"
          isToBeUsedAsPartFormik={true}
          formik={formik}
        />
      </div>
      <AnimatePresence mode="wait">
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
                  imagePreviewType={'NEWS_IMAGE_PREVIEW'}
                />
              </div>
            </Fragment>
          </ComponentTransitionFromRightToLeft>
        ) : null}
      </AnimatePresence>
    </Fragment>
  );
}
