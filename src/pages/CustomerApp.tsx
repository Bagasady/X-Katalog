import React, { useState, useMemo, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import CustomerHeader from "../components/customer/CustomerHeader";
import Hero from "../components/Hero";
import CategoryFilter from "../components/CategoryFilter";
import ProductGrid from "../components/ProductGrid";
import ProductModal from "../components/ProductModal";
import Footer from "../components/Footer";
import ProductDetail from "../components/customer/ProductDetail";
import { useProductContext } from "../context/ProductContext";
import { Product } from "../types/Product";

// Debounce hook
function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

function CustomerApp() {
  const { products, loading } = useProductContext();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const navigate = useNavigate();

  // Debounced search
  const debouncedQuery = useDebounce(searchQuery, 400);

  // Suggestion produk cerdas
  const productSuggestions = useMemo(() => {
    let suggest: Product[] = [];
    const q = debouncedQuery.trim().toLowerCase();
    if (!q) {
      // Jika kosong, tampilkan produk populer/history
      suggest = products.sort((a, b) => b.viewCount - a.viewCount).slice(0, 8);
    } else {
      // 1. Prioritas exact match nama/kategori
      const exact = products.filter(
        (p) => p.name.toLowerCase() === q || p.category.toLowerCase() === q
      );
      // 2. Kategori-aware: jika query cocok kategori, tampilkan produk kategori tsb
      const catMatch = products.filter((p) =>
        p.category.toLowerCase().includes(q)
      );
      // 3. Partial/fuzzy match nama/kategori/desc/tags
      const partial = products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((tag) => tag.toLowerCase().includes(q))
      );
      // Gabungkan, urutkan, unik, prioritas: exact > kategori > partial > populer
      const ids = new Set();
      suggest = [...exact, ...catMatch, ...partial]
        .filter((p) => {
          if (ids.has(p.id)) return false;
          ids.add(p.id);
          return true;
        })
        .sort((a, b) => b.viewCount - a.viewCount)
        .slice(0, 10);
    }
    return suggest;
  }, [products, debouncedQuery]);

  // Filter products based on category and search query
  const filteredProducts = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      const matchesSearch =
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q) ||
        product.tags.some((tag) => tag.toLowerCase().includes(q)) ||
        product.rackLocation.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, debouncedQuery]);

  // Handler untuk pencarian dan suggestion
  const handleSearchAndRedirect = (query: string) => {
    setSearchQuery(query);
    if (!query) return;
    const found = products.find(
      (p) => p.name.toLowerCase() === query.toLowerCase()
    );
    if (found) {
      setNotFound(false);
      navigate(`/product/${found.id}`);
    } else {
      setNotFound(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <CustomerHeader
        onSearch={setSearchQuery}
        suggestions={productSuggestions}
        onSuggestionClick={handleSearchAndRedirect}
        onEnter={handleSearchAndRedirect}
      />
      {notFound && (
        <div className="max-w-xl mx-auto mt-4 p-4 bg-red-100 text-red-700 rounded-lg text-center animate-fade-in">
          Produk tidak ditemukan, coba kata kunci lain.{" "}
          <button
            className="ml-2 underline text-xptn-yellow"
            onClick={() => setSearchQuery("")}
          >
            Lihat Semua Produk
          </button>
        </div>
      )}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <CategoryFilter
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
              <ProductGrid
                products={filteredProducts}
                onProductView={(product) => {
                  setSelectedProduct(product);
                  setIsProductModalOpen(true);
                }}
                loading={loading}
              />
            </>
          }
        />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>

      <Footer />

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={() => {
          setIsProductModalOpen(false);
          setSelectedProduct(null);
        }}
      />
    </div>
  );
}

export default CustomerApp;
