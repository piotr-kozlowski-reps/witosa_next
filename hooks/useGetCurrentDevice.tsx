import { useNavigationState } from '@/context/navigationState';
import { useEffect } from 'react';

export function useGetCurrentDevice() {
  const { setCurrentDevice } = useNavigationState();
  const handleWindowResize = () => {
    if (window.innerWidth <= 520) {
      setCurrentDevice('MOBILE');
    }
    if (window.innerWidth > 520 && window.innerWidth < 1280) {
      setCurrentDevice('TABLET');
    }
    if (window.innerWidth >= 1280) {
      setCurrentDevice('DESKTOP');
    }
  };

  useEffect(() => {
    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);

    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);
}
