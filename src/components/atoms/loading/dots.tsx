import React from 'react';
import { LoadingProps, colorVariant, sizeVariant } from './utils';
import clsx from 'clsx';

export const Dots = ({ color, size }: LoadingProps) => {
  return (
    <div className="flex space-x-2 justify-center items-center">
      <div
        className={clsx(
          'rounded-full bg-primary animate-bounce [animation-delay:-0.3s]',
          sizeVariant(size),
          colorVariant(color)
        )}
      />
      <div
        className={clsx(
          'rounded-full bg-primary animate-bounce [animation-delay:-0.15s]',
          sizeVariant(size),
          colorVariant(color)
        )}
      />
      <div
        className={clsx(
          'rounded-full bg-primary animate-bounce',
          sizeVariant(size),
          colorVariant(color)
        )}
      />
    </div>
  );
};
