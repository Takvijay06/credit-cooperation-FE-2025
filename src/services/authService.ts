import { api } from "./api";
import {
  LoginCredentials,
  SignupData,
  OTPVerification,
  APIResponse,
  User,
} from "../types";

const APIRoutes = {
  login: "/auth/login",
  register: "/auth/register",
  verifyOtp: "/auth/verify-otp",
  logout: "/auth/logout",
};

export const authService = {
  login: (credentials: LoginCredentials) =>
    api.post<APIResponse<{ user: User; token: string }>>(
      APIRoutes.login,
      credentials
    ),

  signup: (signupData: SignupData) =>
    api.post<APIResponse<{ message: string }>>(APIRoutes.register, signupData),

  verifyOTP: (otpData: OTPVerification) =>
    api.patch<APIResponse<{ message: string }>>(APIRoutes.verifyOtp, otpData),

  logout: () => api.post<APIResponse<{ message: string }>>(APIRoutes.logout),
};
