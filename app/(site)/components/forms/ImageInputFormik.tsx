import { TImageCyclicalActivityFormValues } from '@/types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type Props = {
  imageProps: TImageCyclicalActivityFormValues & { id: number | string };
};

export default function ImageInputFormik(props: Props) {
  ////vars
  const { imageProps } = props;
  const { url } = imageProps;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: imageProps.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="mx-8 mb-4 base-container-look"
    >
      <div className="">{url}</div>
    </div>
  );
}
