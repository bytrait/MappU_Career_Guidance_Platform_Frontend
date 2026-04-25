import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

function PrivateLayout() {
  const location = useLocation();

  const handleLogout = () => {
    const redirectUrl = import.meta.env.VITE_REDIRECT_URL;
    window.location.href = redirectUrl;
  };

  // Hide navbar"/"
  const hideNavbarRoutes = ["/","/payment"];

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