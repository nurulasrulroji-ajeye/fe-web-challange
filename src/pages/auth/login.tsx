import { useState } from 'react';
import { Logo } from '@/assets/imgs';
import { Button, Input } from '@/components/atoms';
import { AuthLayout } from '@/components/templates';
import Image from 'next/image';
import { SignInResponse, getCsrfToken, signIn } from 'next-auth/react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { NextPageWithLayout } from '../_app';
import { PiEyeClosedDuotone, PiEyeDuotone } from 'react-icons/pi';

type LoginPageProps = NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>>;

const LoginPage: LoginPageProps = ({ csrfToken }) => {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  const [wait, setWait] = useState(false);
  const [err, setErr] = useState(false);
  const [input, setInput] = useState<{
    username: string;
    password: string;
  }>({
    username: '',
    password: '',
  });

  const onLogin = async () => {
    if (input.username === '' || input.password === '') return setErr(true);
    setWait(true);
    try {
      setErr(false);
      const response = (await signIn('credentials', {
        redirect: false,
        username: input.username,
        password: input.password,
      })) as SignInResponse;

      if (!response.ok) {
        toast.error(response.error);
      } else {
        router.replace('/');
        toast.success('yeeay!, login successfully');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setWait(false);
    }
  };
  return (
    <AuthLayout>
      <div className="w-full px-5 max-w-md">
        <div className="w-full flex flex-col gap-10 md:shadow-md rounded-lg md:px-5 md:py-8 bg-white">
          <div className="relative w-full justify-center hidden md:flex">
            <Image alt="logooo" src={Logo} sizes="500" width={500} height={500} className="w-32" />
          </div>
          <div>
            <h3 className="text-2xl font-bold">Login</h3>
            <p className="w-full">Please sign in to continue</p>
          </div>
          <div className="flex flex-col gap-8">
            <div className="w-full flex flex-col gap-1">
              <label htmlFor="user-id">User ID</label>
              <Input
                id="user-id"
                type="text"
                placeholder="User ID"
                value={input.username}
                onChange={(e) => setInput({ ...input, username: e.target.value })}
              />
              {err && input.username === '' ? (
                <p className="text-xs font-semibold text-red-500">Please fill your username </p>
              ) : null}
            </div>
            <div className="w-full flex flex-col gap-1">
              <label htmlFor="password">Password</label>
              <div className="w-full relative">
                <Input
                  id="password"
                  type={showPass ? 'text' : 'password'}
                  placeholder="Password"
                  value={input.password}
                  onChange={(e) => setInput({ ...input, password: e.target.value })}
                />
                <button
                  onClick={() => setShowPass(!showPass)}
                  className="text-primary absolute right-0 inset-y-0 flex items-center"
                >
                  {showPass ? <PiEyeDuotone /> : <PiEyeClosedDuotone />}
                </button>
              </div>
              {err && input.password === '' ? (
                <p className="text-xs font-semibold text-red-500">Please fill your password </p>
              ) : null}
            </div>
            <input type="hidden" name="csrfToken" defaultValue={csrfToken || ''} />
          </div>
          <div className="w-full flex justify-end">
            <Button onClick={onLogin} variant="primary" className="px-10" disabled={wait}>
              {wait ? 'Loading...' : 'LOGIN'}
            </Button>
          </div>
          <div className="absolute bottom-8 inset-x-0 md:static">
            <p className="text-center text-sm text-slate-600">
              Don{"'"}t have an account?{' '}
              <span className="font-semibold text-secondary cursor-pointer hover:text-secondary/80">
                Sign Up
              </span>
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      csrfToken: (await getCsrfToken(context)) ? await getCsrfToken(context) : null,
    },
  };
}

export default LoginPage;
