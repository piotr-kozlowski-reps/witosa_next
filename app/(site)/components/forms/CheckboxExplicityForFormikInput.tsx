import { FormikProps } from 'formik';

type Props<T> = {
  formik: FormikProps<T>;
  name: string;
};

export default function CheckboxExplicityForFormikInput<T>(props: Props<T>) {
  ///vars
  const { formik, name } = props;
  const currentValue = formik.getFieldMeta(name).value as boolean;
  const onBlurForInput = formik.getFieldProps(name).onBlur;

  ////tsx
  return (
    <input
      type="checkbox"
      id={name}
      name={name}
      checked={currentValue}
      onChange={(_val) => {
        formik.getFieldHelpers(name).setValue(!currentValue);
      }}
      onBlur={onBlurForInput}
      value={`${currentValue}`}
    />
  );
}
