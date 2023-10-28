import Image from 'next/image';

export default function KindOfEnterInfoComment() {
  return (
    <div className="prose">
      <p>
        Pole informujące o rodzaju płatności za wydarzenie lub wstępie wolnym.
      </p>
      <p>Pojawia się w szczegółowym opisie wydarzenia, w tym miejscu:</p>
      <Image
        width={250}
        height={188}
        alt="Rodzaj płatności - przykład."
        src={`${process.env.NEXT_PUBLIC_BASE_URL}kindofenter_example.jpg`}
      />
    </div>
  );
}
