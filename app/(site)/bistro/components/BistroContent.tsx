import { TSliderGroupImage } from '@/types';
import { Fragment } from 'react';
import SliderGroups from '../../components/slider_groups/SliderGroups';

export default function BistroContent() {
  ////vars
  const sliderImages: TSliderGroupImage[] = [
    {
      url: 'artcafe_001.jpg',
      alt: 'Filiżanka kawy oraz napis - Coffee Time jest zawsze.',
      additionInfoThatMustBeDisplayed: null,
    },
    {
      url: 'artcafe_002.jpg',
      alt: 'Zdjęcie wnętrza Art Cafe.',
      additionInfoThatMustBeDisplayed: null,
    },
    {
      url: 'artcafe_003.jpg',
      alt: 'Zdjęcie wnętrza Art Cafe.',
      additionInfoThatMustBeDisplayed: null,
    },
    {
      url: 'artcafe_004.jpg',
      alt: 'Zbliżenie huśtawki w Art Cafe.',
      additionInfoThatMustBeDisplayed: null,
    },
    {
      url: 'artcafe_005.jpg',
      alt: 'Sofa i huśtawki w Art Cafe.',
      additionInfoThatMustBeDisplayed: null,
    },
  ];

  ////tsx
  return (
    <Fragment>
      <div>
        <SliderGroups sliderImages={sliderImages} />
        <div className="relative proper-container-classes">
          <div className="absolute right-0">
            <span className="font-sm-normal">
              foto: Anna Laskowska, http://www.dekorialove.pl
            </span>
          </div>
        </div>
      </div>
      <div className="proper-container-classes">
        <div className="max-w-full prose">
          <h1 className="mt-[57px]">Art Cafe</h1>
          <p>
            <b>Art Cafe </b>
            to kawiarnia mieszcząca się przy ul. Wincentego Witosa 6 w Knurowie,
            w nowo otwartym miejscu, należącym do knurowskiego Centrum Kultury.
          </p>
          <p>
            Naszą ideą jest „uczynienie dnia przyjemniejszym” dzięki pozytywnej
            energii, miłej obsłudze i dbałości o miłe detale w wystroju naszego
            wnętrza (neon z najlepszym przesłaniem &quot;TODAY IS A GOOD
            DAY&quot;, zawieszonym nad &quot;huśtawkowym kącikiem&quot;).
          </p>
          <p>
            Oczywiście miłej atmosferze towarzyszy bardzo dobra, świeżo palona
            kawa z gliwickiej palarni KAFAR (
            <a
              href="https://palarniakafar.pl/o-nas/"
              target="_blank"
              rel="noopener noreferrer"
            >
              palarniakafar.pl/o-nas/
            </a>
            ) oraz pyszne, w artystycznej formie podane wypieki z Pracowni Smaku
            ORSO (
            <a
              href="https://restauracjaorso.pl/o-nas/"
              target="_blank"
              rel="noopener noreferrer"
            >
              restauracjaorso.pl/o-nas/
            </a>
            ).
          </p>
          <p>
            Znajdziesz u nas zawsze ciekawe czasopisma i książki (bo przecież
            możesz wpaść do nas solo!!!) oraz gry (mniej lub bardziej tradycyjne
            planszówki) na wypadek, gdyby Twoje grono towarzyszy poczuło silną
            potrzebę współzawodnictwa!
          </p>
          <p>
            Na początek będziesz mógł u nas spędzić czas przy napojach i
            deserach podanych poniżej w menu, ale ponieważ naszą potrzebą jest
            ROZWÓJ (będący literką &quot;R&quot; w naszej nazwie), to zamierzamy
            Was co jakiś czas zaskoczyć piękną, smaczną i miłą nowością. W tym
            momencie zachęcamy Was do śledzenia naszych mediów
            społecznościowych, gdzie będziemy te nowinki prezentować i
            jednocześnie informować Was o wszelkich zmianach i innowacjach
            dotyczących naszej działalności.
          </p>
          <br />
          <p>
            <b>DO ZOBACZENIA!!!</b>
          </p>
        </div>
      </div>
    </Fragment>
  );
}
