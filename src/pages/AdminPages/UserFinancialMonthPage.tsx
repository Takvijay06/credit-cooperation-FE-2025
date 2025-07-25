import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  DollarSign,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import Layout from "../../components/Layout/Layout";
import Button from "../../components/UI/Button";
import { FinancialEntry } from "../../types";
import { useAuth } from "../../hooks";
import { routes } from "../../routes";

const UserFinancialMonthPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const entry = location.state?.entry as FinancialEntry;

  if (!entry) {
    if (isAdmin) {
      navigate(routes.adminDashboard);
    } else {
      navigate("/dashboard");
    }
    return null;
  }

  const monthName = entry.month;

  const financialData = [
    {
      label: "Loan Taken",
      value: entry.loanTaken,
      icon: TrendingUp,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "Collection",
      value: entry.collection,
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      label: "Fine",
      value: entry.fine,
      icon: TrendingDown,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      label: "Instalment",
      value: entry.instalment,
      icon: DollarSign,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Button
            variant="secondary"
            onClick={() =>
              isAdmin ? navigate(routes.adminDashboard) : navigate("/dashboard")
            }
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>

          <div className="flex items-center space-x-3">
            <Calendar className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {monthName} {entry.year} Financial Details
              </h1>
              <p className="text-gray-600">
                Serial Number: {entry.serialNumber} | {entry.fullName}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {financialData.map((item) => {
            const IconComponent = item.icon;
            return (
              <div key={item.label} className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg ${item.bgColor}`}>
                    <IconComponent className={`h-6 w-6 ${item.color}`} />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      {item.label}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      ₹{item.value.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Monthly Summary
            </h2>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Account Details
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Serial Number:</span>
                    <span className="font-medium">{entry.serialNumber}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium">{entry.fullName}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Month:</span>
                    <span className="font-medium">{monthName}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Year:</span>
                    <span className="font-medium">{entry.year}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Financial Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Interest:</span>
                    <span className="font-bold text-lg text-blue-600">
                      ₹{entry.interest}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Total Amount:</span>
                    <span className="font-bold text-lg text-blue-600">
                      ₹{entry.total.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Pending Loan:</span>
                    <span
                      className={`font-bold text-lg ${
                        entry.pendingLoan > 0
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      ₹{entry.pendingLoan.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Status:</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        entry.pendingLoan === 0
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {entry.pendingLoan === 0 ? "Cleared" : "Pending"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {entry.pendingLoan > 0 && (
          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <TrendingDown className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  Outstanding Balance
                </h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>
                    You have a pending loan balance of ₹
                    {entry.pendingLoan.toLocaleString()}. Please contact the
                    administration for payment arrangements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default UserFinancialMonthPage;
