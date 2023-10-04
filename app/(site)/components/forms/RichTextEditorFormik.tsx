import {
  getErrorForField,
  getIsErrorNOTPresentAndFieldWasTouched,
  getIsErrorPresentAndFieldWasTouched,
} from '@/lib/formikHelpers';
import clsx from 'clsx';
import { FormikProps } from 'formik';
import { Fragment, useEffect, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

type Props<T> =
  | {
      name: string;
      label: string;
      // type: string;
      // placeholder: string;
      // width?: number;
      formik: FormikProps<T>;
      // isCommentPopupVisible?: false;
      // commentContent?: never;
    }
  | {
      name: string;
      label: string;
      // type: string;
      // placeholder: string;
      // width?: number;
      formik: FormikProps<T>;
      // isCommentPopupVisible?: true;
      // commentContent?: React.ReactNode;
    };

export default function RichTextEditorFormik<T>(props: Props<T>) {
  ////vars
  const { name, label, formik } = props;

  ////formik
  const error = getErrorForField<T>(formik, name);
  const isErrorPresentAndFieldWasTouched =
    getIsErrorPresentAndFieldWasTouched<T>(formik, name);
  const isErrorNotPresentAndFieldWasTouched =
    getIsErrorNOTPresentAndFieldWasTouched<T>(formik, name);

  const currentValue = formik.getFieldMeta(name).value as string;
  const onChangeForInput = formik.getFieldProps(name).onChange;
  const onBlurForInput = formik.getFieldProps(name).onBlur;

  const [value, setValue] = useState(currentValue);
  // console.log({ value });

  useEffect(() => {
    formik.getFieldHelpers(name).setValue(value);
  }, [value]);

  var icons = Quill.import('ui/icons');
  icons.header[2] = `
    <svg viewBox="0 0 18 18">
      <path
        class="ql-fill"
        d="M16.73975,13.81445v.43945a.54085.54085,0,0,1-.605.60547H11.855a.58392.58392,0,0,1-.64893-.60547V14.0127c0-2.90527,3.39941-3.42187,3.39941-4.55469a.77675.77675,0,0,0-.84717-.78125,1.17684,1.17684,0,0,0-.83594.38477c-.2749.26367-.561.374-.85791.13184l-.4292-.34082c-.30811-.24219-.38525-.51758-.1543-.81445a2.97155,2.97155,0,0,1,2.45361-1.17676,2.45393,2.45393,0,0,1,2.68408,2.40918c0,2.45312-3.1792,2.92676-3.27832,3.93848h2.79443A.54085.54085,0,0,1,16.73975,13.81445ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"
      />
    </svg>`;
  icons.header[3] = `
    <svg viewBox="0 0 18 18">
  <path class="ql-fill" d="M16.65186,12.30664a2.6742,2.6742,0,0,1-2.915,2.68457,3.96592,3.96592,0,0,1-2.25537-.6709.56007.56007,0,0,1-.13232-.83594L11.64648,13c.209-.34082.48389-.36328.82471-.1543a2.32654,2.32654,0,0,0,1.12256.33008c.71484,0,1.12207-.35156,1.12207-.78125,0-.61523-.61621-.86816-1.46338-.86816H13.2085a.65159.65159,0,0,1-.68213-.41895l-.05518-.10937a.67114.67114,0,0,1,.14307-.78125l.71533-.86914a8.55289,8.55289,0,0,1,.68213-.7373V8.58887a3.93913,3.93913,0,0,1-.748.05469H11.9873a.54085.54085,0,0,1-.605-.60547V7.59863a.54085.54085,0,0,1,.605-.60547h3.75146a.53773.53773,0,0,1,.60547.59375v.17676a1.03723,1.03723,0,0,1-.27539.748L14.74854,10.0293A2.31132,2.31132,0,0,1,16.65186,12.30664ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/>
</svg>`;
  icons.header[4] = `
    <svg viewBox="0 0 18 18">
  <path class="ql-fill" d="M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm7.05371,7.96582v.38477c0,.39648-.165.60547-.46191.60547h-.47314v1.29785a.54085.54085,0,0,1-.605.60547h-.69336a.54085.54085,0,0,1-.605-.60547V12.95605H11.333a.5412.5412,0,0,1-.60547-.60547v-.15332a1.199,1.199,0,0,1,.22021-.748l2.56348-4.05957a.7819.7819,0,0,1,.72607-.39648h1.27637a.54085.54085,0,0,1,.605.60547v3.7627h.33008A.54055.54055,0,0,1,17.05371,11.96582ZM14.28125,8.7207h-.022a4.18969,4.18969,0,0,1-.38525.81348l-1.188,1.80469v.02246h1.5293V9.60059A7.04058,7.04058,0,0,1,14.28125,8.7207Z"/>
</svg>`;

  const modules = {
    toolbar: [
      [{ header: 2 }, { header: 3 }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link'],
      ['clean'],
    ],
    history: {
      delay: 1500,
      maxStack: 500,
      userOnly: true,
    },
  };

  ////tsx
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
      <div className="mr-8 ">
        <ReactQuill
          modules={modules}
          theme="snow"
          value={value}
          // onChange={setValue}
          onChange={(content, delta, source, editor) => {
            if (editor.getText().trim() == '') {
              console.log('inside editor.getText() == null');

              setValue('');
              return;
            }
            setValue(content);
          }}
          className={clsx(
            'ql-toolbar ql-container.ql-snow',
            isErrorPresentAndFieldWasTouched ? 'ql-toolbar-error' : ''
          )}
          onBlur={() => formik.getFieldHelpers(name).setTouched(true)}
          style={{
            border: isErrorPresentAndFieldWasTouched ? 'solid' : 'none',
            borderWidth: isErrorPresentAndFieldWasTouched ? '2px' : '0px',
            borderColor: isErrorPresentAndFieldWasTouched
              ? 'var(--color-error)'
              : 'var(--color-main-bg)',
            backgroundColor: isErrorNotPresentAndFieldWasTouched
              ? 'var(--cta-secondary-opacity)'
              : 'var(--color-main-bg)',
          }}
        />
        {isErrorPresentAndFieldWasTouched ? (
          <p className="mt-[4px] text-skin-error mb-0 font-base-regular">
            {error}
          </p>
        ) : null}
      </div>
    </Fragment>
  );
}
