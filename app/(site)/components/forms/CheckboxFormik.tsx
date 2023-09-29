import { Field } from 'formik';
import CommentPopup from '../comment-popus/CommentPopup';

type Props =
  | {
      name: string;
      label: string;
      isCommentPopupVisible?: boolean;
      commentContent?: string;
      isToBeUsedAsPartFormik: true;
      actionFn?: never;
      passedValue?: never;
    }
  | {
      name: string;
      label: string;
      isCommentPopupVisible?: boolean;
      commentContent?: string;
      isToBeUsedAsPartFormik: false;
      actionFn: () => void;
      passedValue: boolean;
    };

export default function CheckboxFormik(props: Props) {
  ///vars
  const {
    name,
    label,
    isCommentPopupVisible = false,
    commentContent = 'Brak komentarza.',
    isToBeUsedAsPartFormik,
    actionFn,
    passedValue,
  } = props;

  return (
    <div className="flex flex-col items-start justify-start">
      {isToBeUsedAsPartFormik ? (
        <Field id={name} name={name}>
          {(formik: any) => {
            ////vars
            const { field, form, touched } = formik;
            const { onChange, onBlur } = field;
            const { errors } = form;

            const isErrorPresentAndFieldWasTouched: undefined | string =
              errors[name] && form.touched[name];

            // console.log({ field });

            return (
              <div className="flex mt-[23px]">
                <div className=" font-base-regular hover:font-base-bold">
                  <div className="checkbox-rect">
                    <input
                      type="checkbox"
                      id={name}
                      name={name}
                      checked={form.values[name]}
                      onChange={(val) => onChange(val)}
                      onBlur={onBlur}
                      value={form.values[name]}
                    />

                    <label htmlFor={name} className="pl-8 ">
                      {label}
                    </label>
                  </div>
                </div>
                {isCommentPopupVisible ? (
                  <div className="px-2">
                    <CommentPopup
                      size="EXTRA_SMALL"
                      alt={`${name} - komentarz.`}
                      commentContent={commentContent}
                    />
                  </div>
                ) : null}
              </div>
            );
          }}
        </Field>
      ) : null}

      {!isToBeUsedAsPartFormik ? (
        <div className="flex mt-[23px]">
          <div className=" font-base-regular hover:font-base-bold">
            <div className="checkbox-rect">
              <input
                type="checkbox"
                id={name}
                name={name}
                checked={passedValue}
                onChange={actionFn}
                value={`${passedValue}`}
              />

              <label htmlFor={name} className="pl-8 ">
                {label}
              </label>
            </div>
          </div>
          {isCommentPopupVisible ? (
            <div className="px-2">
              <CommentPopup
                size="EXTRA_SMALL"
                alt={`${name} - komentarz.`}
                commentContent={commentContent}
              />
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
