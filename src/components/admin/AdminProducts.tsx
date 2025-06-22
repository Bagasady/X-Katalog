import React, { useState, useEffect } from "react";
import { useProductContext } from "../../context/ProductContext";
import { Product } from "../../types/Product";
import ProductForm from "../ProductForm";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import Toast from "../Toast";

const ITEMS_PER_PAGE = 10;

const AdminProducts: React.FC = () => {
  const { products, deleteProduct } = useProductContext();
  const [isProductFormOpen, setIsProductFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  // Filtered products
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Reset to page 1 if search/filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, products.length]);

  // Pagination logic
  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIdx = Math.min(startIdx + ITEMS_PER_PAGE, totalProducts);
  const paginatedProducts = filteredProducts.slice(startIdx, endIdx);

  // Simulate async loading (for UX demo, replace with real API if needed)
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(timer);
  }, [currentPage, searchQuery, products.length]);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsProductFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        setToast({ message: "Produk berhasil dihapus!", type: "success" });
      } catch {
        setToast({ message: "Gagal menghapus produk.", type: "error" });
      }
    }
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    setIsProductFormOpen(true);
  };

  // Pagination controls
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="space-y-6 w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600">Manage your product catalog</p>
        </div>
        <button
          onClick={handleAddNew}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200 flex items-center space-x-2 w-full md:w-auto justify-center"
        >
          <Plus className="h-5 w-5" />
          <span>Add Product</span>
        </button>
      </div>
      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm md:text-base"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>
      {/* Info */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-sm text-gray-600 gap-2">
        <span>
          Menampilkan {totalProducts === 0 ? 0 : startIdx + 1}–{endIdx} dari{" "}
          {totalProducts} produk
        </span>
        {loading && (
          <span className="text-indigo-500 animate-pulse">Loading...</span>
        )}
      </div>
      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm md:text-base">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                Product
              </th>
              <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                Category
              </th>
              <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                Price
              </th>
              <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                Stock
              </th>
              <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                Rating
              </th>
              <th className="px-4 md:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-gray-400">
                  Loading data...
                </td>
              </tr>
            ) : paginatedProducts.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-gray-400">
                  Tidak ada produk ditemukan.
                </td>
              </tr>
            ) : (
              paginatedProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap min-w-[180px] max-w-xs">
                    <div className="flex items-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="ml-4 min-w-0">
                        <div className="text-sm font-medium text-gray-900 truncate">
                          {product.name}
                        </div>
                        <div className="text-xs text-gray-500 truncate max-w-[120px] md:max-w-xs">
                          {product.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatRupiah(product.price)}
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        product.inStock
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.rating} ({product.reviews})
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="text-indigo-600 hover:text-indigo-900 p-1"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 hover:text-red-900 p-1"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 gap-2 flex-wrap">
          <button
            className="px-3 py-2 rounded-md border text-sm font-medium bg-white shadow hover:bg-gray-50 disabled:opacity-50"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1 || loading}
          >
            Previous
          </button>
          <div className="flex items-center gap-1 flex-wrap">
            {pageNumbers.map((num) => (
              <button
                key={num}
                className={`px-3 py-2 rounded-md border text-sm font-medium shadow ${
                  num === currentPage
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-white hover:bg-gray-50 border-gray-300 text-gray-700"
                }`}
                onClick={() => setCurrentPage(num)}
                disabled={num === currentPage || loading}
              >
                {num}
              </button>
            ))}
          </div>
          <button
            className="px-3 py-2 rounded-md border text-sm font-medium bg-white shadow hover:bg-gray-50 disabled:opacity-50"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages || loading}
          >
            Next
          </button>
        </div>
      )}
      {/* Product Form Modal */}
      <ProductForm
        product={editingProduct}
        isOpen={isProductFormOpen}
        onClose={() => {
          setIsProductFormOpen(false);
          setEditingProduct(null);
        }}
        onSave={(successType) => {
          setIsProductFormOpen(false);
          setEditingProduct(null);
          if (successType === "add")
            setToast({
              message: "Produk berhasil ditambahkan!",
              type: "success",
            });
          if (successType === "edit")
            setToast({ message: "Produk berhasil diupdate!", type: "success" });
        }}
      />
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default AdminProducts;
