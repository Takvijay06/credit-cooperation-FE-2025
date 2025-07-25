import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Shield, Mail } from "lucide-react";

import { Layout, AuthPageHeader } from "../../components/Layout";
import { Input, Button, ErrorMessage } from "../../components/UI";

import { useOtpForm } from "../../hooks";
import { useAuth } from "../../hooks/useAuth";
import { verifyOTP } from "../../store/slices/authSlice";
import { AppDispatch } from "../../store";
import { routes } from "../../routes";

const OTPVerificationPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoading, error } = useAuth();

  const { email, setEmail, otp, setOtp, errors, validate } = useOtpForm();

  useEffect(() => {
    const stateEmail = location.state?.email;
    if (stateEmail) {
      setEmail(stateEmail);
    }
  }, [location.state, setEmail]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    const result = await dispatch(verifyOTP({ email, otp }));
    if (verifyOTP.fulfilled.match(result)) {
      navigate(routes.userNotification);
    }
  };

  return (
    <Layout showHeader={false}>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <AuthPageHeader
            icon={Shield}
            title="Verify your email"
            subtitle="We've sent a 4-digit code to your email address"
          />

          <div className="bg-white py-8 px-6 rounded-xl shadow-lg">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && <ErrorMessage message={error} />}

              <div className="relative">
                <Mail className="absolute left-3 top-9 h-5 w-5 text-gray-400" />
                <Input
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={errors.email}
                  className="pl-10"
                  placeholder="Enter your email"
                />
              </div>

              <Input
                label="OTP Code"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.slice(0, 4))}
                error={errors.otp}
                placeholder="Enter 4-digit code"
                maxLength={4}
                className="text-center text-2xl tracking-widest font-mono"
              />

              <Button
                type="submit"
                loading={isLoading}
                className="w-full"
                size="lg"
              >
                Verify OTP
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-500 transition-colors"
                >
                  Resend OTP
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OTPVerificationPage;
