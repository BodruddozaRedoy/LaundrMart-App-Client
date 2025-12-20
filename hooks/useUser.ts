import { useMutation } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  verifyOtp,
  resendOtp,
} from "@/services/user.api";

import {
  RegisterPayload,
  LoginPayload,
  ForgotPasswordPayload,
  ResetPasswordPayload,
  VerifyOtpPayload,
  ResendOtpPayload,
  AuthResponse,
} from "@/types/user.types";

export const useUser = () => {
  /* REGISTER */
  const registerMutation = useMutation<AuthResponse, Error, RegisterPayload>({
    mutationFn: registerUser,
  });

  /* LOGIN */
  const loginMutation = useMutation<AuthResponse, Error, LoginPayload>({
    mutationFn: loginUser,
    onSuccess: async (data) => {
      if (data?.token) {
        await AsyncStorage.setItem("accessToken", data.token);
      }
    },
  });

  /* FORGOT PASSWORD */
  const forgotPasswordMutation = useMutation<
    AuthResponse,
    Error,
    ForgotPasswordPayload
  >({
    mutationFn: forgotPassword,
  });

  /* RESET PASSWORD */
  const resetPasswordMutation = useMutation<
    AuthResponse,
    Error,
    ResetPasswordPayload
  >({
    mutationFn: resetPassword,
  });

  /* VERIFY OTP */
  const verifyOtpMutation = useMutation<
    AuthResponse,
    Error,
    VerifyOtpPayload
  >({
    mutationFn: verifyOtp,
    onSuccess: async (data) => {
      if (data?.token) {
        await AsyncStorage.setItem("accessToken", data.token);
      }
    },
  });

  /* RESEND OTP */
  const resendOtpMutation = useMutation<
    AuthResponse,
    Error,
    ResendOtpPayload
  >({
    mutationFn: resendOtp,
  });

  /* LOGOUT */
  const logout = async () => {
    await AsyncStorage.removeItem("accessToken");
  };

  return {
    /* actions */
    register: registerMutation.mutateAsync,
    login: loginMutation.mutateAsync,
    forgotPassword: forgotPasswordMutation.mutateAsync,
    resetPassword: resetPasswordMutation.mutateAsync,
    verifyOtp: verifyOtpMutation.mutateAsync,
    resendOtp: resendOtpMutation.mutateAsync,
    logout,

    /* states */
    registerState: registerMutation,
    loginState: loginMutation,
    forgotPasswordState: forgotPasswordMutation,
    resetPasswordState: resetPasswordMutation,
    verifyOtpState: verifyOtpMutation,
    resendOtpState: resendOtpMutation,
  };
};
