export interface LayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "success";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  children: React.ReactNode;
}

export interface ErrorMessageProps {
  message: string;
  className?: string;
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string | number; label: string }[];
}

export interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export type Errors = { email?: string; password?: string };

export type InputWithIconProps = {
  Icon: React.ElementType;
  label: string;
  name?: string;
  type: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  error?: string;
  placeholder?: string;
};

export type AuthPageHeaderProps = {
  icon: React.ElementType;
  title: string;
  subtitle: string;
};

export type FormSectionProps = {
  formData: Record<string, string>;
  errors: Record<string, string>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  error: string | null;
};

export type FormData = {
  serialNumber: string;
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  emergencyPerson: string;
  emergencyContact: string;
};

export type FormErrors = Record<keyof FormData, string>;
