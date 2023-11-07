'use client';

import {
  getErrorForField,
  getIsErrorNOTPresentAndFieldWasTouched,
  getIsErrorPresentAndFieldWasTouched,
} from '@/lib/formikHelpers';
import { DatePicker } from '@mui/x-date-pickers';
import clsx from 'clsx';
import { FormikProps } from 'formik';
import CommentPopup from '../comment-popus/CommentPopup';

type Props<T> = {
  name: string;
  label: string;
  formik: FormikProps<T>;
  additionalClasses?: string;
  isErrorValidationTurnedOn: boolean;
  errorText?: string;
  isCommentPopupVisible?: boolean;
  commentContent?: React.ReactNode;
};

export default function DatePickerFormik<T>(props: Props<T>) {
  ///vars
  const {
    name,
    label,
    formik,
    additionalClasses,
    isCommentPopupVisible,
    commentContent,
  } = props;

  const error = getErrorForField<T>(formik, name);

  const isErrorPresentAndFieldWasTouched =
    getIsErrorPresentAndFieldWasTouched<T>(formik, name);
  const isErrorNotPresentAndFieldWasTouched =
    getIsErrorNOTPresentAndFieldWasTouched<T>(formik, name);

  ///tsx
  return (
    <div className="flex flex-col items-start justify-start font-base-regular">
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
        <div className="flex items-center justify-center">
          <DatePicker
            format="yyyy-MM-dd"
            value={formik.getFieldProps(name).value}
            onChange={(val) => formik.getFieldHelpers(name).setValue(val)}
            views={['day']}
            showDaysOutsideCurrentMonth
            sx={{
              '& .MuiInputBase-root': {
                backgroundColor: isErrorNotPresentAndFieldWasTouched
                  ? 'var(--cta-secondary-opacity)'
                  : '',
                outlineColor: clsx(
                  isErrorPresentAndFieldWasTouched
                    ? 'var(--color-error)'
                    : isErrorNotPresentAndFieldWasTouched
                    ? 'var(--cta-secondary-opacity)'
                    : ''
                ),
              },
            }}
          />
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
        {isErrorPresentAndFieldWasTouched ? (
          <p className="mt-[4px] text-skin-error mb-0 font-base-regular">
            {error}
          </p>
        ) : null}
      </div>
    </div>
  );
}
