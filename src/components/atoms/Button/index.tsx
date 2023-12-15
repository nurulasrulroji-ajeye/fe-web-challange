import clsx from 'clsx';
import { ButtonHTMLAttributes, forwardRef } from 'react';

export type ButtonVariants = 'primary' | 'secondary';
type ButtonSizes = 'sm' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariants;
  size?: ButtonSizes;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, variant, size, ...rest }, ref) => {
    const baseStyles = 'inline-flex leading-normal rounded-full font-medium';
    const disabledStyles = 'disabled:cursor-not-allowed disabled:opacity-50';

    const variantStyles = (variantStyle?: ButtonVariants) => {
      switch (variantStyle) {
        case 'primary': {
          return 'btn-primary';
        }
        case 'secondary': {
          return 'btn-secondary';
        }
        default: {
          return 'bg-white focus:ring-primary-light text-primary';
        }
      }
    };

    const sizeStyles = (sizeStyle?: ButtonSizes) => {
      switch (sizeStyle) {
        case 'sm': {
          return 'text-sm py-1 px-8';
        }
        case 'lg': {
          return 'text-lg py-3 px-8';
        }
        default: {
          return 'text-base py-3 px-8 text-sm';
        }
      }
    };

    return (
      <button
        ref={ref}
        className={clsx(
          baseStyles,
          disabledStyles,
          variantStyles(variant),
          sizeStyles(size),
          className
        )}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
