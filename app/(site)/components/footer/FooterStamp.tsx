import { Fragment } from 'react';

export default function FooterStamp() {
  //TODO: dołożyć coś jeszcze w stopce? firma?

  ////tsx
  return (
    <Fragment>
      <div className="bg-skin-gray w-full h-[1px]"></div>
      <div className="flex items-center justify-center h-10 px-8 font-sm-normal bg-skin-fill text-skin-base">
        &copy; 2023 ART CK Knurów
      </div>
    </Fragment>
  );
}
