import { getPolishDayName } from '@/lib/textHelpers';
import { TOccurrence } from '@/types';
import { Day } from '@prisma/client';
import { FormikProps } from 'formik';
import CloseIcon from '../icons/CloseIcon';
import HourAndMinutePickerFormik from './HourAndMinutePickerFormik';
import SelectFormik from './SelectFormik';

type Props<T> = {
  // occurrenceItem: TOccurrence;
  name: string;
  index: number;
  formik: FormikProps<T>;
  // isCurrentFormToPUTData: string;
};

const optionsForDays = (Object.keys(Day) as Array<Day>).map((day) => ({
  value: day,
  label: getPolishDayName(day),
}));

export default function OccurrenceContentFormik<T>(props: Props<T>) {
  ////vars
  const { name, index, formik } = props;

  ////formik
  const currentOccurrencesValue = formik.getFieldMeta(name)
    .value as TOccurrence[];

  console.log({ currentOccurrencesValue });

  ////utils
  function deleteOccurrenceItem() {
    console.log({ index });
    const resultOccurrencesArray = [...currentOccurrencesValue];

    resultOccurrencesArray.splice(index, 1);
    console.log({ resultOccurrencesArray });

    formik.setFieldValue('occurrence', resultOccurrencesArray);
  }

  ////tsx
  return (
    <div className="mx-8 mb-4 base-container-look">
      <div className="relative flex flex-col items-start justify-start mb-[28px]">
        <div className="absolute right-0 -top-[16px] z-60">
          <CloseIcon
            alt="Zamknij mobilne menu."
            actionFn={deleteOccurrenceItem}
            disabled={currentOccurrencesValue.length <= 1}
          />
        </div>

        <div className="mt-[27px] ml-8 form-input-width ">
          <SelectFormik<Day, T>
            name={`${name}.${index}.day`}
            label="dzień zajęć:"
            options={optionsForDays}
            formik={formik}
          />
        </div>

        <div className="mt-[27px] ml-8 form-input-width">
          <HourAndMinutePickerFormik<T>
            name={`${name}.${index}.activityStart`}
            formik={formik}
            label="godzina rozpoczęcia:"
            isErrorValidationTurnedOn={true}
          />
        </div>

        <div className="mt-[27px] ml-8 form-input-width">
          <HourAndMinutePickerFormik<T>
            name={`${name}.${index}.activityEnd`}
            formik={formik}
            label="godzina zakończenia:"
            isErrorValidationTurnedOn={true}
          />
        </div>
      </div>
    </div>
  );
}
