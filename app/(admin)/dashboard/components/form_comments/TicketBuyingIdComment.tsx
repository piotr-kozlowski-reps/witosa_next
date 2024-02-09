import Image from 'next/image';

export default function TicketBuyingIdComment() {
  return (
    <div className="prose">
      <p>
        W tym polu należy podać id wydarzenia wcześniej wpisanego w systemie
        biletowym.
      </p>
      <p>Id znajduje się w tym miejscu:</p>
      <Image
        src={`${process.env.NEXT_PUBLIC_BASE_URL}event_id_finder.jpg`}
        alt="Gdzie znaleźć ID wydarzenia."
        width={400}
        height={289}
      />
    </div>
  );
}
