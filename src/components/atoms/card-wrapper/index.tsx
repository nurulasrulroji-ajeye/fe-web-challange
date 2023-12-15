import clsx from 'clsx';

type CardWrapperProps = {
  children: React.ReactNode;
  className?: string;
};

export const CardWrapper = ({ children, className }: CardWrapperProps) => {
  return <div className={clsx('shadow-md rounded-lg w-full max-w-lg', className)}>{children}</div>;
};
