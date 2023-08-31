import Image from 'next/image';
import { Fragment } from 'react';

export default function TestPageContent() {
  return (
    <Fragment>
      <div>test_page_for images</div>
      <div>
        <Image
          src={`${process.env.NEXT_PUBLIC_API_AND_IMAGES_URL}events_wyrostek_003.jpg`}
          width={1140}
          height={900}
          alt="some alt"
          className="object-cover object-center w-full h-full"
        />
      </div>
    </Fragment>
  );
}
