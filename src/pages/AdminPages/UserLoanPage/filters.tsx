import React from "react";
import { monthOptions, yearOptions } from "../../../common/constants";
import { Select } from "../../../components/UI";
import labels from "../../../utils/labels.json";

const FilterDropdown: React.FC<{
  filters: { year: string; month: string };
  onChange: (field: string, value: string) => void;
}> = ({ filters, onChange }) => (
  <div className="bg-white p-6 rounded-lg shadow-md w-full">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Select
        label={labels.filters.year}
        value={filters.year}
        onChange={(e) => onChange(labels.elementValue.year, e.target.value)}
        options={yearOptions}
      />
      <Select
        label={labels.filters.month}
        value={filters.month}
        onChange={(e) => onChange(labels.elementValue.month, e.target.value)}
        options={monthOptions}
      />
    </div>
  </div>
);
export default React.memo(FilterDropdown);
