import React from "react";
import { Header } from "./";
import { useAuth } from "../../hooks/useAuth";
import { LayoutProps } from "../../common/interfaces/components";

const Layout: React.FC<LayoutProps> = ({ children, showHeader = true }) => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {showHeader && isAuthenticated && <Header />}
      <main className={showHeader && isAuthenticated ? "pt-0" : ""}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
