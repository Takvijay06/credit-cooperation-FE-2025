import React, { useEffect, useState } from "react";
import { Info, Ban } from "lucide-react";
import { Layout } from "../../components/Layout";
import LoanTakenTable from "../../components/UI/LoanTable";
import { Select } from "../../components/UI";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { fetchLoanUsers } from "../../store/slices/financeSlice";

const UsersLoanPerMonth: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { usersLoan, isLoading } = useSelector((state: RootState) => state.finance);

  const [filters, setFilters] = useState({
    year: "2024",
    month: "March",
  });

  useEffect(() => {
    dispatch(fetchLoanUsers({ year: filters.year, month: filters.month }));
  }, [dispatch, filters.month, filters.year]);

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const yearOptions = [2024, 2025].map((year) => ({
    value: year.toString(),
    label: year.toString(),
  }));

  const monthOptions = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ].map((month) => ({ value: month, label: month }));

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          {/* Header + Filters */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Header */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 bg-green-600 rounded-full flex items-center justify-center">
                  <Info className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    Loan Taken Users in {filters.month} - {filters.year}
                  </h2>
                  <p className="text-gray-600">
                    View loan details of users for the selected month.
                  </p>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-6 rounded-lg shadow-md w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  label="Year"
                  value={filters.year}
                  onChange={(e) => handleFilterChange("year", e.target.value)}
                  options={yearOptions}
                />
                <Select
                  label="Month"
                  value={filters.month}
                  onChange={(e) => handleFilterChange("month", e.target.value)}
                  options={monthOptions}
                />
              </div>
            </div>
          </div>

          {/* Table or No Data */}
          <div className="bg-white rounded-lg shadow-md px-6 py-8">
            {isLoading ? (
              <div className="text-center py-8 text-gray-500">Loading...</div>
            ) : usersLoan.length > 0 ? (
              <LoanTakenTable
                loans={usersLoan}
                month={filters.month}
                year={filters.year}
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-center text-gray-500 py-12">
                <div className="bg-gray-100 p-4 rounded-full mb-4">
                  <Ban className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold">No Data Found</h3>
                <p className="text-sm mt-1">
                  No users found with loans for {filters.month} {filters.year}.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UsersLoanPerMonth;
