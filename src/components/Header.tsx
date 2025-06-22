import React, { useState } from "react";
import { Search, ShoppingBag, Menu, X, Settings } from "lucide-react";

interface HeaderProps {
  onSearch: (query: string) => void;
  cartCount: number;
  onToggleAdmin: () => void;
  isAdminMode: boolean;
  showNotFoundNotification?: boolean;
  onResetSearch?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  onSearch,
  cartCount,
  onToggleAdmin,
  isAdminMode,
  showNotFoundNotification = false,
  onResetSearch,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNotif, setShowNotif] = useState(false);

  // Tampilkan notifikasi jika prop showNotFoundNotification berubah ke true
  React.useEffect(() => {
    if (showNotFoundNotification) {
      setShowNotif(true);
      const timer = setTimeout(() => setShowNotif(false), 4000); // 4 detik
      return () => clearTimeout(timer);
    }
  }, [showNotFoundNotification]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          {/* Logo dihapus */}

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a
              href="#home"
              className="text-gray-700 hover:text-indigo-600 transition-colors duration-200"
            >
              Home
            </a>
            <a
              href="#products"
              className="text-gray-700 hover:text-indigo-600 transition-colors duration-200"
            >
              Products
            </a>
            <a
              href="#categories"
              className="text-gray-700 hover:text-indigo-600 transition-colors duration-200"
            >
              Categories
            </a>
            <a
              href="#about"
              className="text-gray-700 hover:text-indigo-600 transition-colors duration-200"
            >
              About
            </a>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8 flex-col">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </form>
            {showNotif && (
              <div className="mt-2 animate-fade-in-out transition-opacity duration-300">
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg shadow flex flex-col items-center">
                  <span className="font-semibold mb-1">
                    Produk tidak ditemukan
                  </span>
                  <span className="text-sm mb-1">
                    Coba kata kunci lain.{" "}
                    {onResetSearch && (
                      <button
                        className="underline text-blue-600 hover:text-blue-800"
                        onClick={onResetSearch}
                      >
                        Lihat Semua Produk
                      </button>
                    )}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onToggleAdmin}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                isAdminMode
                  ? "bg-indigo-100 text-indigo-600"
                  : "text-gray-700 hover:text-indigo-600 hover:bg-gray-100"
              }`}
              title={isAdminMode ? "Exit Admin Mode" : "Enter Admin Mode"}
            >
              <Settings className="h-5 w-5" />
            </button>

            <button className="relative p-2 text-gray-700 hover:text-indigo-600 transition-colors duration-200">
              <ShoppingBag className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-indigo-600"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <form onSubmit={handleSearch} className="mb-3">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </form>
              {showNotif && (
                <div className="mb-2 animate-fade-in-out transition-opacity duration-700">
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg shadow flex flex-col items-center">
                    <span className="font-semibold mb-1">
                      Produk tidak ditemukan
                    </span>
                    <span className="text-sm mb-1">
                      Coba kata kunci lain.{" "}
                      {onResetSearch && (
                        <button
                          className="underline text-blue-600 hover:text-blue-800"
                          onClick={onResetSearch}
                        >
                          Lihat Semua Produk
                        </button>
                      )}
                    </span>
                  </div>
                </div>
              )}
              <a
                href="#home"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600"
              >
                Home
              </a>
              <a
                href="#products"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600"
              >
                Products
              </a>
              <a
                href="#categories"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600"
              >
                Categories
              </a>
              <a
                href="#about"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600"
              >
                About
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
