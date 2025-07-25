import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserCheck } from "lucide-react";

import { Layout } from "../../../components/Layout";
import { LoadingSpinner, ErrorMessage } from "../../../components/UI";
import { PendingUserRequestsTable } from "./pendingUserRequestsTable";
import { NoUserRequests } from "./noUserRequests";

import { AppDispatch, RootState } from "../../../store";
import { fetchPendingUsers, approveUser } from "../../../store/slices/adminSlice";

const AdminPendingApprovalPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { pendingUsers, isLoading, error } = useSelector(
    (state: RootState) => state.admin
  );

  useEffect(() => {
    dispatch(fetchPendingUsers());
  }, [dispatch]);

  const handleApprove = async (userId: string) => {
    await dispatch(approveUser(userId));
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3">
            <UserCheck className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Pending User Approvals
              </h1>
              <p className="text-gray-600">
                Review and approve new user registrations
              </p>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && <ErrorMessage message={error} className="mb-6" />}

        {/* Loading */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : pendingUsers && pendingUsers && pendingUsers.length > 0 ? (
          <PendingUserRequestsTable
            users={pendingUsers}
            isLoading={isLoading}
            onApprove={handleApprove}
          />
        ) : (
          <NoUserRequests />
        )}
      </div>
    </Layout>
  );
};

export default AdminPendingApprovalPage;
