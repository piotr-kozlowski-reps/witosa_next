import { Fragment } from 'react';

export default function IsToBeOnlyInNewsSectionComment() {
  ////tsx
  return (
    <Fragment>
      <div className="prose">
        <p>
          Gdy pole jest <b>zaznaczone</b>:
          <br />
          wydarzenie pojawi się w tylko w aktualnościach.
          <br />
          Nie będzie możliwości wprowadzenia pozostałych danych dla szczegółów
          wydarzenia. Ma to rację bytu dla wydarzeń typu: &quot;Zamknięcie
          ArtCafe z powodu jakiegoś wydarzenia&quot;, &quot;Informacja o awarii
          / odwołaniu ...&quot; itp.
        </p>
        <p>
          Gdy pole jest <b>odznaczone</b>: <br />
          wydarzenie będzie się pojawiało także w innych, wybranych przez Ciebie
          działach.
        </p>
      </div>
    </Fragment>
  );
}
