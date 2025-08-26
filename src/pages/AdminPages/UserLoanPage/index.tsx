import React, { useCallback, useEffect, useState } from "react";
import { Layout } from "../../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { fetchLoanUsers } from "../../../store/slices/financeSlice";
import Heading from "./heading";
import FilterDropdown from "./filters";
import LoanTable from "./loanTable";

const UsersLoanPage: React.FC = () => {
  const date = new Date();
  const dispatch = useDispatch<AppDispatch>();
  const { usersLoan, isLoading } = useSelector(
    (state: RootState) => state.finance
  );

  const [filters, setFilters] = useState({
    year: date.getFullYear().toString(),
    month: date.toLocaleString("default", { month: "long" }),
  });

  useEffect(() => {
    dispatch(fetchLoanUsers(filters));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const handleFilterChange = useCallback((field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          {/* Header + Filters */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Header */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-4">
                <Heading month={filters.month} year={filters.year} />
              </div>
            </div>

            {/* Filters */}
            <FilterDropdown filters={filters} onChange={handleFilterChange} />
          </div>

          {/* Table or No Data */}
          <LoanTable
            isLoading={isLoading}
            loans={usersLoan}
            month={filters.month}
            year={filters.year}
          />
        </div>
      </div>
    </Layout>
  );
};

export default UsersLoanPage;
