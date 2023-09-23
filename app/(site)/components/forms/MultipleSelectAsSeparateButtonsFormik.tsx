import { useMultipleSelectHelper } from '@/hooks/useMultipleSelectHelper';
import {
  getPolishCategoryOfActivitiesName,
  getPolishForWhomName,
} from '@/lib/textHelpers';
import { TWhatTypeIsProvidedEnum } from '@/types';
import { ActivityType, ForWhom } from '@prisma/client';
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
    getWhatTypeIsProvidedEnum<T>(enumToIterateThrough);
  const isActivityType = whatTypeIsProvidedEnum === 'IT_IS_ACTIVITY_TYPE';
  const isEventType = whatTypeIsProvidedEnum === 'IT_IS_EVENT_TYPE';
  const isForWhomType = whatTypeIsProvidedEnum === 'IT_IS_FOR_WHOM_TYPE';

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
                className="flex items-center justify-start gap-4 mt-[11px] flex-wrap"
                style={{ width: width ? width : '100%' }}
              >
                {enumToIterateThrough.map((item, index) => (
                  <div key={index} onBlur={onBlur}>
                    <CustomButton
                      id={item as string}
                      text={
                        isActivityType
                          ? getPolishCategoryOfActivitiesName(
                              item as ActivityType
                            )
                          : isForWhomType
                          ? getPolishForWhomName(item as ForWhom)
                          : 'text'
                      }
                      descriptionText={
                        isActivityType
                          ? getPolishCategoryOfActivitiesName(
                              item as ActivityType
                            )
                          : 'text'
                      }
                      disabled={false}
                      outlined={!isItemChosen(item)}
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
function getWhatTypeIsProvidedEnum<T>(
  providedEnum: T[]
): TWhatTypeIsProvidedEnum {
  if (
    providedEnum.includes('PLASTICITY' as T) &&
    providedEnum.includes('THEATER' as T) &&
    providedEnum.includes('RECREATION' as T)
  ) {
    return 'IT_IS_ACTIVITY_TYPE';
  }

  if (
    providedEnum.includes('FESTIVAL' as T) &&
    providedEnum.includes('SPECTACLE' as T) &&
    providedEnum.includes('WORKSHOP' as T)
  ) {
    return 'IT_IS_EVENT_TYPE';
  }

  if (
    providedEnum.includes('CHILDREN' as T) &&
    providedEnum.includes('WOMEN' as T)
  ) {
    return 'IT_IS_FOR_WHOM_TYPE';
  }

  throw new Error(
    `getWhatTypeIsProvidedEnum - provided Enum doesn't fit desired criteria.`
  );
}
