import { api } from "@/services/apiClient";

import { signUpFieldsValidationTypes } from "../types/signup.account.types";
import { optTypeVerifyAccount } from '../types/form.opt.verify.types';
import type { LoginCredentials } from '../types/index.types';
import { ResetUpdatePasswordFormDataType } from '../types/email.forget.password.types';

const endpoints = {
  // auth
  signup: '/auth/signup',
  verifyToken: '/auth/verify-token',
  gaurdVerifyToken: "/auth/verify-token",
  resendToken: '/auth/resend-token',
  login: '/auth/login',

  // auth password forget
  passwordResetRequestEmail: '/auth/password-reset/request',
  passwordResetVerify: "/auth/password-reset/opt-verify/",
  passwordResetConfirm: "/auth/password-reset/password/",

};

export const authService = {
  signup: async (data: signUpFieldsValidationTypes) => {
    const response = await api.post(endpoints.signup, data);
    return response.data;
  },

  verifyToken: async (data: optTypeVerifyAccount) => {
    const response = await api.post(endpoints.verifyToken, data);
    return response.data;
  },

  guardVerifyToken: async () => {
    return await api.get(endpoints.gaurdVerifyToken);
  },

  resendToken: async () => {
    const response = await api.get(endpoints.resendToken);
    return response.data;
  },

  login: async (credentials: LoginCredentials) => {
    const response = await api.post(endpoints.login, credentials);
    return response.data;
  },

  // reset password Authentication Service
  requestPasswordResetEmailSender: async (email: string) => {
    const response = await api.post(endpoints.passwordResetRequestEmail, { email });
    return response.data;
  },

  requestPasswordVerifyGuard: async (sessionId: string) => {
    const response = await api.get(endpoints.passwordResetVerify + sessionId);
    return response.data;
  },

  requestPasswordVerify: async (sessionId: string, token: string) => {
    const response = await api.post(endpoints.passwordResetVerify + sessionId, { token });
    return response.data;
  },

  requestPasswordTokenResend: async (sessionId: string) => {
    const response = await api.patch(endpoints.passwordResetVerify + sessionId);
    return response.data;
  },

  requestPasswordConfirmGuard: async (sessionId: string) => {
    const response = await api.get(endpoints.passwordResetConfirm + sessionId);
    return response.data;
  },

  updatePasswordCOnfirm: async (data: ResetUpdatePasswordFormDataType) => {
    const response = await api.patch(endpoints.passwordResetConfirm, data);
    return response.data;
  }
};
