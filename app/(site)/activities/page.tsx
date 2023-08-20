'use client';

import { useAdjustContainerWIdthsAndMargins } from '@/hooks/useAdjustContainerWIdthsAndMargins';
import CustomButton from '../components/CustomButton';

export default function ActivitiesPage() {
  ////vars
  const containerProperClasses = useAdjustContainerWIdthsAndMargins();

  return (
    <section className={containerProperClasses}>
      <div>Kategoria zajęć: </div>
      <div className="flex justify-start mt-4 gap-4">
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
          TANIEC
        </button>
        <button
          onClick={() => {
            throw new Error('Button wszytskie');
          }}
        >
          PLASTYKA
        </button>
        <button
          onClick={() => {
            throw new Error('Button wszytskie');
          }}
        >
          MULTIMEDIA
        </button>
        <button
          onClick={() => {
            throw new Error('Button wszytskie');
          }}
        >
          TEATR
        </button>
        <button
          onClick={() => {
            throw new Error('Button wszytskie');
          }}
        >
          MUZYKA
        </button>
        <button
          onClick={() => {
            throw new Error('Button wszytskie');
          }}
        >
          EDUKACJA
        </button>
        <button
          onClick={() => {
            throw new Error('Button wszytskie');
          }}
        >
          REKREACJA
        </button>
        <button
          onClick={() => {
            throw new Error('Button wszytskie');
          }}
        >
          INNE
        </button>
      </div>

      <div className="mt-8">Dla kogo: </div>
      <div className="flex justify-start mt-4 gap-4">
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

      <div className="mt-8">
        <CustomButton
          text="ZAPISY NA ZAJĘCIA"
          descriptionText="Zapisy na zajęcia."
          disabled={false}
        />
      </div>
    </section>
  );
}
