import { Button, Input } from '@/components/atoms';
import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import { TbShoppingBagSearch } from 'react-icons/tb';
import { AiOutlineLogout } from 'react-icons/ai';
import Image from 'next/image';
import React, { useRef } from 'react';
import { useAppDispatch } from '@/redux/app/hooks';
import { setResetData } from '@/redux/features/products/slice';
import { useRouter } from 'next/router';

interface NavbarProps {
  data: Session | null;
}

export const Navbar = ({ data }: NavbarProps) => {
  const searchRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const queryId: string = router.query?.id as string;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (
        searchRef.current &&
        searchRef.current.value.length > 0 &&
        searchRef.current.value !== queryId
      ) {
        router.push(`/search/${searchRef.current.value}`);
        // dispatch(setResetData({ isSearch: true }));
      }
    }
  };
  return (
    <div className="fixed top-0 w-full z-50">
      <nav className="w-full max-w-4xl lg:mt-4 lg:rounded-full mx-auto py-3 items-center flex bg-white shadow-md justify-between gap-3 px-5">
        {/* <Image /> */}
        <div className="flex gap-2 items-center cursor-pointer">
          <div className="w-12 h-12 overflow-hidden shadow-md rounded-full relative">
            {data ? <Image alt="user" src={data.user.data.image} fill sizes="100vh" /> : null}
          </div>
          <div className="hidden md:flex flex-col">
            <p className="font-semibold">{data?.user.data.username}</p>
            <p className="text-sm leading-none">
              {data?.user.data.firstName} {data?.user.data.lastName}
            </p>
          </div>
        </div>
        <div className="relative">
          <Input
            variant="outline"
            ref={searchRef}
            size_variant="base"
            color="primary"
            placeholder="search..."
            className="md:max-w-xs pl-11 pr-4 "
            onKeyDown={handleKeyDown}
          />
          <div className="absolute inset-y-0 left-4 flex items-center text-2xl text-primary">
            <TbShoppingBagSearch />
          </div>
        </div>
        <Button variant="primary" className="!p-0" onClick={() => signOut()}>
          <div className="p-2 text-2xl">
            <AiOutlineLogout />
          </div>
        </Button>
      </nav>
    </div>
  );
};
