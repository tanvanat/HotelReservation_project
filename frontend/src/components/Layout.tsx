import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import type { Variant } from "../types/models";
import {
  GLOBAL_VARIANT_KEY,
  setGlobalVariant,
  getOrAssignGlobalVariant,
} from "../hooks/useGlobalVariant";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [variant, setVariantState] = useState<Variant>("A");

  useEffect(() => {
    setVariantState(getOrAssignGlobalVariant());
  }, []);

  const switchTo = (v: Variant) => {
    setGlobalVariant(v);
    console.log(
      "SET",
      GLOBAL_VARIANT_KEY,
      "=",
      localStorage.getItem(GLOBAL_VARIANT_KEY)
    );
    window.location.reload();
  };

  return (
    <div className="app-root">
      <header className="app-header">
        <div className="logo">TripTweak</div>

        {/* ขวาบนเหมือนเดิม */}
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

      {/* ✅ Floating Variant Switch (ชิดขอบซ้าย กึ่งกลางจอ) */}
      <div className="variant-float">
        <div className="variant-panel">
          <div className="variant-title">Experiment</div>

          <div className="variant-segment" role="group" aria-label="Variant switch">
            <button
              type="button"
              onClick={() => switchTo("A")}
              className={`variant-btn ${variant === "A" ? "is-active is-a" : ""}`}
              aria-pressed={variant === "A"}
            >
              A
            </button>

            <button
              type="button"
              onClick={() => switchTo("B")}
              className={`variant-btn ${variant === "B" ? "is-active is-b" : ""}`}
              aria-pressed={variant === "B"}
            >
              B
            </button>
          </div>

          <div className="variant-sub">
            Current: <span className="variant-sub-strong">{variant}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
