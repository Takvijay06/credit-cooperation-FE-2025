import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, Mail, Lock } from "lucide-react";
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";
import { useAuth, useLoginForm } from "../../hooks/index";
import { AuthPageHeader, Layout } from "../../components/Layout";
import { Button, ErrorMessage, InputWithIcon } from "../../components/UI/index";
import { routes } from "../../routes";
import { loginPageMessages } from "../../common/constants";

const LoginPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin, isLoading, error } = useAuth();
  const { email, password, errors, setEmail, setPassword, handleSubmit } =
    useLoginForm();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(isAdmin ? routes.adminDashboard : routes.userDashboard);
    }
  }, [isAuthenticated, isAdmin, navigate]);

  return (
    <Layout showHeader={false}>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <AuthPageHeader
            icon={LogIn}
            title={loginPageMessages.heading}
            subtitle={loginPageMessages.subHeading}
          />

          <div className="bg-white py-8 px-6 rounded-xl shadow-lg">
            <form
              className="space-y-6"
              onSubmit={(e) => handleSubmit(e, dispatch)}
            >
              {error && <ErrorMessage message={error} />}

              <InputWithIcon
                Icon={Mail}
                label={loginPageMessages.email.title}
                type={loginPageMessages.email.type}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
                placeholder={loginPageMessages.email.placeHolder}
              />

              <InputWithIcon
                Icon={Lock}
                label={loginPageMessages.password.title}
                type={loginPageMessages.password.type}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
                placeholder={loginPageMessages.password.placeHolder}
              />

              <Button
                type="submit"
                loading={isLoading}
                className="w-full"
                size="lg"
              >
                {loginPageMessages.submit.title}
              </Button>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  {loginPageMessages.dontHaveAccount}
                  <Link
                    to={routes.signUp}
                    className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                  >
                    {loginPageMessages.signUpHere}
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
