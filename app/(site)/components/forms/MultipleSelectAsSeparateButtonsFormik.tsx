import { useMultipleSelectHelper } from '@/hooks/useMultipleSelectHelper';
import { getWhatTypeIsProvidedEnum } from '@/lib/arrayHelpers';
import { getPolishNameForEnumItem } from '@/lib/textHelpers';
import { TTypeDescriber } from '@/types';
import clsx from 'clsx';
import { Field, FormikProps } from 'formik';
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
      <Field id={name} name={name}>
        {(formik: any) => {
          ////vars
          const { field, form, touched } = formik;
          const { onChange, onBlur } = field;
          const { errors } = form;

          const isErrorPresentAndFieldWasTouched: undefined | string =
            errors[name] && form.touched[name];

          return (
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
                  <div key={index} onBlur={onBlur}>
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
                  {errors[name]}
                </p>
              ) : null}
            </Fragment>
          );
        }}
      </Field>
    </div>
  );
}

////utils
// export function getWhatTypeIsProvidedEnum(
//   providedEnum: any[]
// ): TWhatTypeIsProvidedEnum {
//   if (
//     providedEnum.includes('PLASTICITY') &&
//     providedEnum.includes('THEATER') &&
//     providedEnum.includes('RECREATION')
//   ) {
//     return 'IT_IS_ACTIVITY_TYPE';
//   }

//   if (
//     providedEnum.includes('FESTIVAL') &&
//     providedEnum.includes('SPECTACLE') &&
//     providedEnum.includes('WORKSHOP')
//   ) {
//     return 'IT_IS_EVENT_TYPE';
//   }

//   if (providedEnum.includes('CHILDREN') && providedEnum.includes('WOMEN')) {
//     return 'IT_IS_FOR_WHOM_TYPE';
//   }

//   if (
//     providedEnum.includes('DANCING_ROOM') &&
//     providedEnum.includes('ART_ROOM')
//   ) {
//     return 'IT_IS_PLACE_TYPE';
//   }

//   throw new Error(
//     `getWhatTypeIsProvidedEnum - provided Enum doesn't fit desired criteria.`
//   );
// }
