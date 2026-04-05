import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState } from "react";

function PrivateLayout() {

  const handleLogout = () => {
    const redirectUrl = import.meta.env.VITE_REDIRECT_URL;
    window.location.href = redirectUrl;
  };

  return (
    <div
      className="py-6"
      style={{
        background: "linear-gradient(50deg, #F4F5F8 0%, #F4F5F8 85%, #4140FE 120%)"
      }}
    >
      <main>
        <Navbar onLogout={handleLogout} />
        <Outlet />
      </main>
    </div>
  );
}

export default PrivateLayout;
