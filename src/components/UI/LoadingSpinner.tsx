import React from "react";
import { Loader2 } from "lucide-react";
import { LoadingSpinnerProps } from "../../common/interfaces/components";
import { emptyValue } from "../../common/constants";

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  className = emptyValue,
}) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  return (
    <Loader2 className={`animate-spin ${sizeClasses[size]} ${className}`} />
  );
};

export default LoadingSpinner;
