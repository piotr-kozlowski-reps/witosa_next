'use client';

import { useNavigationState } from '@/context/navigationState';
import NewsInside from './NewsInside';

export default function NewsMain() {
  ////vars
  const { getCurrentDevice } = useNavigationState();
  ////tsx
  return <NewsInside getCurrentDevice={getCurrentDevice} />;
}
