import React from "react";
import { Check, Mail } from "lucide-react";
import { Button } from "../../../components/UI";

interface PendingUser {
  id: string;
  serialNumber: string;
  fullName: string;
  email: string;
}

interface Props {
  users: PendingUser[];
  isLoading: boolean;
  onApprove: (userId: string) => void;
}

export const PendingUserRequestsTable: React.FC<Props> = ({
  users,
  isLoading,
  onApprove,
}) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">
          Users Awaiting Approval ({users.length})
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr key={"heading"}>
              {["Serial Number", "Full Name", "Email", "Actions"].map(
                (head) => (
                  <th
                    key={head}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {head}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{user.serialNumber}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-sm font-medium text-blue-600">
                      {user.fullName.toUpperCase()}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{user.email}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-medium">
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => onApprove(user.serialNumber)}
                    disabled={isLoading}
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Approve
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
