import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const Button = React.forwardRef(({ className, variant = 'primary', size = 'md', ...props }, ref) => {
  const variants = {
    primary: 'bg-primary text-on-primary hover:opacity-90 active:scale-[0.98] shadow-sm',
    secondary: 'bg-surface-container text-on-surface border border-outline-variant/60 hover:bg-surface-container-highest shadow-sm',
    outline: 'bg-transparent text-primary border border-primary hover:bg-primary-container/10',
    ghost: 'bg-transparent text-on-surface-variant hover:bg-surface-container',
    danger: 'bg-error text-on-error hover:opacity-95 shadow-sm',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-label-md',
    lg: 'px-6 py-3 text-body-lg',
  };

  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
});

export const Input = React.forwardRef(({ className, label, error, ...props }, ref) => {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="text-label-md font-medium text-on-surface-variant">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={cn(
          'flex h-10 w-full rounded-lg border border-outline-variant bg-surface px-3 py-2 text-body-md ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all',
          error && 'border-error focus:ring-error',
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-caption text-error">{error}</p>
      )}
    </div>
  );
});
