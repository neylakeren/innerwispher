import React, { useState } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Eye, EyeOff } from 'lucide-react';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const Button = React.forwardRef(({ className, variant = 'primary', size = 'md', ...props }, ref) => {
  const variants = {
    primary: 'btn-lv font-semibold active:scale-[0.98]',
    secondary: 'bg-[#efeafb] text-[#4b3b86] border border-[#d9cff5] hover:bg-[#e4dbf7] shadow-sm',
    outline: 'btn-out font-medium',
    ghost: 'bg-transparent text-[#5d5577] hover:bg-[#efeafb] hover:text-[#4b3b86]',
    danger: 'bg-error text-white hover:opacity-90 shadow-sm rounded-xl',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs rounded-xl',
    md: 'px-4 py-2.5 text-sm rounded-xl',
    lg: 'px-6 py-3 text-base rounded-2xl',
  };

  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center font-medium transition-all focus:outline-none focus:ring-2 focus:ring-[#8f78d8]/50 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
});

export const Input = React.forwardRef(({ className, label, error, type, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <label className="text-sm font-semibold text-[#2b2542] block">
          {label}
        </label>
      )}
      <div className="relative w-full">
        <input
          ref={ref}
          type={inputType}
          className={cn(
            'flex h-11 w-full rounded-xl border border-[#d9cff5] bg-white/90 px-3.5 py-2 text-sm text-[#2b2542] placeholder:text-[#8a82a2] focus:outline-none focus:border-[#8f78d8] focus:ring-2 focus:ring-[#8f78d8]/25 transition-all shadow-sm',
            isPassword && 'pr-11',
            error && 'border-error focus:ring-error/20',
            className
          )}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-[#8a82a2] hover:text-[#4b3b86] hover:bg-[#efeafb] transition-all rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8f78d8]/30"
            tabIndex={-1}
            aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && (
        <p className="text-xs text-error font-medium">{error}</p>
      )}
    </div>
  );
});
