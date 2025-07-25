import { UserCheck } from "lucide-react";

export const NoUserRequests = () => (
  <div className="text-center py-12">
    <UserCheck className="mx-auto h-12 w-12 text-gray-400" />
    <h3 className="mt-2 text-sm font-medium text-gray-900">
      No pending approvals
    </h3>
    <p className="mt-1 text-sm text-gray-500">
      All users have been approved or there are no new registrations
    </p>
  </div>
);
