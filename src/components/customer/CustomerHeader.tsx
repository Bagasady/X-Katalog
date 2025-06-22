import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";
import { Product } from "../../types/Product";

interface CustomerHeaderProps {
  onSearch: (query: string) => void;
  suggestions?: Product[];
  onSuggestionClick?: (query: string) => void;
  onEnter?: (query: string) => void;
}

const CustomerHeader: React.FC<CustomerHeaderProps> = ({
  onSearch,
  suggestions = [],
  onSuggestionClick,
  onEnter,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onEnter) {
      onEnter(searchQuery);
    } else {
      onSearch(searchQuery);
    }
    setShowSuggestions(false);
    // Blur input setelah submit agar cursor tidak standby
    inputRef.current?.blur();
  };

  // Panggil onSearch setiap kali input berubah (real-time search)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (name: string) => {
    setSearchQuery(name);
    onSearch(name);
    setShowSuggestions(false);
    if (onSuggestionClick) onSuggestionClick(name);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex(
        (prev) => (prev - 1 + suggestions.length) % suggestions.length
      );
    } else if (e.key === "Enter") {
      // Enter hanya filter, tidak redirect ke detail produk
      handleSearch(e as any);
    }
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 border-b-2 border-xptn-yellow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="flex items-center group cursor-pointer select-none"
              onClick={() => window.location.reload()}
              title="Klik untuk reload halaman"
            >
              <span className="text-2xl font-extrabold text-xptn-dark relative animate-xkatalog-glow transition-transform duration-200 group-active:scale-95 group-hover:scale-105">
                X-Katalog
                <span className="absolute left-0 top-0 w-full h-full bg-xptn-yellow opacity-0 group-hover:opacity-30 rounded transition-opacity duration-500 blur-sm animate-pulse"></span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className="text-xptn-dark hover:text-xptn-yellow transition-colors duration-200 font-medium"
            >
              Beranda
            </Link>
            <a
              href="#products"
              className="text-xptn-dark hover:text-xptn-yellow transition-colors duration-200 font-medium"
            >
              Produk
            </a>
            <a
              href="#categories"
              className="text-xptn-dark hover:text-xptn-yellow transition-colors duration-200 font-medium"
            >
              Kategori
            </a>
            <a
              href="#about"
              className="text-xptn-dark hover:text-xptn-yellow transition-colors duration-200 font-medium"
            >
              Tentang
            </a>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={handleInputChange}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() =>
                    setTimeout(() => setShowSuggestions(false), 150)
                  }
                  onKeyDown={handleInputKeyDown}
                  placeholder="Cari produk, kategori, atau kode..."
                  className="w-full pl-10 pr-4 py-2 border-2 border-xptn-border rounded-lg focus:ring-2 focus:ring-xptn-yellow focus:border-xptn-yellow transition-all duration-200"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute left-0 right-0 mt-2 bg-white border border-xptn-border rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto animate-fade-in">
                    {suggestions.map((product, idx) => (
                      <div
                        key={product.id}
                        className={`px-4 py-2 cursor-pointer hover:bg-xptn-yellow/20 text-xptn-dark text-sm transition-colors duration-150 ${
                          highlightedIndex === idx ? "bg-xptn-yellow/30" : ""
                        }`}
                        onMouseDown={() => handleSuggestionClick(product.name)}
                        onMouseEnter={() => setHighlightedIndex(idx)}
                      >
                        {product.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </form>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-xptn-dark hover:text-xptn-yellow transition-colors duration-200"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-xptn-border animate-slide-up">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <form onSubmit={handleSearch} className="mb-3">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleInputChange}
                    placeholder="Cari produk..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-xptn-yellow focus:border-transparent"
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </form>

              <Link
                to="/"
                className="block px-3 py-2 text-base font-medium text-xptn-dark hover:text-xptn-yellow hover:bg-yellow-50 rounded-md"
              >
                Beranda
              </Link>
              <a
                href="#products"
                className="block px-3 py-2 text-base font-medium text-xptn-dark hover:text-xptn-yellow hover:bg-yellow-50 rounded-md"
              >
                Produk
              </a>
              <a
                href="#categories"
                className="block px-3 py-2 text-base font-medium text-xptn-dark hover:text-xptn-yellow hover:bg-yellow-50 rounded-md"
              >
                Kategori
              </a>
              <a
                href="#about"
                className="block px-3 py-2 text-base font-medium text-xptn-dark hover:text-xptn-yellow hover:bg-yellow-50 rounded-md"
              >
                Tentang
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default CustomerHeader;
