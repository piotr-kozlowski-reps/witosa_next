import { getPolishCategoryOfActivitiesName } from '@/lib/textHelpers';
import { ActivityType } from '@prisma/client';
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

  // let enumWithCasedType: unknown[];
  // if (
  //   enumToIterateThrough.includes('PLASTICITY' as T) &&
  //   enumToIterateThrough.includes('THEATER' as T) &&
  //   enumToIterateThrough.includes('RECREATION' as T)
  // ) {
  //   enumWithCasedType = { ...enumToIterateThrough } as unknown as ActivityType;
  // }

  // console.log(typeof enumWithCasedType);

  // const enumWIthCasedType = enumToIterateThrough
  // console.log(typeof enumWithCasedType);

  let isActivityType = false;
  if (
    enumToIterateThrough.includes('PLASTICITY' as T) &&
    enumToIterateThrough.includes('THEATER' as T) &&
    enumToIterateThrough.includes('RECREATION' as T)
  ) {
    isActivityType = true;
  }

  let isEventType = false;
  if (
    enumToIterateThrough.includes('FESTIVAL' as T) &&
    enumToIterateThrough.includes('SPECTACLE' as T) &&
    enumToIterateThrough.includes('WORKSHOP' as T)
  ) {
    isEventType = true;
  }

  let isForWhomType = false;
  if (
    enumToIterateThrough.includes('CHILDREN' as T) &&
    enumToIterateThrough.includes('WOMEN' as T)
  ) {
    isForWhomType = true;
  }

  // console.log({ isActivityType });
  // console.log({ isEventType });
  // console.log({ isForWhomType });

  // const [selectedOption, setSelectedOption] = useState(options[0]);
  // const [isMounted, setIsMounted] = useState(false);

  // useEffect(() => {
  //   formik.setFieldValue(name, selectedOption.value);
  // }, []);

  return (
    <div className="flex flex-col items-start justify-start">
      <Field id={name} name="name">
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
                  <div key={index}>
                    <CustomButton
                      // text="text"
                      text={
                        isActivityType
                          ? getPolishCategoryOfActivitiesName(
                              item as ActivityType
                            )
                          : 'text'
                      }
                      // descriptionText="test"
                      descriptionText={
                        isActivityType
                          ? getPolishCategoryOfActivitiesName(
                              item as ActivityType
                            )
                          : 'text'
                      }
                      disabled={false}
                      outlined={true}
                      // outlined={
                      //   checkButtonCategoryState(activityType) ? false : true
                      // }
                      // actionFn={() => {}}
                      // actionFn={() => toggleCategory(activityType)}
                    />
                  </div>
                  // <div key={index}>item: {item as string}</div>
                ))}
              </div>

              {/* //   <div
            //     className="custom-select"
            //     style={{ width: width ? width : '100%' }}
            //   >
            //     <Select
            //       options={options}
            //       defaultValue={selectedOption}
            //       name={name}
            //       id={name}
            //       onChange={(val) => {
            //         setSelectedOption({ value: val!.value, label: val!.label });
            //         form.setFieldValue(name, val!.value);
            //       }}
            //       onBlur={onBlur}
            //       value={selectedOption}
            //       styles={{
            //         container: (baseStyles) => ({
            //           ...baseStyles,
            //         }),
            //         control: (baseStyles, state) => ({
            //           ...baseStyles,
            //           ...stylesCommon,
            //           cursor: 'pointer',
            //           fontWeight: state.isFocused ? 600 : 400,
            //           border:
            //             state.isFocused || state.menuIsOpen
            //               ? '2px solid var(--cta-secondary)'
            //               : '2px solid var(--color-background-base)',
            //         }),
            //         menu: () => ({
            //           width: '100%',
            //         }),
            //         option: (baseStyles, state) => ({
            //           ...baseStyles,
            //           ...stylesCommon,
            //           fontWeight: state.isSelected
            //             ? 600
            //             : state.isFocused
            //             ? 600
            //             : 400,
            //           color: state.isSelected
            //             ? 'var(--color-background-base)'
            //             : 'var(--color-foreground-base)',
            //           backgroundColor: state.isSelected
            //             ? 'var(--cta-secondary)'
            //             : state.isFocused
            //             ? 'var(--cta-primary)'
            //             : 'var(--color-background-base)',
            //           border: state.isSelected
            //             ? '0px solid var(--cta-primary)'
            //             : state.isFocused
            //             ? '0px solid var(--cta-primary)'
            //             : '2px solid var(--cta-primary)',
            //           padding: '5px',
            //           cursor: state.isSelected ? 'default' : 'pointer',
            //           height: '44px',
            //           display: 'flex',
            //           justifyContent: 'start',
            //           alignItems: 'center',
            //           boxShadow: 'none',
            //         }),
            //       }}
            //     />
            //   </div>

            //   {isErrorPresentAndFieldWasTouched ? (
            //     <p className="mt-[4px] text-skin-error mb-0 font-base-regular">
            //       {errors[name]}
            //     </p>
            //   ) : null} */}
            </Fragment>
          );
        }}
      </Field>
    </div>
  );
}

////utils
// function defineTypeOfProvidedEnum(
//   providedEnum: ActivityType | EventType | ForWhom
// ) {
//   const isActivityType =
//     ('PLASTICITY' as ActivityType) in providedEnum &&
//     'THEATER' in providedEnum &&
//     'RECREATION' in providedEnum;

//   const isEventType =
//     'FESTIVAL' in providedEnum &&
//     'SPECTACLE' in providedEnum &&
//     'WORKSHOP' in providedEnum;

//   const isForWhomType = 'CHILDREN' in providedEnum && 'WOMEN' in providedEnum;
// }
