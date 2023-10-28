import { Fragment } from 'react';

export default function IsToBeInNewsSectionComment() {
  ////tsx
  return (
    <Fragment>
      <div className="prose">
        <p>
          Gdy pole jest <b>zaznaczone</b>:
          <br />
          wydarzenie pojawi się w aktualnościach.
        </p>
        <p>
          Gdy pole jest <b>odznaczone</b>: <br /> wydarzenie nie pojawi się w
          aktualnościach.
        </p>
      </div>
    </Fragment>
  );
}
