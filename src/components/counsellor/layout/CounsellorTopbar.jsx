import { Menu } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../../assets/bytrait_logo.png";
import { logout } from "../../../services/auth";

export default function CounsellorTopbar({ setSidebarOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Auto-generate page title from route
  const getPageTitle = () => {
    if (location.pathname.includes("students")) return "Students";
    if (location.pathname.includes("schools")) return "Schools";
    if (location.pathname.includes("billing")) return "Billing";
    if (location.pathname.includes("settings")) return "Settings";
    return "Dashboard";
  };

  const handleLogout = async () => {
    const redirectUrl = import.meta.env.VITE_REDIRECT_URL;

    try {
      await logout();
      window.location.href = redirectUrl;
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <header className="bg-white border-b border-slate-200 px-4 md:px-8 py-4 flex items-center justify-between">

      {/* LEFT SECTION */}
      <div className="flex items-center gap-4">

        {/* Mobile Menu */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden text-slate-600 hover:text-slate-900 transition"
        >
          <Menu size={22} />
        </button>

        {/* Brand Logo */}
        <div
          onClick={() => navigate("/counsellor/dashboard")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img src={logo} alt="ByTrait Logo" className="h-8 w-auto" />
        </div>

        </div>

        {/* Centered Page Title (horizontal center on md+) */}
        <div className="hidden md:flex md:flex-1 md:justify-center">
          <div className="flex items-center gap-4">
            {/* Page Title */}
            <h1 className="text-lg md:text-xl font-semibold text-slate-800">
              {getPageTitle()}
            </h1>
          </div>
        </div>

        {/* RIGHT SECTION */}
      <div className="flex items-center gap-4">

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-all duration-200"
        >
          Logout
        </button>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold text-sm">
          C
        </div>

      </div>
    </header>
  );
}
