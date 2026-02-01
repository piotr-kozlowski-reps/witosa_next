'use client';
import React from 'react';
import FooterMain from '../../components/footer/FooterMain';
import { useArtisticGroupsStore } from '@/context/artisticGroupsStore';
import SliderGroupsInfo from '../../components/slider_groups/SliderGroupsInfo';

type Props = {
  title: string;
};

export default function GroupContentInfo(props: Props) {
  ////vars
  const { title } = props;
  const getArtisticGroup = useArtisticGroupsStore((s) => s.getArtisticGroup);
  const artisticGroup = getArtisticGroup(title);

  return (
    <main>
      {!artisticGroup || !artisticGroup.isToBePublished ? (
        <div className="mt-12 proper-container-classes">
          <div className="max-w-full prose">
            <h1 className="text-error">W aplikacji pojawił sie problem:</h1>
            {/* <h2 className="-mt-[18px]">{'Coś poszło nie tak'}</h2> */}
          </div>
          <div className="mt-4">
            Nie znaleziono grupy artystycznej o nazwie:{' '}
            <span className="font-bold">{title}</span>. <br />
            Spróbuj wybrać inną grupę z menu nawigacyjnego.
          </div>
        </div>
      ) : null}

      {artisticGroup && artisticGroup.isToBePublished ? (
        <div className="proper-container-classes bg-skin-main-bg drop-shadow-none slider-break-point:drop-shadow-big rounded-base">
          <div className="flex flex-col items-start justify-start gap-6 slider-break-point:flex-row">
            <div className="slider-break-point:h-[638px] slider-break-point:w-[453px] w-full">
              <SliderGroupsInfo sliderImages={artisticGroup?.images} />
            </div>

            <div className="flex-1 prose">
              <div className="w-full pr-2 prose">
                <h1 className="mt-[57px]">{artisticGroup.title}</h1>
                <div className="mt-8">{artisticGroup.detailedDescription}</div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <FooterMain />
    </main>
  );
}
