'use client';

import { useLayoutState } from '@/globalState/layoutState';

export default function Test() {
  ////vars
  const layoutState = useLayoutState();

  ////logic
  function clickHandler() {
    layoutState.toggleLayoutState();
  }

  ////tsx
  return (
    <div
      className="w-32 p-3 my-4 rounded-lg cursor-pointer bg-skin-button-accent hover:bg-skin-button-accent-hover text-skin-inverted"
      onClick={clickHandler}
    >
      zmien kolor główny
    </div>
  );
}
