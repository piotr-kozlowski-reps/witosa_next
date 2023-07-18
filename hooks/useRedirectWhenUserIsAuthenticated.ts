import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function useRedirectWhenUserIsAuthenticated(path: string) {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === 'authenticated') {
      router.push(path);
    }
  }, [router, session, path]);
}
