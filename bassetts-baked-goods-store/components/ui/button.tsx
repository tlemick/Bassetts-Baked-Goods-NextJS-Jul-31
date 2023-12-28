import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'primary' | 'increment';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			className,
			children,
			disabled,
			type = 'button',
			variant = 'primary',
			...props
		},
		ref,
	) => {
		const baseStyles = `
      w-auto 
      border
      disabled:cursor-not-allowed 
      disabled:opacity-50
      font-semibold
      hover:bg-rose-500
      transition
    `;

		const primaryStyles = `
      bg-black
      border-transparent
      text-white
	  px-5 
      py-3 
	  rounded-full
    `;

		const incrementStyles = `
      bg-black
      border-transparent
      text-white
	  rounded-lg
      px-2
    `;

		return (
			<button
				type={type}
				className={cn(
					baseStyles,
					variant === 'primary' ? primaryStyles : '',
					variant === 'increment' ? incrementStyles : '',
					disabled && 'opacity-75 cursor-not-allowed',
					className,
				)}
				disabled={disabled}
				ref={ref}
				{...props}
			>
				{children}
			</button>
		);
	},
);

Button.displayName = 'Button';

export default Button;
