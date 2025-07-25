import { useState } from "react";
import { FormData, FormErrors } from "../common/interfaces/components";
import { validation } from "../common/constants";

export const useSignupForm = () => {
  const [formData, setFormData] = useState<FormData>({
    serialNumber: "",
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    emergencyPerson: "",
    emergencyContact: "",
  });

  const [errors, setErrors] = useState<Partial<FormErrors>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<FormErrors> = {};

    if (!formData.serialNumber.trim())
      newErrors.serialNumber = "Serial Number is required";
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email address";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < validation.passwordlength)
      newErrors.password = "Password must be at least 6 characters";
    if (
      formData.phoneNumber &&
      !/^\d{10}$/.test(formData.phoneNumber.replace(/\D/g, ""))
    ) {
      newErrors.phoneNumber = "Phone number must be 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    formData,
    errors,
    handleChange,
    validate,
  };
};
