import React from "react";
import { useNavigate, useRouteError } from "react-router-dom";
import { AlertTriangle, Home, ArrowLeft } from "lucide-react";
import Layout from "../../components/Layout/Layout";
import Button from "../../components/UI/Button";

interface RouteError {
  statusText?: string;
  message?: string;
  status?: number;
}

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();
  const error = useRouteError() as RouteError;

  const getErrorInfo = () => {
    if (error?.status === 404) {
      return {
        title: "Page Not Found",
        message: "The page you are looking for does not exist.",
        suggestion: "Please check the URL or navigate back to the homepage.",
      };
    }

    if (error?.status === 403) {
      return {
        title: "Access Denied",
        message: "You do not have permission to access this resource.",
        suggestion:
          "Please contact your administrator if you believe this is an error.",
      };
    }

    if (error?.status === 500) {
      return {
        title: "Server Error",
        message: "Something went wrong on our end.",
        suggestion:
          "Please try again later or contact support if the problem persists.",
      };
    }

    return {
      title: "Something went wrong",
      message:
        error?.message || error?.statusText || "An unexpected error occurred.",
      suggestion:
        "Please try refreshing the page or go back to the previous page.",
    };
  };

  const errorInfo = getErrorInfo();

  return (
    <Layout showHeader={false}>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 text-center">
          <div>
            <div className="mx-auto h-16 w-16 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <h1 className="mt-6 text-3xl font-extrabold text-gray-900">
              {errorInfo.title}
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Error {error?.status && `${error.status}: `}
              {errorInfo.message}
            </p>
          </div>

          <div className="bg-white py-8 px-6 rounded-xl shadow-lg">
            <div className="space-y-6">
              <p className="text-gray-600 text-sm">{errorInfo.suggestion}</p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={() => navigate(-1)}
                  variant="secondary"
                  className="flex-1"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Go Back
                </Button>
                <Button onClick={() => navigate("/")} className="flex-1">
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </Button>
              </div>

              {error?.status === 500 && (
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500">
                    If this error persists, please contact our support team with
                    error code: {error.status}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ErrorPage;
