import { Button } from '@/components/atoms';
import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';

interface NavbarProps {
  data: Session | null;
}

export const Navbar = ({ data }: NavbarProps) => {
  return (
    <div className="fixed top-0 w-full z-50">
      <nav className="w-full max-w-4xl lg:mt-4 lg:rounded-full mx-auto py-3 items-center flex bg-white shadow-md justify-between px-5">
        {/* <Image /> */}
        <div className="flex gap-2 items-center cursor-pointer">
          <div className="w-12 h-12 overflow-hidden shadow-md rounded-full relative">
            {data ? <Image alt="user" src={data.user.data.image} fill sizes="100vh" /> : null}
          </div>
          <div>
            <p className="font-semibold">{data?.user.data.username}</p>
            <p className="text-sm leading-none">
              {data?.user.data.firstName} {data?.user.data.lastName}
            </p>
          </div>
        </div>
        <Button variant="primary" onClick={() => signOut()}>
          Logout
        </Button>
      </nav>
    </div>
  );
};
