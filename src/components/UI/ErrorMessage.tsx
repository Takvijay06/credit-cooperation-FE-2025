import React from "react";
import { AlertTriangle } from "lucide-react";
import { ErrorMessageProps } from "../../common/interfaces/components";
import { emptyValue } from "../../common/constants";

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  className = emptyValue,
}) => {
  return (
    <div
      className={`flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-md ${className}`}
    >
      <AlertTriangle className="h-5 w-5" />
      <span className="text-sm">{message}</span>
    </div>
  );
};

export default ErrorMessage;
