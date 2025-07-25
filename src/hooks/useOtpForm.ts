import { useState } from "react";
import { emptyValue } from "../common/constants";

export const useOtpForm = (initialEmail: string = emptyValue) => {
  const [email, setEmail] = useState(initialEmail);
  const [otp, setOtp] = useState(emptyValue);
  const [errors, setErrors] = useState<{ email?: string; otp?: string }>({});

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!otp) {
      newErrors.otp = "OTP is required";
    } else if (!/^\d{4}$/.test(otp)) {
      newErrors.otp = "OTP must be 4 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    email,
    setEmail,
    otp,
    setOtp,
    errors,
    validate,
  };
};
