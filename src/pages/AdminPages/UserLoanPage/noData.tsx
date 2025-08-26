import { Ban } from "lucide-react";
import labels from "../../../utils/labels.json";

const NoData: React.FC<{ month: string; year: string }> = ({ month, year }) => (
  <div className="flex flex-col items-center justify-center text-center text-gray-500 py-12">
    <div className="bg-gray-100 p-4 rounded-full mb-4">
      <Ban className="h-10 w-10 text-gray-400" />
    </div>
    <h3 className="text-xl font-semibold">
      {labels.table.loanPageNoDataFound}
    </h3>
    <p className="text-sm mt-1">
      {labels.table.loanPageNoUsersFound} {month} {year}.
    </p>
  </div>
);

export default NoData;
