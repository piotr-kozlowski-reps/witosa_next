import { DatePicker } from '@mui/x-date-pickers';
import { Field, FormikProps } from 'formik';

type Props<T> = {
  name: string;
  label: string;
  formik: FormikProps<T>;
};

export default function DatePickerFormik<T>(props: Props<T>) {
  ///vars
  const { name, label, formik } = props;

  // console.log(formik.getFieldHelpers);

  ///tsx
  return (
    <div className="flex flex-col items-start justify-start">
      <Field id={name} name={name}>
        <div className="flex mt-[23px]">
          <div className=" font-base-regular hover:font-base-bold">
            <DatePicker
              label={label}
              value={formik.getFieldProps(name).value}
              onChange={(val) => formik.getFieldHelpers(name).setValue(val)}
            />
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
          </div>
        </div>
      </Field>
    </div>
  );
}
