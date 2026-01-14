import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Users,
  ArrowLeft,
  Filter,
  Eye,
  Pen,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
import { setCurrentPage } from "../../store/slices/adminSlice";
import {
  fetchFinancialEntries,
  fetchFinancialYears,
} from "../../store/slices/financeSlice";
import Layout from "../../components/Layout/Layout";
import Select from "../../components/UI/Select";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import ErrorMessage from "../../components/UI/ErrorMessage";
import { AppDispatch, RootState } from "../../store";
import { FinancialEntry } from "../../types";

const AdminDashboardPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { totalUsers, currentPage, isLoading, error } = useSelector(
    (state: RootState) => state.admin
  );
  const { financialYears, financialEntries } = useSelector(
    (state: RootState) => state.finance
  );

  const [filters, setFilters] = useState(() => {
    const storedFilters = JSON.parse(
      localStorage.getItem("adminDashboardFilters") || "{}"
    );
    return {
      year: storedFilters.year || "2025",
      month: storedFilters.month || "July",
      search: "",
      status: "pending",
    };
  });

  const itemsPerPage = 40;
  const totalPages = Math.ceil(totalUsers / itemsPerPage);

  useEffect(() => {
    dispatch(fetchFinancialYears());
  }, [dispatch]);

  useEffect(() => {
    // const params = {
    //   page: currentPage,
    //   limit: itemsPerPage,
    //   ...(filters.year && { year: parseInt(filters.year) }),
    //   ...(filters.month && { month: parseInt(filters.month) }),
    // };
    dispatch(
      fetchFinancialEntries({ year: filters.year, month: filters.month })
    );
  }, [dispatch, currentPage, filters.year, filters.month]);

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => {
      const updatedFilters = { ...prev, [field]: value };

      localStorage.setItem(
        "adminDashboardFilters",
        JSON.stringify({
          year: field === "year" ? value : prev.year,
          month: field === "month" ? value : prev.month,
        })
      );

      return updatedFilters;
    });

    if (field === "year" || field === "month") {
      dispatch(setCurrentPage(1));
    }
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const handleViewUser = (entry: FinancialEntry) => {
    navigate(`/financial-details/month/${entry.serialNumber}`, {
      state: { entry },
    });
  };

  const handleEditUserEntity = (entry: FinancialEntry) => {
    navigate(`/financial-details-edit/month/${entry.serialNumber}`, {
      state: { entry },
    });
  };

  const yearOptions = financialYears.map((year) => ({
    value: year.year.toString(),
    label: year.year.toString(),
  }));

  const monthOptions = [
    { value: "January", label: "January" },
    { value: "February", label: "February" },
    { value: "March", label: "March" },
    { value: "April", label: "April" },
    { value: "May", label: "May" },
    { value: "June", label: "June" },
    { value: "July", label: "July" },
    { value: "August", label: "August" },
    { value: "September", label: "September" },
    { value: "October", label: "October" },
    { value: "November", label: "November" },
    { value: "December", label: "December" },
  ];

  const filteredEntries = Array.isArray(financialEntries)
    ? financialEntries.filter((entry) => {
        const search = filters.search.toLowerCase();
        const matchesSearch =
          entry.fullName?.toLowerCase().includes(search) ||
          entry.serialNumber?.toString().includes(search);

        const matchesStatus =
          filters.status === "pending"
            ? entry.status !== "deposit"
            : entry.status === "deposit";

        return matchesSearch && matchesStatus;
      })
    : [];

  const handleViewMonth = (entry: FinancialEntry) => {
    // navigate(`/financial-details/month/${entry.serialNumber}`, {
    //   state: { entry },
    // });
    navigate(`/dashboard`, {
      state: { entry },
    });
  };

  let count = 1;
  const chunkedSums = [];
  const grandTotal = {
    label: "Overall Total",
    loanTaken: 0,
    collection: 0,
    fine: 0,
    interest: 0,
    instalment: 0,
    total: 0,
    pendingLoan: 0,
  };
  for (let i = 0; i < financialEntries.length; i += 40) {
    const chunk = financialEntries.slice(i, i + 40);
    const sum = chunk.reduce(
      (acc, curr) => {
        acc.loanTaken += curr.loanTaken || 0;
        acc.collection += curr.collection || 0;
        acc.fine += curr.fine || 0;
        acc.interest += curr.interest || 0;
        acc.instalment += curr.instalment || 0;
        acc.total += curr.total || 0;
        acc.pendingLoan += curr.pendingLoan || 0;
        return acc;
      },
      {
        label: `Page ${count++}`,
        loanTaken: 0,
        collection: 0,
        fine: 0,
        interest: 0,
        instalment: 0,
        total: 0,
        pendingLoan: 0,
      }
    );
    grandTotal.loanTaken += sum.loanTaken;
    grandTotal.collection += sum.collection;
    grandTotal.fine += sum.fine;
    grandTotal.interest += sum.interest;
    grandTotal.instalment += sum.instalment;
    grandTotal.total += sum.total;
    grandTotal.pendingLoan += sum.pendingLoan;

    chunkedSums.push(sum);
  }
  chunkedSums.push(grandTotal);

  const toggleStatus = () => {
    setFilters((prev) => ({
      ...prev,
      status: prev.status === "pending" ? "deposit" : "pending",
    }));
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Button
            variant="secondary"
            onClick={() => navigate("/user/entry")}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <div className="flex items-center space-x-3 mb-6">
            <Users className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="text-gray-600">
                Manage users and view financial records
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <div className="flex items-center space-x-2 mb-4">
              <Filter className="h-5 w-5 text-gray-500" />
              <h3 className="text-lg font-medium text-gray-900">Filters</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Select
                label="Year"
                value={filters.year}
                onChange={(e) => handleFilterChange("year", e.target.value)}
                options={[
                  { value: "2024", label: "2024" },
                  { value: "2025", label: "2025" },
                  { value: "2026", label: "2026" },
                  ...yearOptions,
                ]}
              />

              <Select
                label="Month"
                value={filters.month}
                onChange={(e) => handleFilterChange("month", e.target.value)}
                options={[...monthOptions]}
              />

              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-9 h-5 w-5 text-gray-400" />
                  <Input
                    label="Search Users"
                    value={filters.search}
                    onChange={(e) =>
                      handleFilterChange("search", e.target.value)
                    }
                    placeholder="Search by name, email, or serial number..."
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Toggle Button */}
              <div className="md:col-span-4 flex items-center space-x-3 mt-4">
                <span className="text-sm font-medium text-gray-700">
                  Status:
                </span>
                <button
                  onClick={toggleStatus}
                  className={`relative inline-flex items-center h-6 rounded-full w-14 transition-colors duration-300 focus:outline-none ${
                    filters.status === "deposit"
                      ? "bg-green-500"
                      : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block w-6 h-6 transform bg-white rounded-full shadow-md transition-transform duration-300 ${
                      filters.status === "deposit"
                        ? "translate-x-8"
                        : "translate-x-0"
                    }`}
                  />
                </button>
                <span className="text-sm text-gray-600 capitalize">
                  {filters.status}-{filteredEntries.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {error && <ErrorMessage message={error} className="mb-6" />}

        {isLoading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Users ({financialEntries.length})
                  </h2>
                  <div className="text-sm text-gray-500">
                    Page {currentPage} of {totalPages}
                  </div>
                </div>
              </div>

              <div className="max-h-[600px] overflow-y-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 sticky top-0 z-10">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Serial Number
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
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
                        Interest
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
                        View
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Edit
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredEntries &&
                      filteredEntries.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {user.serialNumber}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="ml-4">
                                <div
                                  className="text-sm font-medium text-gray-900"
                                  onClick={() => handleViewMonth(user)}
                                >
                                  {user.fullName}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {user.loanTaken}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {user.collection}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {user.fine}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {user.interest}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {user.instalment}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {user.total}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {user.pendingLoan}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() =>
                                handleViewUser({
                                  ...user,
                                  year: Number(filters.year),
                                })
                              }
                              className="text-blue-600 hover:text-blue-900 flex items-center space-x-1"
                            >
                              <Eye className="h-4 w-4" />
                              <span>View</span>
                            </button>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium relative group">
                            <button
                              onClick={() =>
                                handleEditUserEntity({
                                  ...user,
                                  year: Number(filters.year),
                                })
                              }
                              disabled={user.isFreezed}
                              className={`flex items-center space-x-1 ${
                                user.isFreezed
                                  ? "text-gray-400 cursor-pointer"
                                  : "text-green-600 hover:text-green-900"
                              }`}
                            >
                              <Pen className="h-4 w-4" />
                              <span>Edit</span>
                            </button>

                            {/* Tooltip for disabled */}
                            {user.isFreezed && (
                              <div className="absolute bottom-full left-0 mb-2 w-max max-w-xs text-xs text-white bg-gray-800 px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-100">
                                Entry frozen
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6">
                <div className="text-sm text-gray-700">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                  {Math.min(currentPage * itemsPerPage, totalUsers)} of{" "}
                  {totalUsers} results
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

                  <div className="flex space-x-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter(
                        (page) =>
                          page === 1 ||
                          page === totalPages ||
                          Math.abs(page - currentPage) <= 2
                      )
                      .map((page, index, arr) => (
                        <React.Fragment key={page}>
                          {index > 0 && arr[index - 1] !== page - 1 && (
                            <span className="px-2 py-1 text-gray-500">...</span>
                          )}
                          <button
                            onClick={() => handlePageChange(page)}
                            className={`px-3 py-1 rounded text-sm font-medium ${
                              currentPage === page
                                ? "bg-blue-600 text-white"
                                : "text-gray-700 hover:bg-gray-100"
                            }`}
                          >
                            {page}
                          </button>
                        </React.Fragment>
                      ))}
                  </div>

                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
        {chunkedSums.length > 0 && (
          <div className="mt-8 bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-4">
              Page Summary (40 rows/page)
            </h3>
            <table className="min-w-full table-auto border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border">Group</th>
                  <th className="px-4 py-2 border">Loan Taken</th>
                  <th className="px-4 py-2 border">Collection</th>
                  <th className="px-4 py-2 border">Fine</th>
                  <th className="px-4 py-2 border">Interest</th>
                  <th className="px-4 py-2 border">Instalment</th>
                  <th className="px-4 py-2 border">Total</th>
                  <th className="px-4 py-2 border">Pending Loan</th>
                </tr>
              </thead>
              <tbody>
                {chunkedSums.map((sum, idx) => (
                  <tr key={idx} className="text-center">
                    <td className="px-4 py-2 border font-medium">
                      {sum.label}
                    </td>
                    <td className="px-4 py-2 border">{sum.loanTaken}</td>
                    <td className="px-4 py-2 border">{sum.collection}</td>
                    <td className="px-4 py-2 border">{sum.fine}</td>
                    <td className="px-4 py-2 border">{sum.interest}</td>
                    <td className="px-4 py-2 border">{sum.instalment}</td>
                    <td className="px-4 py-2 border">{sum.total}</td>
                    <td className="px-4 py-2 border">{sum.pendingLoan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AdminDashboardPage;
