import SliderGroups from '@/app/(site)/components/slider_groups/SliderGroups';
import { TSliderGroupImage } from '@/types';
import { Fragment } from 'react';

export default function AboutContent() {
  ////vars
  const sliderImages: TSliderGroupImage[] = [
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
      <div className="relative">
        <SliderGroups sliderImages={sliderImages} />
        {/* <div className="absolute right-0">
            <span className="font-sm-normal">
              fotografie autorstwa Anny Laskowskiej, http://www.dekorialove.pl
            </span>
          </div> */}
      </div>
      {/* //TODO: here */}
      <div className="proper-container-classes">
        <div className="max-w-full prose">
          <h1 className="mt-[57px]">O nas</h1>
          <p>
            <b>Art CK </b>
            to miejsce, które zostało stworzone z myślą nie tylko o pasjonatach
            szeroko pojętej kultury i sztuki, ale o wszystkich, którzy marzą o
            swobodnym spędzaniu czasu w przyjaznej, pełnej ciepła atmosferze.
          </p>
          <p>
            Pragniemy, by nasze miasto stało się centrum artystycznych przeżyć i
            niezapomnianych doświadczeń. ART CK to przestrzeń, w której kultura
            ma wymiar niecodzienny - odbiór wielu dziedzin sztuki przenika się z
            zapachem świeżo parzonej kawy najwyższej jakości.
          </p>
          <p>
            Piękne i nowoczesne wnętrza pozwalają na spędzanie czasu w cieszącej
            ciało i duszę atmosferze, dopełnianej przez otwartych i zawsze
            gotowych do pomocy pracowników.
          </p>
          <p>
            Tym, co wyróżnia nową przestrzeń Centrum Kultury w Knurowie, jest
            przede wszystkim wielofunkcjonalność. Znajdziecie tutaj zarówno
            przestronną salę taneczną, pozwalającą uwolnić swoje twórcze
            pragnienia, jak i kawiarniany zakątek, gdzie w wygodnym, stylowym
            fotelu słuchać będzie można sączącej się muzyki.
          </p>
          <p>
            Sala plastyczna stworzona została z myślą o kreatywnym rozwijaniu
            zainteresowań osób w każdym wieku, a serwowane w Art Cafe pyszności
            towarzyszyć będą tym twórczym działaniom, uszczęśliwiając nie tylko
            ducha, ale i ciało!
          </p>
          <p>
            Na naszą kameralną scenę zapraszać będziemy fantastycznych i
            utalentowanych artystów muzycznych, teatralnych, literackich, a
            przestrzeń wystawowa pozwoli nam na prezentację sztuki ciekawych
            twórców.
          </p>
          <p>
            Chcemy tworzyć miejsce, które podąża za nowymi trendami we
            współczesnej kulturze oraz reaguje na potrzeby mieszkańców.
          </p>
          <p>
            Jesteśmy dumni, że będziecie tu razem z nami. Tylko przenikająca się
            wspólna, dobra energia pozwala na tworzenie miejsc z pasją.
            Zapewniamy Was, że dołożymy wszelkich starań, abyście zawsze czuli
            się w naszej przestrzeni gośćmi, na których gospodarz czeka z
            niecierpliwością i utęsknieniem!
          </p>
          <br />
          <p>
            <b>Zapraszamy!</b>
          </p>
        </div>
      </div>
    </Fragment>
  );
}
