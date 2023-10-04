import { useMultipleSelectHelper } from '@/hooks/useMultipleSelectHelper';
import { getWhatTypeIsProvidedEnum } from '@/lib/arrayHelpers';
import {
  getErrorForField,
  getIsErrorNOTPresentAndFieldWasTouched,
  getIsErrorPresentAndFieldWasTouched,
} from '@/lib/formikHelpers';
import { getPolishNameForEnumItem } from '@/lib/textHelpers';
import { TTypeDescriber } from '@/types';
import clsx from 'clsx';
import { FormikProps } from 'formik';
import { Fragment } from 'react';
import CustomButton from '../CustomButton';

interface Props<T, R> {
  name: string;
  label: string;
  enumToIterateThrough: T[];
  formik: FormikProps<R>;
  width?: number;
}

export default function MultipleSelectAsSeparateButtonsFormik<T, R>(
  props: Props<T, R>
) {
  ///vars
  const { name, label, width, formik, enumToIterateThrough } = props;
  const { toggleItemsInArray, isItemChosen } = useMultipleSelectHelper<T, R>(
    formik,
    name
  );
  //formik
  const error = getErrorForField<R>(formik, name);
  const isErrorPresentAndFieldWasTouched =
    getIsErrorPresentAndFieldWasTouched<R>(formik, name);
  const isErrorNotPresentAndFieldWasTouched =
    getIsErrorNOTPresentAndFieldWasTouched<R>(formik, name);

  const currentValue = formik.getFieldMeta(name).value as string;
  const onChangeForInput = formik.getFieldProps(name).onChange;
  const onBlurForInput = formik.getFieldProps(name).onBlur;

  //getting what type is provided Enum
  const whatTypeIsProvidedEnum =
    getWhatTypeIsProvidedEnum(enumToIterateThrough);
  const isActivityType = whatTypeIsProvidedEnum === 'IT_IS_ACTIVITY_TYPE';
  const isEventType = whatTypeIsProvidedEnum === 'IT_IS_EVENT_TYPE';
  const isForWhomType = whatTypeIsProvidedEnum === 'IT_IS_FOR_WHOM_TYPE';
  const isPlaceType = whatTypeIsProvidedEnum === 'IT_IS_PLACE_TYPE';
  const typeDescriber: TTypeDescriber = {
    isActivityType,
    isEventType,
    isForWhomType,
    isPlaceType,
  };

  ////tsx
  return (
    <div className="flex flex-col items-start justify-start">
      <Fragment>
        <label
          htmlFor={name}
          className={clsx(
            'font-base-regular',
            isErrorPresentAndFieldWasTouched ? 'text-skin-error' : ''
          )}
        >
          {label}
        </label>
        <div
          className="flex items-center justify-start gap-4 mt-[3px] flex-wrap"
          style={{ width: width ? width : '100%' }}
        >
          {enumToIterateThrough.map((item, index) => (
            <div key={index} onBlur={onBlurForInput}>
              <CustomButton
                id={item as string}
                text={getPolishNameForEnumItem<T>(typeDescriber, item)}
                descriptionText={getPolishNameForEnumItem<T>(
                  typeDescriber,
                  item
                )}
                disabled={false}
                outlined={true}
                isChosen={isItemChosen(item)}
                actionFn={() => {
                  toggleItemsInArray(item as T);
                }}
              />
            </div>
          ))}
        </div>

        {isErrorPresentAndFieldWasTouched ? (
          <p className="mt-[6px] text-skin-error mb-0 font-base-regular">
            {error}
          </p>
        ) : null}
      </Fragment>
    </div>
  );
}
