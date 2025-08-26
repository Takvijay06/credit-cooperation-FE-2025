import LoanTakenTable from "../../../components/UI/LoanTable";
import { LoanUserRequest } from "../../../types";
import NoData from "./noData";
import labels from "../../../utils/labels.json";

const LoanTable: React.FC<{
  isLoading: boolean;
  loans: LoanUserRequest[];
  month: string;
  year: string;
}> = ({ isLoading, loans, month, year }) => (
  <div className="bg-white rounded-lg shadow-md px-6 py-8">
    {isLoading ? (
      <div className="text-center py-8 text-gray-500">
        {labels.loading.message}
      </div>
    ) : loans.length > 0 ? (
      <LoanTakenTable loans={loans} month={month} year={year} />
    ) : (
      <NoData month={month} year={year} />
    )}
  </div>
);

export default LoanTable;
