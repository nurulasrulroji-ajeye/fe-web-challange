import clsx from 'clsx';
import { forwardRef, InputHTMLAttributes } from 'react';

const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type = 'text', ...rest }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={clsx(
          'outline-none border-b border-black w-full py-0.5 placeholder:text-sm',
          className
        )}
        {...rest}
      />
    );
  }
);

Input.displayName = 'Input';
export default Input;
