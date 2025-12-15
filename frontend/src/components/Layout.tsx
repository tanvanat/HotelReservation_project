import React from "react";
import { Link, useLocation } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="app-root">
      <header className="app-header">
        <div className="logo">TripTweak</div>
        <nav className="nav-links">
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>
            Hotels
          </Link>
          <Link
            to="/admin"
            className={location.pathname.startsWith("/admin") ? "active" : ""}
          >
            Admin Dashboard
          </Link>
        </nav>
      </header>
      <main className="app-main">{children}</main>
    </div>
  );
};

export default Layout;
