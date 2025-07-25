export const headings = {
  titlePart1: "Credit Co-operative",
  titlePart2: "Management System",
  dashboard: "Dashboard",
  pendingApprovals: "Pending Approvals",
  logout: "Logout",
};

export const errorMessages = {
  email: {
    required: "Email is required",
    valid: "Please enter a valid email",
  },
  password: {
    required: "Password is required",
    valid: "Password must be at least 6 characters",
  },
};

export const loginPageMessages = {
  heading: "Sign in to your account",
  subHeading: "Access your Credit Co-operative account",
  email: {
    title: "Email Address",
    type: "email",
    placeHolder: "Enter your email",
  },
  password: {
    title: "Password",
    type: "password",
    placeHolder: "Enter your password",
  },
  submit: {
    title: "Sign In",
    type: "submit",
  },
  signUpHere: "Sign up here",
  dontHaveAccount: "Don't have an account? ",
};

export const signUpPageMessages = {
  heading: "Create your account",
  subHeading: "Join our Credit Co-operative System",
  serialNumber: {
    title: "Serial Number",
    name: "serialNumber",
    placeHolder: "Enter serial number",
  },
  fullName: {
    title: "Full Name",
    name: "fullName",
    type: "text",
    placeHolder: "Enter your full name",
  },
  email: {
    title: "Email Address",
    type: "email",
    name: "email",
    placeHolder: "Enter your email",
  },
  password: {
    title: "Password",
    type: "password",
    name: "password",
    placeHolder: "Create a password",
  },
  phone: {
    title: "Phone Number (Optional)",
    type: "number",
    name: "phoneNumber",
    placeHolder: "Enter your phone number",
  },
  emergencyPerson: {
    title: "Emergency Person (Optional)",
    name: "emergencyPerson",
    type: "text",
    placeHolder: "Emergency contact name",
  },
  emergencyContact: {
    title: "Emergency Contact (Optional)",
    name: "emergencyContact",
    type: "text",
    placeHolder: "Emergency contact number",
  },
  submit: {
    title: "Create Account",
  },
  alreadyAccount: "Already have an account?  ",
  signinHere: "Sign in here",
};

export const validation = {
  passwordlength: 6,
  validateEmail: (email: string) => /\S+@\S+\.\S+/.test(email),
};

export const emptyValue = "";

export enum ROLE {
  ADMIN = "admin",
  USER = "user",
}

export const monthOptions = [
  { value: "January", label: "January" },
  { value: "February", label: "February" },
  { value: "March", label: "March" },
  { value: "April", label: "April" },
  { value: "May", label: "May" },
  { value: "June", label: "June" },
  { value: "July", label: "July" },
  { value: "August", label: "August" },
  { value: "September", label: "September" },
  { value: "October", label: "October" },
  { value: "November", label: "November" },
  { value: "December", label: "December" },
];

export const yearOptions = [
  { value: "2024", label: "2024" },
  { value: "2025", label: "2025" },
];
