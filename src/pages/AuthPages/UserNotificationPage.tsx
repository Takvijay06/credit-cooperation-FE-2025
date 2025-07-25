import React from "react";
import { useNavigate } from "react-router-dom";
import { Clock, CheckCircle } from "lucide-react";

import { Layout, AuthPageHeader } from "../../components/Layout";
import { Button } from "../../components/UI";
import { routes } from "../../routes";

const UserNotificationPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout showHeader={false}>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <AuthPageHeader
            icon={Clock}
            title="Account Pending Approval"
            subtitle="Your registration was successful!"
          />

          <div className="bg-white py-8 px-6 rounded-xl shadow-lg">
            <div className="text-center space-y-6">
              {/* Email Verified Success */}
              <div className="flex items-center justify-center space-x-2 text-green-600">
                <CheckCircle className="h-6 w-6" />
                <span className="font-medium">Email Verified Successfully</span>
              </div>

              {/* Admin Approval Notice */}
              <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-amber-800 text-sm">
                  Your profile is currently pending admin approval. You will
                  receive an email notification once your account is activated.
                </p>
              </div>

              {/* What Happens Next */}
              <div className="space-y-4">
                <p className="text-gray-600 text-sm font-medium">
                  What happens next?
                </p>
                <ul className="text-left text-sm text-gray-600 space-y-2">
                  {[
                    "Admin reviews your registration details",
                    "You'll receive an email confirmation",
                    "You can then access your dashboard",
                  ].map((step, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-blue-600 font-bold">
                        {idx + 1}.
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <Button
                onClick={() => navigate(routes.login)}
                className="w-full"
                size="lg"
              >
                Go to Login Page
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserNotificationPage;
