// types/user.types.ts
export type UserRole = "Customer";
export interface User {
  id: string;
  name: string;
  email: string;
  role?: "user" | "admin" | "scholar";
  avatar?: string;
  verified?: boolean;
}

export interface RegisterPayload {
  email?: string;
  phone_number?: string;
  password: string;
  role: UserRole;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  token: string;
  newPassword: string;
}

export interface VerifyOtpPayload {
  email?: string;
  phone_number?: string;
  otp: string;
}
export interface ResendOtpPayload {
  email?: string;
  phone_number?: string;
}
