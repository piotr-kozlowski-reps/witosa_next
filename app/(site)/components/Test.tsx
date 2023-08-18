'use client';

import { Fragment } from 'react';

export default function Test() {
  ////vars
  // const _layoutState = useLayoutState();

  ////logic
  function highContrastButtonHandler() {
    // layoutState.toggleLayoutState();
  }
  function fontSizeButtonHandler() {
    // layoutState.toggleFontSize();
    // layoutState.toggleLayoutState();
  }

  ////tsx
  return (
    <Fragment>
      <button
        className="w-32 p-3 my-4 rounded-lg cursor-pointer bg-skin-button-accent hover:bg-skin-button-accent-hover text-skin-inverted"
        onClick={highContrastButtonHandler}
      >
        high contrast button
      </button>
      <button
        className="w-32 p-3 m-4 rounded-lg cursor-pointer bg-skin-button-accent hover:bg-skin-button-accent-hover text-skin-inverted"
        onClick={fontSizeButtonHandler}
      >
        font size button
      </button>
    </Fragment>
  );
}
