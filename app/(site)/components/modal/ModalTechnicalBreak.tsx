'use client';

import { Fragment } from 'react';
import ModalTitle from './ModalTitle';

export default function ModalTechnicalBreak() {
  ////tsx
  return (
    <Fragment>
      <div className="fixed z-40 w-full top-[128px] right-0 left-0 bg-skin-main-bg drop-shadow-big pt-[25px] pb-[32px] ">
        <div className="proper-container-classes">
          <div className="max-w-full prose">
            <ModalTitle text="Przerwa techniczna" />
            <div>
              <p>
                Trwają prace konserwacyjne, strona niedługo znów będzie
                dostępna.
              </p>

              <p>
                Pozdrawiamy,
                <br />
                Zespół Art CK
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed top-0 bottom-0 left-0 right-0 z-30 w-screen h-screen overlay opacity-90 overflow-clip"></div>
    </Fragment>
  );
}
