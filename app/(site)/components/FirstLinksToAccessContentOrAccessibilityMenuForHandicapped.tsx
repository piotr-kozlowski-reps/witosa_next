import { useNavigationState } from '@/context/navigationState';
import { Fragment, useEffect, useState } from 'react';

export default function FirstLinksToAccessContentOrAccessibilityMenuForHandicapped() {
  const { setIsAccessibilitySubmenuVisible_ToTrue } = useNavigationState();
  const [isToJumpToAccesibilityMenu, setIsToJumpToAccessibilityMenu] =
    useState(false);

  const gotoAccessibilityTools = () => {
    setIsAccessibilitySubmenuVisible_ToTrue();
    setIsToJumpToAccessibilityMenu(true);
  };

  let timer: ReturnType<typeof setTimeout>;
  const jumpToAccessibilityId = () => {
    timer = setTimeout(() => {
      //timeout to let finish the animation of showing menu
      window.location.replace('#accessibility_navigation');
    }, 400);
  };

  useEffect(() => {
    if (isToJumpToAccesibilityMenu) {
      jumpToAccessibilityId();
    }
    return () => {
      clearTimeout(timer);
    };
  }, [isToJumpToAccesibilityMenu]);

  ////tsx
  return (
    <Fragment>
      <a href="#main_content" className="skip-link">
        Przejdź do treści
      </a>
      <button className="skip-link" onClick={gotoAccessibilityTools}>
        Przejdź do narzędzi ułatwiających dostępność treści
      </button>
    </Fragment>
  );
}
