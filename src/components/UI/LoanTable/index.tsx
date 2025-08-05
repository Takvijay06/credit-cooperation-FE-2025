import React from "react";
import { LoanUserRequest } from "../../../types";

interface Props {
  loans: LoanUserRequest[];
  month: string;
  year: string;
};

const LoanTakenTable: React.FC<Props> = ({ loans, month, year }) => {
  if (!loans || loans.length === 0) return null;

  return (
    <div className="bg-white mt-6 rounded-lg shadow overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-900">
          Loan Given - {month} ({year})
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Serial Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Loan Amount
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loans.map((loan, index) => (
              <tr key={index}>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {loan.serialNumber}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {loan.fullName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  ₹ {loan.loanTaken}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LoanTakenTable;
