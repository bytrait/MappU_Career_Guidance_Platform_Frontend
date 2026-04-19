// src/layouts/PublicLayout.jsx
import { Outlet, useLocation } from "react-router-dom";
import logo from "../assets/bytrait_logo.png";

export default function PublicLayout() {
  const location = useLocation();

  // Only hide navbar on these exact pages
  const hiddenNavbarRoutes = ["/demo", "/demo/welcome"];

  const isNavbarHidden = hiddenNavbarRoutes.includes(location.pathname);
  console.log("Current path:", location.pathname, " - Navbar hidden:", isNavbarHidden);

  return (
    <div
      className={`${isNavbarHidden ? "min-h-screen" : "min-h-screen pt-6"}`}
      style={{
        background:
          "linear-gradient(50deg, #F4F5F8 0%, #F4F5F8 85%, #4140FE 120%)",
      }}
    >
      {!isNavbarHidden && (
        <nav className="w-full max-w-7xl mx-auto flex items-center justify-between px-6 py-3 rounded-full bg-white">
          <div className="flex items-center">
            <img
              src={logo}
              alt="Careerlogy Logo"
              className="h-10 w-auto"
            />
          </div>
        </nav>
      )}

      <Outlet />
    </div>
  );
}