export type SizeVariant = "sm" | "base" | "lg" | "xl";
export type ColorVariant = "primary" | "secondary" | "white" | "black";
export type LoadingProps = {
  size?: SizeVariant;
  color?: ColorVariant;
};

export const sizeVariant = (size?: SizeVariant) => {
  switch (size) {
    case "xl": {
      return "w-16 h-16";
    }
    case "lg": {
      return "w-12 h-12";
    }
    case "base": {
      return "w-3 h-3";
    }
    case "sm": {
      return "w-2 h-2";
    }
    default: {
      return "w-3 h-3";
    }
  }
};
export const colorVariant = (color?: ColorVariant) => {
  switch (color) {
    case "primary": {
      return "bg-primary";
    }
    case "secondary": {
      return "bg-secondary";
    }
    case "white": {
      return "bg-white";
    }
    case "black": {
      return "bg-black";
    }
    default: {
      return "bg-primary";
    }
  }
};
