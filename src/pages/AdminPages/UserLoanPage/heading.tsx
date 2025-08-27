import React from "react";
import { Info } from "lucide-react";
import labels from "../../../utils/labels.json";

const Heading: React.FC<{ month: string; year: string }> = ({
  month,
  year,
}) => (
  <div className="flex items-center gap-4">
    <div className="h-14 w-14 bg-green-600 rounded-full flex items-center justify-center">
      <Info className="h-7 w-7 text-white" />
    </div>
    <div>
      <h2 className="text-3xl font-bold text-gray-900">
        {labels.header.loanPagetitle} {month} - {year}
      </h2>
      <p className="text-gray-600">{labels.header.loanPagesubtitle}</p>
    </div>
  </div>
);

export default React.memo(Heading);
