import Image from 'next/image';
import { Fragment } from 'react';

export default function IsDateToBeHiddenInNewsSectionComment() {
  ////tsx
  return (
    <Fragment>
      <div className="prose z-60">
        <Image
          width={250}
          height={191}
          alt="Data w sekcji aktualności."
          src={`${process.env.NEXT_PUBLIC_BASE_URL}date_in_news_example.jpg`}
        />
        <p>
          Gdy pole jest <b>zaznaczone</b>:
          <br />
          data w dziale aktualności się nie pojawia. Opcja przydaje się w
          wiadomościach typu: &quot;Rozpoczynamy zapisy na zajęcia ...&quot;,
          &quot;Ruszają zajęcia ...&quot; itp. - gdzie nie ma określonej daty
          wydarzenia.
        </p>
        <p>
          Gdy pole jest <b>odznaczone</b>: <br /> data wydarzenia pojawi się
          aktualnościach.
        </p>
      </div>
    </Fragment>
  );
}
