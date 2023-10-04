import { FormikProps } from 'formik';
import CommentPopup from '../comment-popus/CommentPopup';
import CheckboxExplicityForFormikInput from './CheckboxExplicityForFormikInput';

type Props<T = void> =
  | {
      name: string;
      label: string;
      isCommentPopupVisible?: boolean;
      commentContent?: React.ReactNode;
      isToBeUsedAsPartFormik: true;
      actionFn?: never;
      passedValue?: never;
      formik: FormikProps<T>;
    }
  | {
      name: string;
      label: string;
      isCommentPopupVisible?: boolean;
      commentContent?: React.ReactNode;
      isToBeUsedAsPartFormik: false;
      actionFn: () => void;
      passedValue: boolean;
      formik?: never;
    };

export default function CheckboxFormik<T = void>(props: Props<T>) {
  ///vars
  const {
    name,
    label,
    isCommentPopupVisible = false,
    commentContent = 'Brak komentarza.',
    isToBeUsedAsPartFormik,
    actionFn,
    passedValue,
    formik,
  } = props;

  ////tsx
  return (
    <div className="flex flex-col items-start justify-start">
      {isToBeUsedAsPartFormik && formik ? (
        <div className="flex mt-[23px]">
          <div className=" font-base-regular hover:font-base-bold">
            <div className="checkbox-rect">
              <CheckboxExplicityForFormikInput<T> formik={formik} name={name} />
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
