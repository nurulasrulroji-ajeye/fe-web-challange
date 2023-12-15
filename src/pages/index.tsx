import { useUserAuth } from '@/libs/hooks';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function IndexPage() {
  const router = useRouter();
  const { session } = useUserAuth();

  useEffect(() => {
    if (!session) {
      router.replace('/auth/login');
    } else {
      router.push('/dashboard');
    }
  }, [router, session]);
  return null;
}
