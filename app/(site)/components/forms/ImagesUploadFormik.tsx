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

  const valueOfImagesToBePassedFurther: TFormImageType =
    currentImagesValue.length > 0
      ? currentImagesValue
      : [
          {
            file: undefined,
            alt: '',
            additionInfoThatMustBeDisplayed: '',
            id: new Date().getTime().toString(),
          },
        ];

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

      const resultArray = arrayMove(currentImagesValue, activeIndex, overIndex);

      formik.setFieldValue(name, resultArray);

      // setImages((elements) => {
      //   const activeIndex = elements.findIndex((el) => el.id === active.id);
      //   const overIndex = elements.findIndex((el) => el.id === over.id);

      //   return arrayMove(elements, activeIndex, overIndex);
      // });
    }
  }

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
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={dragEndHander}
        sensors={sensors}
      >
        <SortableContext
          items={valueOfImagesToBePassedFurther}
          strategy={verticalListSortingStrategy}
        >
          <div className="mr-8 base-container-look">
            {valueOfImagesToBePassedFurther.map((image, index) => (
              <ImageInputFormik<T>
                name={name}
                key={image.id}
                imageProps={image}
                index={index}
                formik={formik}
                isCurrentFormToPUTData={isCurrentFormToPUTData}
              />
            ))}
          </div>

          {/* {isErrorPresentAndFieldWasTouched ? (
            <p className="mt-[4px] text-skin-error mb-0 font-base-regular">
              {error}
            </p>
          ) : null} */}
        </SortableContext>
      </DndContext>
    </Fragment>
  );
}
