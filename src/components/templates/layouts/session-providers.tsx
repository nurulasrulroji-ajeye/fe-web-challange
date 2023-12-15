import { SessionProvider } from 'next-auth/react';
import React, { FC } from 'react';

type SessionProvidersProps = {
  children: React.ReactNode;
};

const SessionProviders: FC<SessionProvidersProps> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default SessionProviders;
