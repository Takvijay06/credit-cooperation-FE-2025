import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FilePlus, User, DollarSign, Info, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Layout } from "../../components/Layout";
import {
  Button,
  ErrorMessage,
  InputWithIcon,
  Select,
} from "../../components/UI";
import {
  automateUsersFinancialEntriesInsertion,
  insertFinancialEntry,
} from "../../store/slices/financeSlice";
import { AppDispatch } from "../../store";
import { routes } from "../../routes";
import { monthOptions, yearOptions } from "../../common/constants";

const InsertFinancialEntriesPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<"manual" | "auto" | "freeze">(
    "auto"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [isFreezing, setIsFreezing] = useState(false);
  const [showFreezeMessage, setShowFreezeMessage] = useState(false);

  const [formData, setFormData] = useState({
    serialNumber: "",
    month: new Date().toLocaleString("default", { month: "long" }),
    year: new Date().getFullYear().toString(),
    loanTaken: "0",
    collection: "1000",
    fine: "0",
    instalment: "0",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.serialNumber.trim())
      newErrors.serialNumber = "Serial Number is required";
    if (!formData.month.trim()) newErrors.month = "Month is required";
    if (!formData.year.trim()) newErrors.year = "Year is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) return;

    try {
      const parsedData = {
        serialNumber: parseInt(formData.serialNumber),
        month: formData.month,
        year: parseInt(formData.year),
        loanTaken: parseInt(formData.loanTaken) || 0,
        collection: parseInt(formData.collection) || 0,
        fine: parseInt(formData.fine) || 0,
        instalment: parseInt(formData.instalment) || 0,
      };
      await dispatch(insertFinancialEntry(parsedData));
      navigate(routes.adminDashboard);
    } catch (err: any) {
      setError(err || "Failed to insert entry");
    }
  };

  const handleAutoGenerateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const parsedData = {
        month: formData.month,
        year: formData.year,
      };
      await dispatch(automateUsersFinancialEntriesInsertion(parsedData));
    } catch (err: any) {
      setError(err || "Failed to insert entry");
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Tab Switcher */}
          <div className="flex space-x-4 mb-6">
            <button
              className={`px-4 py-2 rounded-t-md font-medium ${
                activeTab === "auto"
                  ? "bg-white text-indigo-600 border-b-2 border-indigo-600"
                  : "bg-gray-200 text-gray-600"
              }`}
              onClick={() => setActiveTab("auto")}
            >
              Automate Entry
            </button>
            <button
              className={`px-4 py-2 rounded-t-md font-medium ${
                activeTab === "manual"
                  ? "bg-white text-indigo-600 border-b-2 border-indigo-600"
                  : "bg-gray-200 text-gray-600"
              }`}
              onClick={() => setActiveTab("manual")}
            >
              Insert Entry
            </button>
            <button
              className={`px-4 py-2 rounded-t-md font-medium ${
                activeTab === "freeze"
                  ? "bg-white text-indigo-600 border-b-2 border-indigo-600"
                  : "bg-gray-200 text-gray-600"
              }`}
              onClick={() => setActiveTab("freeze")}
            >
              Freeze Entries
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main Section */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header */}
              <div className="flex items-center space-x-4">
                <div className="h-14 w-14 bg-green-600 rounded-full flex items-center justify-center">
                  {activeTab === "manual" ? (
                    <FilePlus className="h-7 w-7 text-white" />
                  ) : (
                    <Settings className="h-7 w-7 text-white" />
                  )}
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    {activeTab === "manual" && "Insert Financial Entry"}
                    {activeTab === "auto" && "Automate Monthly Entry"}
                    {activeTab === "freeze" && "Freeze Monthly Entry"}
                  </h2>
                  <p className="text-gray-600">
                    {activeTab === "manual" &&
                      "Fill in financial details for a member this month."}
                    {activeTab === "auto" &&
                      "Automatically populate financial records for a selected month/year."}
                    {activeTab === "freeze" &&
                      "Freeze financial records for a selected month/year."}
                  </p>
                </div>
              </div>

              {/* Manual Entry Form */}
              {activeTab === "manual" && (
                <div className="bg-white p-8 rounded-xl shadow">
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    {error && <ErrorMessage message={error} />}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <InputWithIcon
                        label="Serial Number"
                        name="serialNumber"
                        type="number"
                        value={formData.serialNumber}
                        onChange={handleChange}
                        error={errors.serialNumber}
                        placeholder="e.g. 101"
                        Icon={User}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Select
                        label="Month"
                        name="month"
                        value={formData.month}
                        onChange={handleChange}
                        options={monthOptions}
                      />
                      <Select
                        label="Year"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        options={yearOptions}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <InputWithIcon
                        label="Loan Taken"
                        name="loanTaken"
                        type="number"
                        value={formData.loanTaken}
                        onChange={handleChange}
                        placeholder="e.g. 10000"
                        Icon={DollarSign}
                      />
                      <InputWithIcon
                        label="Collection"
                        name="collection"
                        type="text"
                        value={formData.collection}
                        onChange={handleChange}
                        placeholder="e.g. 5000"
                        Icon={DollarSign}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <InputWithIcon
                        label="Fine"
                        name="fine"
                        type="text"
                        value={formData.fine}
                        onChange={handleChange}
                        placeholder="e.g. 100"
                        Icon={DollarSign}
                      />
                      <InputWithIcon
                        label="Installment"
                        name="instalment"
                        type="text"
                        value={formData.instalment}
                        onChange={handleChange}
                        placeholder="e.g. 3000"
                        Icon={DollarSign}
                      />
                    </div>

                    <Button type="submit" className="w-full mt-4" size="lg">
                      Submit Entry
                    </Button>
                  </form>
                </div>
              )}

              {activeTab === "auto" && (
                <div className="bg-white p-8 rounded-2xl shadow-xl space-y-8">
                  {/* Month & Year Select */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Select
                      label="Month"
                      name="month"
                      value={formData.month}
                      onChange={handleChange}
                      options={monthOptions}
                    />
                    <Select
                      label="Year"
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      options={yearOptions}
                    />
                  </div>

                  {/* Progress Bar */}
                  {isLoading && (
                    <div className="h-1 w-full bg-gray-200 rounded overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 animate-progress"></div>
                    </div>
                  )}

                  {/* Button */}
                  <button
                    disabled={isLoading}
                    onClick={(e) => {
                      setIsLoading(true);
                      setShowMessage(false);
                      handleAutoGenerateSubmit(e);
                      setTimeout(() => {
                        setIsLoading(false);
                        setShowMessage(true);
                        setTimeout(() => setShowMessage(false), 5000);
                      }, 2000);
                    }}
                    className={`w-full py-3 px-6 text-white text-lg font-semibold rounded-xl transition-all duration-300
        ${
          isLoading
            ? "bg-blue-300 cursor-not-allowed"
            : "bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 shadow-md hover:shadow-lg"
        }
      `}
                  >
                    {isLoading ? "Generating..." : "Generate Auto Entries"}
                  </button>

                  {/* Message */}
                  {showMessage && (
                    <div className="text-green-600 font-medium text-center transition-opacity duration-300">
                      Auto entries generated successfully!
                    </div>
                  )}
                </div>
              )}

              {activeTab === "freeze" && (
                <div className="bg-white p-8 rounded-2xl shadow-xl space-y-8">
                  {/* Select Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Select
                      label="Month"
                      name="month"
                      value={formData.month}
                      onChange={handleChange}
                      options={monthOptions}
                    />
                    <Select
                      label="Year"
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      options={yearOptions}
                    />
                  </div>

                  {/* Progress Bar */}
                  {isFreezing && (
                    <div className="h-1 w-full bg-gray-200 rounded overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 animate-progress"></div>
                    </div>
                  )}

                  {/* Button */}
                  <button
                    disabled={isFreezing}
                    onClick={() => {
                      setIsFreezing(true);
                      setShowFreezeMessage(false);
                      setTimeout(() => {
                        setIsFreezing(false);
                        setShowFreezeMessage(true);
                        setTimeout(() => setShowFreezeMessage(false), 5000);
                      }, 2000);
                    }}
                    className={`w-full py-3 px-6 text-white text-lg font-semibold rounded-xl transition-all duration-300
        ${
          isFreezing
            ? "bg-blue-300 cursor-not-allowed"
            : "bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 shadow-md hover:shadow-lg"
        }
      `}
                  >
                    {isFreezing ? "Freezing..." : "❄️ Freeze Entries"}
                  </button>

                  {/* Message */}
                  {showFreezeMessage && (
                    <div className="text-green-600 font-medium text-center transition-opacity duration-300">
                      Entries frozen successfully!
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Sidebar Section */}
            <div className="space-y-6 mt-0 lg:mt-24">
              <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
                <div className="flex items-start space-x-3">
                  <Info className="h-5 w-5 text-green-600 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {activeTab === "manual"
                        ? "Entry Guidelines"
                        : activeTab === "auto"
                        ? "Auto Entry Info"
                        : "Freeze Entities Info"}
                    </h3>
                    <ul className="mt-2 list-disc pl-5 text-sm text-gray-600 space-y-1">
                      {activeTab === "manual" && (
                        <>
                          <li>Use correct Serial Number of the member</li>
                          <li>Month must be in full form (e.g., "June")</li>
                          <li>All amounts must be numbers (₹)</li>
                          <li>Leave 0 for non-applicable fields</li>
                        </>
                      )}
                      {activeTab === "auto" && (
                        <>
                          <li>
                            This will auto-generate default entries for each
                            user
                          </li>
                          <li>Use only once per month/year</li>
                          <li>Defaults can be overridden manually later</li>
                          <li>Make sure month/year is correct</li>
                        </>
                      )}
                      {activeTab === "freeze" && (
                        <>
                          <li>
                            This will freeze entries for particular month-year
                          </li>
                          <li>Use only once per month/year</li>
                          <li>
                            No edit entry for particular month/year, if you
                            perform this operation.
                          </li>
                          <li>Make sure month/year is correct</li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default InsertFinancialEntriesPage;
