import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useTenant } from "../context/TenantContext";
import { authRedirectUrl } from "../utils/tenantSlug";

function PrivateLayout() {
  const location = useLocation();
  const tenant = useTenant();

  const handleLogout = () => {
    window.location.href = authRedirectUrl(tenant?.code, "/");
  };

  const hideNavbarRoutes = ["/", "/payment"];
  const isNavbarHidden = hideNavbarRoutes.includes(location.pathname);

  return (
    <div
      className={`${isNavbarHidden ? "min-h-screen" : "min-h-screen pt-6"}`}
      style={{
        background:
          "linear-gradient(50deg, #F4F5F8 0%, #F4F5F8 85%, #4140FE 120%)",
      }}
    >
      <main>
        {!isNavbarHidden && <Navbar onLogout={handleLogout} />}
        <Outlet />
      </main>
    </div>
  );
}

export default PrivateLayout;
