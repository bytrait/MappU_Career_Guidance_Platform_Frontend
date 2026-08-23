// src/layouts/PublicLayout.jsx
import { Outlet, useLocation } from "react-router-dom";
import { useTenant } from "../context/TenantContext";

export default function PublicLayout() {
  const location = useLocation();
  const tenant = useTenant();
  const logo = tenant?.theme?.logo || "/logos/bytrait_logo.png";
  const brandName = tenant?.name || "ByTrait";

  // Only hide navbar on these exact pages
  const hiddenNavbarRoutes = ["/demo", "/demo/welcome"];

  const isNavbarHidden = hiddenNavbarRoutes.includes(location.pathname);

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
              alt={`${brandName} Logo`}
              className="h-10 w-auto"
            />
          </div>
        </nav>
      )}

      <Outlet />
    </div>
  );
}
