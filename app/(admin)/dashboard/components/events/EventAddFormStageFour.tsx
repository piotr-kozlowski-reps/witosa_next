import CheckboxFormik from '@/app/(site)/components/forms/CheckboxFormik';
import { FormikProps } from 'formik';
import { Fragment } from 'react';
type Props<T> = {
  isCurrentFormToPUTData: string;
  formik: FormikProps<T>;
};

// const optionsForCustomLinkToDetails =
//   serveOptionsForCustomLinkToDetailsInEvents();

export default function EventAddFormStageFour<T>(props: Props<T>) {
  ////vars
  const { isCurrentFormToPUTData, formik } = props;

  // /** when isToBeOnlyInNewsSection_NotSeenInEvents is true, only shortDescription should be available  */
  // const isDetailsToBeAdded = !formik.getFieldProps(
  //   'isToBeOnlyInNewsSection_NotSeenInEvents'
  // ).value;
  // const isCustomLinkToDetails = formik.getFieldProps(
  //   'isCustomLinkToDetails'
  // ).value;

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
    </Fragment>
  );
}
