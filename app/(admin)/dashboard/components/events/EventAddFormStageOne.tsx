import InputFormik from '@/app/(site)/components/forms/InputFormik';
import MultipleSelectAsSeparateButtonsFormik from '@/app/(site)/components/forms/MultipleSelectAsSeparateButtonsFormik';
import { EventType, ForWhom, Place } from '@prisma/client';
import { FormikProps } from 'formik';
import { Fragment } from 'react';

type Props<T> = {
  isCurrentFormToPUTData: string;
  formik: FormikProps<T>;
};

export default function EventAddFormStageOne<T>(props: Props<T>) {
  ////vars
  const { isCurrentFormToPUTData, formik } = props;

  return (
    <Fragment>
      <div className="form-input-width -mt-[13px]">
        <InputFormik<T>
          name="title"
          type="text"
          label={isCurrentFormToPUTData ? 'zmień nazwę:' : 'nazwa:'}
          placeholder="wpisz nazwę"
          formik={formik}
        />
      </div>

      <div className=" mt-[20px]">
        <MultipleSelectAsSeparateButtonsFormik<EventType, T>
          name="eventTypes"
          label={
            isCurrentFormToPUTData
              ? 'zmień rodzaj wydarzenia:'
              : 'rodzaj wydarzenia:'
          }
          enumToIterateThrough={Object.keys(EventType) as Array<EventType>}
          formik={formik}
        />
      </div>

      <div className="mt-[22px]">
        <MultipleSelectAsSeparateButtonsFormik<ForWhom, T>
          name="eventForWhom"
          label={isCurrentFormToPUTData ? 'zmień dla kogo:' : 'dla kogo:'}
          enumToIterateThrough={Object.keys(ForWhom) as Array<ForWhom>}
          formik={formik}
        />
      </div>

      <div className="mt-[22px]">
        <MultipleSelectAsSeparateButtonsFormik<Place, T>
          name="places"
          label={
            isCurrentFormToPUTData ? 'zmień miejsce zajęć:' : 'miejsce zajęć:'
          }
          enumToIterateThrough={Object.keys(Place) as Array<Place>}
          formik={formik}
        />
      </div>
    </Fragment>
  );
}
