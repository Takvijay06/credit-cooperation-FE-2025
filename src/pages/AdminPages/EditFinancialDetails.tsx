import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  DollarSign,
  TrendingDown,
  TrendingUp,
  Percent,
} from "lucide-react";
import Layout from "../../components/Layout/Layout";
import Button from "../../components/UI/Button";
import { FinancialEntry } from "../../types";
import { useAuth } from "../../hooks";
import { routes } from "../../routes";

const UserEntityEditMonthPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const entry = location.state?.entry as FinancialEntry;

  const financialData = [
    {
      label: "Loan Taken",
      value: entry.loanTaken,
      icon: TrendingUp,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      isDisable: false,
    },
    {
      label: "Collection",
      value: entry.collection,
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100",
      isDisable: true,
    },
    {
      label: "Fine",
      value: entry.fine,
      icon: TrendingDown,
      color: "text-red-600",
      bgColor: "bg-red-100",
      isDisable: false,
    },
    {
      label: "Instalment",
      value: entry.instalment,
      icon: DollarSign,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      isDisable: false,
    },
    {
      label: "Original Pending Loan",
      value: entry.pendingLoan + entry.instalment,
      icon: DollarSign,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
      isDisable: true,
    },
    {
      label: "Interest",
      value: entry.interest,
      icon: Percent,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
      isDisable: true,
    },
    {
      label: "Pending Loan Left",
      value: entry.pendingLoan,
      icon: DollarSign,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
      isDisable: true,
    },
    {
      label: "Total Amount",
      value: entry.collection + entry.instalment + entry.fine + entry.interest,
      icon: DollarSign,
      color: "text-red-600",
      bgColor: "bg-red-100",
      isDisable: true,
    },
  ];
  const [editableData, setEditableData] = useState(financialData);

  const handleValueChange = (index: number, value: string) => {
    const updated = [...editableData];
    updated[index].value = Number(value);
    updated[7].value =
      Number(updated[1].value) +
      Number(updated[2].value) +
      Number(updated[3].value) +
      Number(entry.interest);
    updated[6].value = Number(updated[4].value) - Number(updated[3].value);
    setEditableData(updated);
  };

  if (!entry) {
    navigate(isAdmin ? routes.adminDashboard : "/dashboard");
    return null;
  }

  const monthName = entry.month;

  const onFillSocietyClick = () => {
    //Call edit API here
    navigate(routes.adminDashboard);
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <Button
          variant="secondary"
          onClick={() =>
            isAdmin ? navigate(routes.adminDashboard) : navigate("/dashboard")
          }
          className="mb-2"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>

        <div className="flex items-center space-x-4">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {editableData.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className={`${
                  item.label !== "Total Amount"
                    ? "bg-white"
                    : "bg-blue-300 border-cyan-800"
                } p-5 rounded-xl shadow-md flex items-center gap-4`}
              >
                <div className={`p-3 rounded-lg ${item.bgColor}`}>
                  <Icon className={`h-6 w-6 ${item.color}`} />
                </div>
                <div className="flex flex-col flex-grow">
                  <label className="text-sm text-gray-600 font-medium mb-1">
                    {item.label}
                  </label>
                  <input
                    type="number"
                    value={item.value}
                    disabled={item.isDisable}
                    onChange={(e) => handleValueChange(index, e.target.value)}
                    className="text-2xl font-semibold text-center bg-gray-50 text-gray-900 px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition shadow-sm"
                  />
                </div>
              </div>
            );
          })}
          <div className="col-span-1 sm:col-span-2 flex justify-center">
            <Button
              type="submit"
              size="lg"
              className="px-20 py-4 text-xl font-semibold"
              onClick={onFillSocietyClick}
            >
              Fill Society
            </Button>
          </div>
        </div>

        {entry.pendingLoan > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start space-x-3">
            <TrendingDown className="h-5 w-5 text-yellow-500 mt-1" />
            <div>
              <h3 className="text-sm font-semibold text-yellow-800">
                Outstanding Balance
              </h3>
              <p className="mt-1 text-sm text-yellow-700">
                You have a pending loan balance of ₹
                {entry.pendingLoan.toLocaleString()}. Please contact the
                administration for payment arrangements.
              </p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default UserEntityEditMonthPage;
