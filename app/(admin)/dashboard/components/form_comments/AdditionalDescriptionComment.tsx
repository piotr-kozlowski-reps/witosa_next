import Image from 'next/image';

export default function AdditionalDescriptionComment() {
  return (
    <div className="prose">
      <p>
        To opcjonalny opis, który z jakiegoś powodu musi się pojawić na obrazku.
        Przykładem może być informacja, kto wykonał zdjęcie ... itp.
      </p>
      <p>Opis pojawi się w tym miejscu:</p>
      <Image
        src={`${process.env.NEXT_PUBLIC_BASE_URL}foto_description_example.jpg`}
        alt="Foto przykład opisu"
        width={250}
        height={188}
      />
    </div>
  );
}
