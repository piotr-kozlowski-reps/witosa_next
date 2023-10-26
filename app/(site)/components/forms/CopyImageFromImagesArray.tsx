import CopyImageFromImagesArrayComment from '@/app/(admin)/dashboard/components/form_comments/CopyImageFromImagesArrayComment';
import { useModalState } from '@/context/modalState';
import { useCheckIfImagesHaveAllDesiredValues } from '@/hooks/useCheckIfImagesHaveAllDesiredValues';
import { FormikProps } from 'formik';
import CustomButton from '../CustomButton';
import CommentPopup from '../comment-popus/CommentPopup';
import ModalCopyImageFromImagesArray from '../modal/ModalCopyImageFromImagesArray';

type Props<T> = {
  formik: FormikProps<T>;
};

export default function CopyImageFromImagesArray<T>(props: Props<T>) {
  ////vars
  const { formik } = props;
  const { setShowModal } = useModalState();
  const isEnabled = useCheckIfImagesHaveAllDesiredValues<T>(formik);

  ////tsx
  return (
    <div className="relative flex items-center justify-center">
      <CustomButton
        text="pobierz
          obrazek z sekcji szczegóły/zdjęcia"
        descriptionText="pobierz
          obrazek z sekcji szczegóły/zdjęcia"
        additionalClasses="mt-[4px]"
        disabled={!isEnabled}
        outlined={true}
        actionFn={() => {
          setShowModal(
            true,
            <ModalCopyImageFromImagesArray<T> formik={formik} />
          );
        }}
      />
      <div className="px-2">
        <CommentPopup
          size="EXTRA_SMALL"
          alt={`${name} - komentarz.`}
          commentContent={<CopyImageFromImagesArrayComment />}
        />
      </div>
    </div>
  );
}
