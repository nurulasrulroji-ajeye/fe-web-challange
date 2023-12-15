import { Navbar } from '@/components/organisms';
import { useUserAuth } from '@/libs/hooks';
import React from 'react';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { status, session, isAuthenticated } = useUserAuth();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  return (
    <div className="w-full min-h-screen">
      {isAuthenticated ? <Navbar data={session} /> : null}
      <div>{children}</div>
    </div>
  );
};

export default MainLayout;
