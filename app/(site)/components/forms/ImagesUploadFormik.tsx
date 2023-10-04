import {
  getErrorForField,
  getIsErrorNOTPresentAndFieldWasTouched,
  getIsErrorPresentAndFieldWasTouched,
} from '@/lib/formikHelpers';
import { TImageCyclicalActivityFormValues } from '@/types';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import clsx from 'clsx';
import { FormikProps } from 'formik';
import { Fragment, useState } from 'react';
import ImageInputFormik from './ImageInputFormik';

type Props<T> = {
  name: string;
  label: string;
  formik: FormikProps<T>;
};

export default function ImagesUploadFormik<T>(props: Props<T>) {
  ////vars
  const { name, label, formik } = props;
  const [images, setImages] = useState<
    (TImageCyclicalActivityFormValues & { id: number | string })[]
  >([
    {
      id: 1,
      url: '1sdfvsdfv1',
      alt: '1iddgbfg1',
      additionInfoThatMustBeDisplayed: null,
    },
    {
      id: 2,
      url: '2sdfvsdfv2',
      alt: '2iddgbfg2',
      additionInfoThatMustBeDisplayed: 'sdfcdf',
    },
  ]);

  ////formik
  const error = getErrorForField<T>(formik, name);
  const isErrorPresentAndFieldWasTouched =
    getIsErrorPresentAndFieldWasTouched<T>(formik, name);
  const isErrorNotPresentAndFieldWasTouched =
    getIsErrorNOTPresentAndFieldWasTouched<T>(formik, name);

  const currentValue = formik.getFieldMeta(name).value as string;
  const onChangeForInput = formik.getFieldProps(name).onChange;
  const onBlurForInput = formik.getFieldProps(name).onBlur;

  function dragEndHander(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) {
      return;
    }

    if (active.id !== over.id) {
      setImages((elements) => {
        const activeIndex = elements.findIndex((el) => el.id === active.id);
        const overIndex = elements.findIndex((el) => el.id === over.id);

        return arrayMove(elements, activeIndex, overIndex);
      });
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
      <DndContext collisionDetection={closestCenter} onDragEnd={dragEndHander}>
        <SortableContext items={images} strategy={verticalListSortingStrategy}>
          <div className="mr-8 base-container-look">
            {images.map((image) => (
              <ImageInputFormik key={image.id} imageProps={image} />
            ))}
          </div>

          {/* <div className="p-4 bg-gray-400">inside</div>
          {isErrorPresentAndFieldWasTouched ? (
            <p className="mt-[4px] text-skin-error mb-0 font-base-regular">
              {error}
            </p>
          ) : null} */}
        </SortableContext>
      </DndContext>
    </Fragment>
  );
}
