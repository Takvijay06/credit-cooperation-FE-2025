import { useState } from "react";
import { login } from "../store/slices/authSlice";
import { AppDispatch } from "../store";
import { emptyValue, errorMessages, validation } from "../common/constants";
import { Errors } from "../common/interfaces/components";

const useLoginForm = () => {
  const [email, setEmail] = useState(emptyValue);
  const [password, setPassword] = useState(emptyValue);
  const [errors, setErrors] = useState<Errors>({});

  const validateForm = (): boolean => {
    const newErrors: Errors = {};

    if (!email.trim()) {
      newErrors.email = errorMessages.email.required;
    } else if (!validation.validateEmail(email)) {
      newErrors.email = errorMessages.email.valid;
    }

    if (!password) {
      newErrors.password = errorMessages.password.required;
    } else if (password.length < validation.passwordlength) {
      newErrors.password = errorMessages.password.valid;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (
    e: React.FormEvent,
    dispatch: AppDispatch
  ): Promise<void> => {
    e.preventDefault();
    if (!validateForm()) return;
    dispatch(login({ email, password }));
  };

  return {
    email,
    password,
    errors,
    setEmail,
    setPassword,
    handleSubmit,
  };
};

export default useLoginForm;
