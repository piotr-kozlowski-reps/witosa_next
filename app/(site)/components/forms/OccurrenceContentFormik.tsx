import { getPolishDayName } from '@/lib/textHelpers';
import { Day } from '@prisma/client';
import clsx from 'clsx';
import { FormikProps } from 'formik';
import CloseIcon from '../icons/CloseIcon';
import SelectFormik from './SelectFormik';

type Props<T> = {
  // imageProps: TImageCyclicalActivityFormValues;
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

  ////tsx
  return (
    <div className={clsx('mr-8 base-container-look')}>
      <div className="mx-8 mb-4 base-container-look">
        <div className="relative flex flex-col items-start justify-start mb-[28px]">
          <div className="absolute right-0 -top-[16px] z-60">
            <CloseIcon
              alt="Zamknij mobilne menu."
              actionFn={() => {
                alert('close occurrence - not implemented yet');
              }}
              disabled={false}
            />
          </div>

          <div className="mt-[27px] ml-8 form-input-width ">
            <SelectFormik<Day, T>
              name={`${name}.${index}.day`}
              label="dzień zajęć:"
              options={optionsForDays}
              formik={formik}
              // isCommentPopupVisible={true}
              // commentContent={<IsCustomLinkToDetailsComment />}
              // indexForChosenOptionWhenInitializing={defineCurrentIndex()}
            />
          </div>

          {/* <div className="mt-[20px] ml-[76px] form-input-width self-start ">
              <InputFormik<T>
                name={`images.${index}.alt`}
                type="text"
                label={
                  isCurrentFormToPUTData
                    ? 'zmień opis obrazka (WCAG):'
                    : 'opis obrazka (WCAG):'
                }
                placeholder="opis obrazka"
                formik={formik}
                isCommentPopupVisible={true}
                commentContent={<ImageAltComment />}
              />
            </div> */}
          {/* 
            <div className="mt-[20px] pl-[76px] self-start w-full flex justify-start items-center">
              <TextareaFormik<T>
                name={`images.${index}.additionInfoThatMustBeDisplayed`}
                label={
                  isCurrentFormToPUTData
                    ? 'zmień opcjonalne informacje dodatkowe:'
                    : 'opcjonalne informacje dodatkowe:'
                }
                placeholder="dodaj opcjonalne informacje dodatkowe..."
                formik={formik}
                height={70}
                isCommentPopupVisible={true}
                commentContent={<AdditionalDescriptionComment />}
                isShowCommentToTheLeft={true}
              />
              <div className="w-8"></div>
            </div> */}
        </div>
      </div>
    </div>
  );
}
