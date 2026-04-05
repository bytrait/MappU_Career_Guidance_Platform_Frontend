import { Link, useLocation } from "react-router-dom";

export default function CounsellorSidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();

  const menuItems = [
    { name: "Overview", path: "/counsellor/dashboard" },
    { name: "Students", path: "/counsellor/students" },
    { name: "Schools", path: "/counsellor/schools" },
    { name: "Billing", path: "/counsellor/billing" },
  ];

  return (
    <>
      {/* Overlay (mobile only) */}
      <div
        onClick={() => setSidebarOpen(false)}
        className={`
          fixed inset-0 bg-black/30 backdrop-blur-sm z-40
          transition-opacity duration-300
          ${sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
          md:hidden
        `}
      />

      {/* Sidebar */}
      <aside
        className={`
          fixed md:relative z-50
          h-full w-64 bg-white border-r border-slate-200
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div className="px-4 py-4">
          <h2 className="text-lg font-semibold text-slate-800">
            Counsellor Panel
          </h2>
        </div>

        <nav className="mt-6 space-y-1 px-3">
          {menuItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);

            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center px-4 py-2 rounded-xl text-sm font-medium
                  transition-all duration-200
                  ${
                    isActive
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-slate-600 hover:bg-slate-100"
                  }
                `}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
