// src/layouts/PublicLayout.jsx
import { Outlet } from "react-router-dom";
import logo from "../assets/bytrait_logo.png"; // adjust if path differs

export default function PublicLayout() {
    return (
        <div
            className="py-6"
            style={{
                background: "linear-gradient(50deg, #F4F5F8 0%, #F4F5F8 85%, #4140FE 120%)",
            }}
        >
           
            <nav className="w-full max-w-7xl mx-auto flex items-center justify-between px-6 py-3 rounded-full bg-white">
                {/* Logo */}
                <div className="flex items-center">
                    <img src={logo} alt="Careerlogy Logo" className="h-10 w-auto" />
                </div>


            </nav>      
            <Outlet />
        </div>
    );
}
