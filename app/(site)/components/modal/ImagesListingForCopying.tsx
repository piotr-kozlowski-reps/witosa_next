import { useGetSrcAndAltFromFileDataDependingIfItIsAStringOrFile } from '@/hooks/useGetSrcAndAltFromFileDataDependingIfItIsAStringOrFile';
import { TFileWithPreview } from '@/types';
import { motion } from 'framer-motion';
import Image from 'next/image';

type Props = {
  image: string | TFileWithPreview;
  altProvided: string;
  index: number;
  actionFn: (index: number) => void;
};

export default function ImagesListingForCopying(props: Props) {
  ////vars

  const { image, altProvided, actionFn, index } = props;
  const { src, alt } =
    useGetSrcAndAltFromFileDataDependingIfItIsAStringOrFile(image);

  return (
    <motion.button
      className="flex items-center justify-start w-full gap-4 mb-4 base-container-look hover:bg-cta-secondary-opacity"
      type="button"
      onClick={() => actionFn(index)}
      whileHover={{ scale: 1.01 }}
    >
      <div className="w-16 h-16 ml-8">
        <Image
          src={src}
          width={64}
          height={64}
          alt={altProvided ? altProvided : alt}
          className="object-fill w-16 h-16"
        />
      </div>
      {altProvided ? altProvided : alt}
    </motion.button>
  );
}
