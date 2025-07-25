import React from "react";
import { AuthPageHeaderProps } from "../../common/interfaces/components";

export const AuthPageHeader: React.FC<AuthPageHeaderProps> = ({
  icon: Icon,
  title,
  subtitle,
}) => {
  return (
    <div className="text-center">
      <div className="mx-auto h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center">
        <Icon className="h-8 w-8 text-white" />
      </div>
      <h2 className="mt-6 text-3xl font-extrabold text-gray-900">{title}</h2>
      <p className="mt-2 text-sm text-gray-600">{subtitle}</p>
    </div>
  );
};
