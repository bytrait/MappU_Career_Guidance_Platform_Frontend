import React from "react";
import { logout } from "../services/auth";
import { useTenant } from "../context/TenantContext";

export default function Navbar({ onLogout }) {
  const tenant = useTenant();
  const logo = tenant?.theme?.logo || "/logos/bytrait_logo.png";
  const brandName = tenant?.name || "ByTrait";

  const handleLogout = async () => {
    try {
      await logout();
      if (onLogout) onLogout();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="w-full max-w-7xl mx-auto flex items-center justify-between px-6 py-3 rounded-full bg-white">
      <div className="flex items-center">
        <img src={logo} alt={`${brandName} Logo`} className="h-10 w-auto" />
      </div>

      <button
        onClick={handleLogout}
        className="px-4 py-2 text-white bg-primary rounded-full hover:bg-primary-dark transition"
      >
        Log out
      </button>
    </nav>
  );
}
