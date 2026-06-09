import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: 'primary' | 'outline';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  isLoading,
  variant = 'primary',
  fullWidth = true,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = "";
  
  const variants = {
    primary: "bg-[#2C2118] hover:bg-[#3d2e22] text-white",
    outline: "border border-[#e8d5c4] bg-white hover:bg-[#FFF9F5] text-gray-700 font-medium"
  };

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${widthStyle} ${className}`}
      disabled={disabled || isLoading}
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      {...props}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
};
