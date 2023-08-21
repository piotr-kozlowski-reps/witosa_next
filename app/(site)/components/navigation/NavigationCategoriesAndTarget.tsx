'use client';

import { useAdjustContainerWIdthsAndMargins } from '@/hooks/useAdjustContainerWIdthsAndMargins';
import { ActivityType } from '@prisma/client';

interface Props {
  toggleCategory: (category: ActivityType) => void;
}

export default function NavigationCategoriesAndTarget(props: Props) {
  ////vars
  const { toggleCategory } = props;
  const containerProperClasses = useAdjustContainerWIdthsAndMargins();

  ////tsx
  return (
    <div className={containerProperClasses}>
      <div>Kategoria zajęć: </div>
      <div className="flex justify-start gap-4 mt-4">
        <button
          onClick={() => {
            throw new Error('Button wszytskie');
          }}
        >
          WSZYSTKIE
        </button>
        <button
          onClick={() => {
            toggleCategory('DANCE');
          }}
        >
          TANIEC
        </button>
        <button
          onClick={() => {
            toggleCategory('PLASTICITY');
          }}
        >
          PLASTYKA
        </button>
        <button
          onClick={() => {
            toggleCategory('MULTIMEDIA');
          }}
        >
          MULTIMEDIA
        </button>
        <button
          onClick={() => {
            toggleCategory('THEATER');
          }}
        >
          TEATR
        </button>
        <button
          onClick={() => {
            toggleCategory('MUSIC');
          }}
        >
          MUZYKA
        </button>
        <button
          onClick={() => {
            toggleCategory('EDUCATION');
          }}
        >
          EDUKACJA
        </button>
        <button
          onClick={() => {
            toggleCategory('RECREATION');
          }}
        >
          REKREACJA
        </button>
        <button
          onClick={() => {
            toggleCategory('OTHERS');
          }}
        >
          INNE
        </button>
      </div>

      <div className="mt-8">Dla kogo: </div>
      <div className="flex justify-start gap-4 mt-4">
        <button
          onClick={() => {
            throw new Error('Button wszytskie');
          }}
        >
          WSZYSTKIE
        </button>
        <button
          onClick={() => {
            throw new Error('Button wszytskie');
          }}
        >
          DLA DZIECI
        </button>
        <button
          onClick={() => {
            throw new Error('Button wszytskie');
          }}
        >
          DLA MŁODZIEŻY
        </button>
        <button
          onClick={() => {
            throw new Error('Button wszytskie');
          }}
        >
          DLA DOROSŁYCH
        </button>
        <button
          onClick={() => {
            throw new Error('Button wszytskie');
          }}
        >
          DLA SENIORÓW
        </button>
        <button
          onClick={() => {
            throw new Error('Button wszytskie');
          }}
        >
          DLA KOBIET
        </button>
      </div>
    </div>
  );
}
