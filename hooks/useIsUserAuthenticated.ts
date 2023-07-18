import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export function useIsUserAuthenticated() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const session = useSession();

  useEffect(() => {
    if (session.status === 'unauthenticated') {
      setIsAuthenticated(false);
    }
  }, [session]);

  return isAuthenticated;
}
