import React from "react";
import { Menu, LogOut, Bell, User } from "lucide-react";

interface AdminHeaderProps {
  onMenuClick: () => void;
  onLogout: () => void;
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 11) return "Selamat pagi";
  if (hour < 15) return "Selamat siang";
  if (hour < 18) return "Selamat sore";
  return "Selamat malam";
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ onMenuClick, onLogout }) => {
  const greeting = getGreeting();
  return (
    <header className="bg-white/80 backdrop-blur-lg shadow-xl border-b-2 border-xptn-yellow sticky top-0 z-40 animate-fade-in">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left side */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-md text-xptn-dark hover:text-xptn-yellow hover:bg-yellow-50 transition-colors duration-200"
            >
              <Menu className="h-7 w-7" />
            </button>
            <div className="flex items-center space-x-4">
              <span className="text-xl md:text-2xl font-bold text-xptn-dark tracking-tight leading-tight">
                {greeting}, Admin!
              </span>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-xptn-dark hover:text-xptn-yellow hover:bg-yellow-50 rounded-md transition-colors duration-200">
              <Bell className="h-6 w-6" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-xptn-yellow rounded-full flex items-center justify-center shadow">
                <User className="h-6 w-6 text-xptn-dark" />
              </div>
              <span className="text-base font-semibold text-xptn-dark">
                Admin XPTN
              </span>
            </div>
            <button
              onClick={onLogout}
              className="p-2 text-xptn-dark hover:text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200"
              title="Logout"
            >
              <LogOut className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
