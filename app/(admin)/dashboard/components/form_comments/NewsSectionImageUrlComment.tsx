import { Fragment } from 'react';

export default function NewsSectionImageUrlComment() {
  ////tsx
  return (
    <Fragment>
      <div className="prose z-60">
        <p>
          Obrazek w aktualnościach ma zawsze formę kwadratu. <br />
          Biała ramka, która tworzy z niego okrąg, jest dodawana automatycznie.
        </p>
        <p>
          Jeżeli podany obrazek nie będzie kwadratowy, to może finalnie być
          ściśnięty lub rozciągnięty w którejś z osi i przez to wyglądać
          nieatrakcyjnie.
        </p>
      </div>
    </Fragment>
  );
}
