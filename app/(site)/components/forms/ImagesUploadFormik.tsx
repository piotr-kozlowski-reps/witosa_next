import {
  getErrorForField,
  getIsErrorNOTPresentAndFieldWasTouched,
  getIsErrorPresentAndFieldWasTouched,
} from '@/lib/formikHelpers';
import { TImageCyclicalActivityFormValues } from '@/types';
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import clsx from 'clsx';
import { FormikProps } from 'formik';
import { Fragment } from 'react';
import CustomButton from '../CustomButton';
import ImageInputFormik from './ImageInputFormik';

type Props<T> = {
  name: string;
  label: string;
  formik: FormikProps<T>;
  isCurrentFormToPUTData: string;
};

type TFormImageType = TImageCyclicalActivityFormValues[];

export default function ImagesUploadFormik<T>(props: Props<T>) {
  ////vars
  const { name, label, formik, isCurrentFormToPUTData } = props;

  ////formik
  const error = getErrorForField<T>(formik, name);
  const isErrorPresentAndFieldWasTouched =
    getIsErrorPresentAndFieldWasTouched<T>(formik, name);
  const isErrorNotPresentAndFieldWasTouched =
    getIsErrorNOTPresentAndFieldWasTouched<T>(formik, name);

  const currentImagesValue = formik.getFieldMeta(name).value as TFormImageType;
  const onChangeForInput = formik.getFieldProps(name).onChange;
  const onBlurForInput = formik.getFieldProps(name).onBlur;

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 30,
      },
    })
  );

  function dragEndHander(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) {
      return;
    }

    if (active.id !== over.id) {
      const activeIndex = currentImagesValue.findIndex(
        (el) => el.id === active.id
      );
      const overIndex = currentImagesValue.findIndex((el) => el.id === over.id);
      const properlySwitchedItemsArray = arrayMove(
        currentImagesValue,
        activeIndex,
        overIndex
      );
      properlySwitchedItemsArray;
      const resultArrayWithProperIndexes = properlySwitchedItemsArray.map(
        (imageObject, index) => ({ ...imageObject, index: index })
      );

      formik.setFieldValue(name, resultArrayWithProperIndexes);
    }
  }

  function addNewImage() {
    const resultImagesArray: TImageCyclicalActivityFormValues[] = [
      ...currentImagesValue,
      {
        url: '',
        file: undefined,
        alt: '',
        index: currentImagesValue.length,
        additionInfoThatMustBeDisplayed: '',
        id: new Date().getTime().toString(),
      },
    ];
    formik.setFieldValue(name, resultImagesArray);
  }

  ////tsx
  return (
    <Fragment>
      <label
        htmlFor={name}
        className={clsx(
          'font-base-regular'
          // isErrorPresentAndFieldWasTouched ? 'text-skin-error' : ''
        )}
      >
        {label}
      </label>
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={dragEndHander}
        sensors={sensors}
      >
        <div
          className={clsx(
            'mr-8 base-container-look'
            // error ? 'border-2 border-error' : ''
          )}
        >
          <SortableContext
            items={currentImagesValue}
            strategy={verticalListSortingStrategy}
          >
            {currentImagesValue.map((image, index) => (
              <ImageInputFormik<T>
                name={name}
                key={image.id}
                imageProps={image}
                index={index}
                formik={formik}
                isCurrentFormToPUTData={isCurrentFormToPUTData}
              />
            ))}
          </SortableContext>
          <div className="ml-8">
            <CustomButton
              text={'dodaj obrazek'}
              descriptionText="Dodaj obrazek."
              additionalClasses="mt-[4px]"
              disabled={!!error}
              outlined={true}
              actionFn={() => {
                addNewImage();
              }}
            />
          </div>
        </div>
      </DndContext>
    </Fragment>
  );
}
