import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { NextPage } from 'next';
import { Session } from 'next-auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useUserAuth } from '@/libs/hooks';
import { Toaster } from 'react-hot-toast';
import { MainLayout } from '@/components/templates';
import { Provider } from 'react-redux';
import { store } from '@/redux/app/store';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout<P> = AppProps<P> & {
  Component: NextPageWithLayout;
};

type AppPropsGenericParams = {
  session: Session;
};

export function RootLayout({ children }: { children: React.ReactNode }) {
  return <MainLayout>{children}</MainLayout>;
}

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout<AppPropsGenericParams>) {
  const getLayout = Component.getLayout ?? ((page) => <RootLayout>{page}</RootLayout>);
  return (
    <SessionProvider session={session}>
      <title>Infosys Dashboard</title>
      <Provider store={store}>{getLayout(<Component {...pageProps} />)}</Provider>
      <RefreshSessionHandler />
      <Toaster />
    </SessionProvider>
  );
}

function RefreshSessionHandler() {
  const router = useRouter();
  const { session } = useUserAuth();

  useEffect(() => {
    console.log('session', session);

    if (session === null) {
      if (router.route !== '/auth/login') {
        router.replace('/auth/login');
      }
    }
  }, [router, session]);

  return null;
}
