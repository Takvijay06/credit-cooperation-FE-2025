import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import { useAuth } from "../hooks";

import LoginPage from "../pages/AuthPages/LoginPage";
import SignupPage from "../pages/AuthPages/SignupPage";
import OTPVerificationPage from "../pages/AuthPages/OTPVerificationPage";
import UserNotificationPage from "../pages/AuthPages/UserNotificationPage";
import ErrorPage from "../pages/common/ErrorPage";

// User Pages
import UserFinancialYearPage from "../pages/UserPages/UserFinancialYearPage";
import UserFinancialMonthPage from "../pages/AdminPages/UserFinancialMonthPage";

// Admin Pages
import AdminDashboardPage from "../pages/AdminPages/AdminDashboardPage";
import AdminPendingApprovalPage from "../pages/AdminPages/AdminPendingApprovalPage";
import InsertFinancialEntriesPage from "../pages/AdminPages/FinancialEntryInsert";
import { routes } from ".";
import EditFinancialDetails from "../pages/AdminPages/EditFinancialDetails";
import UsersLoanPerMonth from "../pages/AdminPages/UsersLoanPerMonth";

export const AppRoutes: React.FC = () => {
  const { isAuthenticated, isAdmin } = useAuth();

  const publicRoutes = [
    { path: routes.login, element: <LoginPage /> },
    { path: routes.signUp, element: <SignupPage /> },
    { path: routes.verifyOtp, element: <OTPVerificationPage /> },
    { path: routes.userNotification, element: <UserNotificationPage /> },
  ];

  const userRoutes = [
    { path: routes.userDashboard, element: <UserFinancialYearPage /> },
    {
      path: routes.financialDetailsPerMonth,
      element: <UserFinancialMonthPage />,
    },
    {
      path: routes.financialDetailsEditPerMonth,
      element: <EditFinancialDetails />,
    },
  ];

  const adminRoutes = [
    { path: routes.adminDashboard, element: <AdminDashboardPage /> },
    { path: routes.adminPendingApprovals, element: <AdminPendingApprovalPage /> },
    { path: routes.insertUserEntry, element: <InsertFinancialEntriesPage /> },
    { path: routes.usersLoan, element: <UsersLoanPerMonth /> },
  ];

  return (
    <Routes>
      {/* Public Routes */}
      {publicRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}

      {/* Protected User Routes */}
      {userRoutes.map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={<ProtectedRoute>{element}</ProtectedRoute>}
        />
      ))}

      {/* Protected Admin Routes */}
      {adminRoutes.map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={<ProtectedRoute requireAdmin>{element}</ProtectedRoute>}
        />
      ))}

      {/* Redirect based on role */}
      <Route
        path={routes.home}
        element={
          <Navigate
            to={
              !isAuthenticated
                ? routes.login
                : isAdmin
                ? routes.adminDashboard
                : routes.userDashboard
            }
            replace
          />
        }
      />

      {/* Error Routes */}
      <Route path={routes.unauthorized} element={<ErrorPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};
