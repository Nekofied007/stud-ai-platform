import React from 'react';
import { cn } from '../../lib/utils';

const variants = {
	default:
		'bg-[#FF8C5A] text-white rounded-full border border-transparent',
	ghost:
		'bg-transparent text-[#1a1a1a] rounded-md border border-transparent hover:bg-[rgba(0,0,0,0.05)]',
	outline:
		'bg-transparent text-[#FF8C5A] rounded-full border border-[#FF8C5A] hover:bg-[rgba(255,140,90,0.08)]',
};

const sizes = {
	default: 'px-4 py-2 text-sm',
	sm: 'px-3 py-1.5 text-sm',
	lg: 'px-5 py-3 text-base',
	icon: 'w-10 h-10 p-0',
};

export const Button = React.forwardRef(
	(
		{ className, variant = 'default', size = 'default', children, ...props },
		ref
	) => {
		return (
			<button
				ref={ref}
				className={cn(
					'inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#5B9BD5] focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none shadow-sm',
					variants[variant],
					sizes[size],
					className
				)}
				{...props}
			>
				{children}
			</button>
		);
	}
);

Button.displayName = 'Button';

export default Button;

