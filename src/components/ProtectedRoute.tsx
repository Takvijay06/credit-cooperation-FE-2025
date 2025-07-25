import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import LoadingSpinner from "./UI/LoadingSpinner";
import { ProtectedRouteProps } from "../common/interfaces/components";
import { routes } from "../routes";

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAdmin = false,
}) => {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={routes.login} replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to={routes.unauthorized} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
