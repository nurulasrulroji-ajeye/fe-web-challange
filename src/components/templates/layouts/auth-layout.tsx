import { FooterSplash, HeaderLogin, HeaderSplash, Logo } from '@/assets/imgs';
import { useUserAuth } from '@/libs/hooks';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useUserAuth();
  const router = useRouter();

  if (!isAuthenticated) {
    return (
      <main className="w-full h-screen">
        <div className="relative w-full grid grid-cols-3 justify-center items-center">
          <Image
            alt="header-login"
            src={HeaderLogin}
            height={500}
            width={500}
            sizes="500"
            className="w-36 md:invisible"
          />
          <div className="w-full flex justify-center">
            <Image
              alt="logo"
              src={Logo}
              height={500}
              width={500}
              sizes="500"
              className="w-24 md:hidden"
            />
          </div>
          <Image
            alt="header-login"
            src={HeaderSplash}
            height={500}
            width={500}
            sizes="500"
            className="hidden md:flex"
          />
        </div>
        <section className="absolute inset-0 flex justify-center items-center z-10">
          {children}
        </section>
        <div className="hidden md:flex absolute bottom-0">
          <Image alt="footer" src={FooterSplash} width={500} height={500} sizes="500" />
        </div>
      </main>
    );
  } else {
    router.replace('/');
  }
};
