import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LogOut, User, Settings } from "lucide-react";
import { logout } from "../../store/slices/authSlice";
import { useAuth } from "../../hooks/useAuth";
import { routes } from "../../routes";
import { headings } from "../../common/constants";
import { resetFinanceState } from "../../store/slices/financeSlice";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAdmin, fullName } = useAuth();
  const { titlePart1, titlePart2, dashboard, pendingApprovals } = headings;

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetFinanceState());
    navigate(routes.login);
  };

  return (
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link
              to={isAdmin ? routes.adminDashboard : routes.userDashboard}
              className="flex items-center"
            >
              <div className="bg-blue-600 p-2 rounded-lg">
                <Settings className="h-6 w-6 text-white" />
              </div>
              <div className="ml-3">
                <h1 className="text-xl font-semibold text-gray-900">
                  {titlePart1}
                </h1>
                <p className="text-sm text-gray-500">{titlePart2}</p>
              </div>
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            {isAdmin ? (
              <>
                <Link
                  to={routes.adminDashboard}
                  className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {dashboard}
                </Link>
                <Link
                  to={routes.adminPendingApprovals}
                  className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {pendingApprovals}
                </Link>
                <Link
                  to={routes.insertUserEntry}
                  className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {"Insert Entry"}
                </Link>
              </>
            ) : (
              <Link
                to={routes.userDashboard}
                className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {dashboard}
              </Link>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-700 hidden sm:block">
                {fullName}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:block">{headings.logout}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
