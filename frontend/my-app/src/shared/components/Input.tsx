import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  isPassword?: boolean;
  ref: React.Ref<HTMLInputElement>
}

export function Input({ label, error, isPassword = false, ref, ...props }: InputProps) {

  const [showPassword, setShowPassword] = useState(false);

  const inputType = isPassword ? (showPassword ? 'text' : 'password') : "text";

  return (
    <div>
      <label
        className="block text-sm font-medium text-[#1a1a1a] mb-1.5"
        htmlFor={props.id}
      >
        {label}
      </label>
      
      <div className="relative">
        <input
          ref={ref}
          className={`w-full rounded-xl border ${error ? 'border-red-500' : 'border-[#e8d5c4]'
            }  px-4 py-3 ${isPassword ? 'pr-12' : ''
            } text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#c4956a] focus:ring-2 focus:ring-[#c4956a]/20 transition-all`}
          type={inputType}
          {...props}
        />

        {isPassword && (
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label="Toggle password visibility"
          >
            <span className="material-symbols-outlined w-3 h-3 text-[10px] cursor-pointe">
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </span>
          </button>
        )}
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}