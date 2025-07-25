import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Calendar, TrendingUp, Eye } from "lucide-react";
import {
  fetchFinancialYears,
  fetchUserFinancialData,
  setSelectedYear,
} from "../../store/slices/financeSlice";
import { useAuth } from "../../hooks/useAuth";
import Layout from "../../components/Layout/Layout";
import Select from "../../components/UI/Select";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import ErrorMessage from "../../components/UI/ErrorMessage";
import { AppDispatch, RootState } from "../../store";
import { FinancialEntry } from "../../types";

const UserFinancialYearPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { serialNumber } = useAuth();
  const { financialYears, financialEntries, selectedYear, isLoading, error } =
    useSelector((state: RootState) => state.finance);

  const [currentYear, setCurrentYear] = useState<string>("2024");

  useEffect(() => {
    dispatch(
      fetchUserFinancialData({
        serialNumber: serialNumber,
        year: Number(currentYear),
      })
    );
  }, [dispatch, currentYear, serialNumber]);

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedYear = e.target.value;
    setCurrentYear(selectedYear);
    dispatch(setSelectedYear(selectedYear));
    if (serialNumber) {
      dispatch(
        fetchUserFinancialData({
          serialNumber: serialNumber,
          year: Number(selectedYear),
        })
      );
    }
  };

  const handleViewMonth = (entry: FinancialEntry) => {
    navigate(`/financial-details/month/${entry.serialNumber}`, {
      state: { entry },
    });
  };

  const yearOptions = financialYears.map((year) => ({
    value: year.year,
    label: year.year.toString(),
  }));

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Calendar className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Financial Overview
              </h1>
              <p className="text-gray-600">
                View your financial records by year
              </p>
            </div>
          </div>

          <div className="max-w-xs">
            <Select
              label="Select Year"
              value={currentYear}
              onChange={handleYearChange}
              options={[
                { value: 2024, label: "2024" },
                { value: 2025, label: "2025" },
                ...yearOptions,
              ]}
            />
          </div>
        </div>

        {error && <ErrorMessage message={error} className="mb-6" />}

        {isLoading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : currentYear !== "" &&
          financialEntries &&
          financialEntries.entries.length > 0 ? (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
                Financial Records for {currentYear}
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Month
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Serial No.
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Loan Taken
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Collection
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fine
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Instalment
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pending Loan
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {financialEntries &&
                    Array.isArray(financialEntries.entries) &&
                    financialEntries.entries.map((entry) => (
                      <tr key={entry.month} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {entry.month}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {entry.serialNumber}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ₹{entry.loanTaken.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ₹{entry.collection.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ₹{entry.fine.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ₹{entry.instalment.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          ₹{entry.total.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ₹{entry.pendingLoan.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button
                            onClick={() => handleViewMonth(entry)}
                            className="text-blue-600 hover:text-blue-900 flex items-center space-x-1"
                          >
                            <Eye className="h-4 w-4" />
                            <span>View Details</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : currentYear &&
          currentYear !== "" &&
          financialEntries.entries &&
          financialEntries.entries.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No records found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              No financial records available for {selectedYear}
            </p>
          </div>
        ) : (
          <div className="text-center py-12">
            <Calendar className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              Select a year
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Choose a year to view your financial records
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default UserFinancialYearPage;
