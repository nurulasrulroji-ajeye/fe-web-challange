export type InputStyle = 'line' | 'outline';
export type InputColor = 'primary' | 'secondary' | 'black' | 'white';
export type InputSize = 'sm' | 'base' | 'lg';

export const variantStyle = (variant?: InputStyle) => {
    switch (variant) {
        case "line":
            return /*tw*/ "border-b";
        case "outline":
            return /*tw*/ "border rounded-full shadow-md focus:shadow-lg transition-all ease-in-out duration-500";
        default: {
            return undefined
        }
    }
}

export const variantSize = (size?: InputSize) => {
    switch (size) {
        case "sm":
            return /*tw*/  "py-1.5 text-sm placeholder:text-sm";
        case "base":
            return /*tw*/  "py-2 text-base leading-relaxed px-3";
        case "lg":
            return /*tw*/  "py-3 px-4";
        default: {
            return undefined
        }
    }
}
export const variantColor = (color?: InputColor) => {
    switch (color) {
        case "primary":
            return /*tw*/  "border-primary";
        case "secondary":
            return /*tw*/  "border-secondary";
        case "black":
            return /*tw*/  "border-black";
        case "white":
            return /*tw*/  "border-white";
        default: {
            return undefined
        }
    }
}
