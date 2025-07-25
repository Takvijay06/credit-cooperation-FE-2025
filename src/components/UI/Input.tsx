import React from "react";
import { emptyValue } from "../../common/constants";
import { InputProps } from "../../common/interfaces/components";

const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  className = emptyValue,
  ...props
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        className={`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
          error ? "border-red-300 focus:ring-red-500 focus:border-red-500" : ""
        } ${className}`}
        {...props}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

export default Input;
