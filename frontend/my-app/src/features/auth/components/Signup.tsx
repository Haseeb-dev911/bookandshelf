import React from 'react';
import { Link } from 'react-router-dom';
import { SignupForm } from './SignupForm';
import { Logo } from '@/shared/components/Logo';
import { AUTH_ROUTES_PATH } from '@/app/router/routes.path';

export const SignupComponent: React.FC = () => {
  return (
    <div className="flex w-full lg:w-1/2 h-screen order-2 bg-white">

      <div className={`w-full h-full shrink-0 flex flex-col px-10 md:px-16 lg:px-20 py-10 overflow-y-auto bg-white 
          order-1 overflow-y-auto scrollbar-hide`}>

        <Logo />
        <div className="flex justify-center flex-col grow">
          <div className="mb-8 mt-10">
            <h1
              className="text-[36px] font-bold text-[#1a1a1a] leading-tight mb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Create account
            </h1>
            <p
              className="text-sm text-gray-500"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Join our community of intentional readers.
            </p>
          </div>

          <SignupForm />

          <div className="flex items-center  my-2 text-xs text-gray-400 before:flex-1 before:border-t before:border-gray-200 after:flex-1 after:border-t after:border-gray-200">
            <span className="px-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Or</span>
          </div>
          <p
            className="mt-2 text-center text-sm text-gray-500 mx-auto"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Already have an account?{' '}
            <Link
              className="font-semibold text-[#8b5e3c] hover:underline"
              to={AUTH_ROUTES_PATH.login}
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
