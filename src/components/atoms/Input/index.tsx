import clsx from 'clsx';
import { forwardRef, InputHTMLAttributes } from 'react';
import {
  InputStyle,
  InputColor,
  InputSize,
  variantStyle,
  variantSize,
  variantColor,
} from './utils';
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: InputStyle;
  color?: InputColor;
  size_variant?: InputSize;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, color, size_variant, type = 'text', ...rest }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={clsx(
          'outline-none w-full',
          variantStyle(variant),
          variantSize(size_variant),
          variantColor(color),
          className
        )}
        {...rest}
      />
    );
  }
);

Input.displayName = 'Input';
export default Input;
