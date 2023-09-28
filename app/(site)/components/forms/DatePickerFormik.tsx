import { isDateSchema } from '@/lib/zodSchemas';
import { DatePicker } from '@mui/x-date-pickers';
import clsx from 'clsx';
import { FormikProps } from 'formik';

type Props<T> = {
  name: string;
  label: string;
  formik: FormikProps<T>;
  additionalClasses?: string;
  isErrorValidationTurnedOn: boolean;
};

export default function DatePickerFormik<T>(props: Props<T>) {
  ///vars
  const { name, label, formik, additionalClasses, isErrorValidationTurnedOn } =
    props;

  // console.log('typeof', typeof formik.getFieldProps(name).value);

  const isErrorPresentAndFieldWasTouched =
    isErrorValidationTurnedOn &&
    checkIfValueIsDate(formik.getFieldProps(name).value) === false &&
    formik.getFieldMeta(name).touched;

  const isErrorNOTPresentAndFieldWasTouched =
    isErrorValidationTurnedOn &&
    checkIfValueIsDate(formik.getFieldProps(name).value) === true &&
    formik.getFieldMeta(name).touched;

  // console.log(isError);

  ///tsx
  return (
    <div className="flex flex-col items-start justify-start font-base-regular">
      {/* <Field id={name} name={name}>
        <div className="flex mt-[23px]">
          <div className=" font-base-regular hover:font-base-bold">
            <DatePicker
              label={label}
              value={formik.getFieldProps(name).value}
              onChange={(val) => formik.getFieldHelpers(name).setValue(val)}
            /> */}
      {/* <div className="checkbox-rect">
              <input
                type="checkbox"
                id={name}
                name={name}
                // checked={form.values[name]}
                // onChange={(val) => onChange(val)}
                // onBlur={onBlur}
                // value={form.values[name]}
              />

              <label htmlFor={name} className="pl-8 ">
                {label}
              </label>
            </div>
          </div> */}
      {/* {isCommentPopupVisible ? (
                <div className="px-2">
                  <CommentPopup
                    size="EXTRA_SMALL"
                    alt={`${name} - komentarz.`}
                    commentContent={commentContent}
                  />
                </div>
              ) : null} */}
      {/* </div>
        </div>
      </Field> */}
      <div
        className={additionalClasses ? additionalClasses : ''}
        onBlur={() => formik.getFieldHelpers(name).setTouched(true)}
      >
        <div
          className={clsx(
            'font-base-regular mb-[3px]',
            isErrorPresentAndFieldWasTouched ? 'text-skin-error' : ''
          )}
        >
          {label}
        </div>
        <DatePicker
          // label={label}
          format="yyyy-MM-dd"
          value={formik.getFieldProps(name).value}
          onChange={(val) => formik.getFieldHelpers(name).setValue(val)}
          views={['day']}
          showDaysOutsideCurrentMonth
          sx={{
            '& .MuiInputBase-root': {
              backgroundColor: isErrorNOTPresentAndFieldWasTouched
                ? 'var(--cta-secondary-opacity)'
                : '',
              outlineColor: clsx(
                isErrorPresentAndFieldWasTouched
                  ? 'var(--color-error)'
                  : isErrorNOTPresentAndFieldWasTouched
                  ? 'var(--cta-secondary-opacity)'
                  : ''
              ),
              // isErrorPresentAndFieldWasTouched
              //   ? 'var(--color-error)'
              //   : '',
            },
          }}

          // sx={{
          //   '& .MuiInputBase-root': {
          //     borderRadius: '20px',
          //     fontSize: 'var(--font-size-normal)',
          //     lineHeight: 'var(--font-size-normal-line-height)',
          //     fontWeight: '300',
          //     outlineStyle: 'solid',
          //     outlineWidth: '2px',
          //     outlineColor: 'var(--cta-primary)',
          //     paddingLeft: '1.5rem',
          //     paddingRight: '1.5rem',
          //     border: 'none',
          //     // paddingTop: '0.5rem',
          //     // paddingBottom: '0.5rem',
          //   },
          //   '& .MuiInputBase-root:hover': {
          //     outlineColor: 'var(--cta-secondary)',
          //     // border: 'none',
          //     // outline: 'none',
          //     // backgroundColor: 'red',
          //     // outline: 'none',
          //   },
          //   '& .MuiInputBase-root.selected': {
          //     outlineColor: 'var(--cta-secondary)',
          //     // border: 'none',
          //     // outline: 'none',
          //     // backgroundColor: 'red',
          //     // outline: 'none',
          //   },
          //   '& .MuiButtonBase-root:hover': {
          //     backgroundColor: 'var(--cta-secondary)',
          //     color: 'var(--color-background-base)',
          //   },
          //   '& .MuiPickersDay-root': {
          //     backgroundColor: 'var(--cta-secondary)',
          //     color: 'var(--color-background-base)',
          //     // padding: '20px',
          //   },
          // }}
        />
      </div>
    </div>
  );
}

//utils
function checkIfValueIsDate(val: any) {
  try {
    isDateSchema.parse(val);
  } catch (error) {
    return false;
  }

  return true;
}
