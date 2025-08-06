export interface User {
  id: string;
  serialNumber: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  emergencyPerson?: string;
  emergencyContact?: string;
  isActive: boolean;
  isEmailVerified: boolean;
  role: "user" | "admin";
  createdAt: string;
  updatedAt: string;
}

export interface UserRequest {
  id: string;
  serialNumber: string;
  fullName: string;
  email: string;
}

export interface LoanUserRequest {
  serialNumber: string;
  fullName: string;
  loanTaken: string;
}

export interface FinancialYear {
  id: string;
  year: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FinancialEntry {
  id: string;
  serialNumber: string;
  year: number;
  month: string;
  fullName: string;
  loanTaken: number;
  collection: number;
  interest: number;
  fine: number;
  instalment: number;
  total: number;
  status: string;
  isFreezed: boolean;
  pendingLoan: number;
}

export interface FinancialInsertEntry {
  serialNumber: number;
  month: string;
  year: number;
  loanTaken?: number;
  collection: number;
  fine?: number;
  instalment: number;
}

export interface FinancialEditEntry {
  serialNumber: number;
  month: string;
  year: number;
  collection?: number;
  loanTaken?: number;
  fine?: number;
  instalment?: number;
}

export interface AuthState {
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface FinanceState {
  financialYears: FinancialYear[];
  financialEntries: FinancialEntry[];
  usersLoan: LoanUserRequest[];
  selectedYear: string | null;
  selectedMonth: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface AdminState {
  users: User[];
  pendingUsers: UserRequest[];
  totalUsers: number;
  currentPage: number;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  serialNumber: string;
  fullName: string;
  email: string;
  password: string;
  phoneNumber?: string;
  emergencyPerson?: string;
  emergencyContact?: string;
}

export interface OTPVerification {
  email: string;
  otp: string;
}

export interface APIResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
  year: number;
  month: number;
}

export interface FinancialEntryPerYear {
  month: string;
  loanTaken: number;
  collection: number;
  fine: number;
  interest: number;
  instalment: number;
  total: number;
  pendingLoan: number;
  serialNumber: number;
  fullName: string;
}

export interface UserFinancialData {
  entries: FinancialEntryPerYear[];
}

export interface UserFinancialParams {
  serialNumber: number;
  year: number;
}
