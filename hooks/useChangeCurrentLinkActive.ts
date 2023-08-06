import { TLink } from '@/types';
import {
  ImmutableArray,
  ImmutableObject,
  SetStateAction,
} from '@hookstate/core';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export function useChangeCurrentLinkActive(
  links: readonly ImmutableObject<ImmutableObject<TLink>>[],
  setMethodPointer: (newValue: SetStateAction<ImmutableArray<TLink>>) => void
) {
  const currentPath = usePathname();

  useEffect(() => {
    const linksWithActiveLinkSetToTrueAccordingToCurrentPath: TLink[] = links
      .map((link) => link)
      .map((link) => {
        return {
          ...link,
          isCurrentlyUsed: link.path === currentPath ? true : false,
        };
      });

    setMethodPointer(linksWithActiveLinkSetToTrueAccordingToCurrentPath);
  }, [currentPath]);
}
