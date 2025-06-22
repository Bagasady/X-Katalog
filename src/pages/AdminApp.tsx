import { useState, useRef, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminHeader from "../components/admin/AdminHeader";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminDashboard from "../components/admin/AdminDashboard";
import AdminProducts from "../components/admin/AdminProducts";
import AdminCategories from "../components/admin/AdminCategories";
import AdminSettings from "../components/admin/AdminSettings";
import AdminAnalytics from "../components/admin/AdminAnalytics";
import { useAdminAuth } from "../hooks/useAdminAuth";

function AdminApp() {
  const { isAuthenticated, logout, loading } = useAdminAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const idleTimer = useRef<NodeJS.Timeout | null>(null);
  const lastActivity = useRef(Date.now());

  useEffect(() => {
    if (!isAuthenticated) return;
    // Fungsi untuk logout jika idle 15 menit
    const checkIdle = () => {
      if (Date.now() - lastActivity.current > 15 * 60 * 1000) {
        logout();
      }
    };
    // Reset timer setiap ada aktivitas user
    const resetTimer = () => {
      lastActivity.current = Date.now();
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(checkIdle, 15 * 60 * 1000);
    };
    // Event yang dianggap aktivitas
    const events = ["mousemove", "keydown", "mousedown", "touchstart"];
    events.forEach((event) => window.addEventListener(event, resetTimer));
    resetTimer();
    return () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [isAuthenticated, logout]);

  // Paksa logout jika reload 4x
  useEffect(() => {
    const key = "admin_reload_count";
    let count = Number(localStorage.getItem(key) || "0");
    count++;
    localStorage.setItem(key, String(count));
    if (count >= 4) {
      localStorage.removeItem(key);
      // Hapus session Supabase (v2)
      Object.keys(localStorage).forEach((k) => {
        if (k.includes("supabase") || k.includes("sb-")) {
          localStorage.removeItem(k);
        }
      });
      window.location.reload();
    }
    // Reset count jika user login sukses
    if (isAuthenticated) {
      localStorage.removeItem(key);
    }
  }, [isAuthenticated]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg text-gray-600">
        Loading...
      </div>
    );
  }
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-emerald-50 flex flex-row">
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          onLogout={logout}
        />
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 min-w-0">
          <Routes>
            <Route
              path="/"
              element={<Navigate to="/admin/dashboard" replace />}
            />
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="/products" element={<AdminProducts />} />
            <Route path="/categories" element={<AdminCategories />} />
            <Route path="/analytics" element={<AdminAnalytics />} />
            <Route path="/settings" element={<AdminSettings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default AdminApp;
