import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function useRedirectWhenUserIsUnauthenticated(path: string) {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === 'unauthenticated') {
      router.push(path);
    }
  }, [router, session, path]);
}
