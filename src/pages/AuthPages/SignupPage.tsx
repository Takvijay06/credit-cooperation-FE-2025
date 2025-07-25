import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { UserPlus } from "lucide-react";
import { Layout, AuthPageHeader } from "../../components/Layout";
import { useAuth, useSignupForm } from "../../hooks";
import { signup } from "../../store/slices/authSlice";
import { AppDispatch } from "../../store";
import { SignUpFormSection } from "../../components/UI/SignUpFormSection";
import { routes } from "../../routes";
import { signUpPageMessages } from "../../common/constants";

const SignupPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isLoading, error } = useAuth();
  const { formData, errors, handleChange, validate } = useSignupForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const result = await dispatch(signup(formData));
    if (signup.fulfilled.match(result)) {
      navigate(routes.verifyOtp, { state: { email: formData.email } });
    }
  };

  return (
    <Layout showHeader={false}>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full space-y-8">
          <AuthPageHeader
            icon={UserPlus}
            title={signUpPageMessages.heading}
            subtitle={signUpPageMessages.subHeading}
          />
          <SignUpFormSection
            formData={formData}
            errors={errors}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </div>
    </Layout>
  );
};

export default SignupPage;
