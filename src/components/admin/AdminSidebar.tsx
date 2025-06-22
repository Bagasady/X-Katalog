import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Tags,
  Settings,
  X,
  Store,
  BarChart3,
} from "lucide-react";

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const menuItems = [
    { path: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/admin/products", icon: Package, label: "Produk" },
    { path: "/admin/categories", icon: Tags, label: "Kategori" },
    { path: "/admin/analytics", icon: BarChart3, label: "Analytics" },
    { path: "/admin/settings", icon: Settings, label: "Pengaturan" },
  ];
  const isActive = (path: string) => location.pathname === path;
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 lg:hidden"
          onClick={onClose}
        />
      )}
      {/* Sidebar */}
      <aside
        className={`
        fixed top-0 left-0 z-40 w-64 h-screen bg-white/80 backdrop-blur-lg border-r-2 border-xptn-yellow shadow-xl flex flex-col flex-shrink-0 overflow-y-auto transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:inset-0
      `}
      >
        <div className="flex items-center justify-between p-5 border-b border-xptn-border flex-shrink-0">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-xptn-yellow to-yellow-200 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
              <Store className="h-7 w-7 text-xptn-dark" />
            </div>
            <div>
              <span className="text-2xl font-extrabold text-xptn-dark tracking-tight leading-tight">
                X-Katalog
              </span>
              <div className="text-xs text-gray-500 font-medium tracking-wide">
                Admin Panel
              </div>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-md text-xptn-dark hover:text-xptn-yellow hover:bg-yellow-50 transition-colors duration-200"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="p-4 space-y-2 flex-1 min-h-0">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => onClose()}
                className={`
                  flex items-center space-x-4 px-5 py-3 rounded-xl font-semibold text-base transition-all duration-200 group
                  ${
                    isActive(item.path)
                      ? "bg-xptn-yellow/90 text-xptn-dark shadow-lg border-2 border-xptn-yellow-hover"
                      : "text-xptn-dark hover:bg-yellow-50 hover:text-xptn-yellow border-2 border-transparent hover:border-xptn-yellow"
                  }
                `}
              >
                <Icon className="h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
                <span className="ml-1">{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto mb-6 px-4">
          <Link
            to="/"
            className="flex items-center space-x-3 px-5 py-3 text-base text-gray-600 hover:text-xptn-yellow hover:bg-yellow-50 rounded-xl transition-colors duration-200 font-semibold shadow"
          >
            <Store className="h-5 w-5" />
            <span>Lihat Katalog</span>
          </Link>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
