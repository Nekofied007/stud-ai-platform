import React from 'react';
import { cn } from '../../lib/utils';

const buttonVariants = {
  default: "bg-primary-orange text-white hover:bg-opacity-90",
  ghost: "bg-transparent hover:bg-gray-100",
  outline: "border-2 border-primary-orange text-primary-orange hover:bg-primary-orange hover:text-white",
};

const buttonSizes = {
  default: "px-4 py-2",
  sm: "px-3 py-1.5 text-sm",
  lg: "px-6 py-3 text-lg",
  icon: "w-10 h-10 p-0",
};

export const Button = React.forwardRef(({ 
  className, 
  variant = "default", 
  size = "default", 
  children,
  ...props 
}, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
        buttonVariants[variant],
        buttonSizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";
