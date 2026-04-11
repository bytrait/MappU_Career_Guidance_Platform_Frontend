import React from "react";
import logo from "../assets/bytrait_logo.png"; // adjust if path differs
import { logout } from "../services/auth";    // use the logout function we wrote earlier

export default function Navbar({ onLogout }) {
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
      {/* Logo */}
      <div className="flex items-center">
        <img src={logo} alt="Careerlogy Logo" className="h-10 w-auto" />
      </div>

      {/* Logout button */}
      <button
        onClick={handleLogout}
        className="px-4 py-2 text-white bg-primary rounded-full hover:bg-primary-dark transition"
      >
        Log out
      </button>
    </nav>
  );
}
