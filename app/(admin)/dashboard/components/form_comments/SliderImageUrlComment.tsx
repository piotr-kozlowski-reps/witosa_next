import { Fragment } from 'react';

export default function SliderImageUrlComment() {
  ////tsx
  return (
    <Fragment>
      <div className="prose z-60">
        <p>
          Obrazek slajdera ma taką samą formę jak obrazki z opisu szczegółowego.
        </p>
        <p>
          Jeżeli chcesz do slajdera wykorzystać obrazek, który już podałeś w
          sekcji &quot;szczegóły/zdjęcia&quot; - naciśnij przycisk &quot;pobierz
          obrazek z sekcji szczegóły/zdjęcia&quot; i wybierz obrazek, który Cię
          interesuje.
          <br />
          Dane zostaną skopiowane.
        </p>
      </div>
    </Fragment>
  );
}
