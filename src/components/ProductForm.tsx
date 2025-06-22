import React, { useState, useEffect } from "react";
import { Product } from "../types/Product";
import { categories } from "../data/mockData";
import { useProductContext } from "../context/ProductContext";
import { X, Plus, Minus } from "lucide-react";

interface ProductFormProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (type: "add" | "edit") => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
  product,
  isOpen,
  onClose,
  onSave,
}) => {
  const { addProduct, updateProduct } = useProductContext();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
    image: "",
    images: [""],
    features: [""],
    inStock: true,
    rating: 5,
    reviews: 0,
    discount: 0,
    tags: [""],
    rackLocation: "", // tambahkan field rackLocation
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        image: product.image,
        images: product.images,
        features: product.features,
        inStock: product.inStock,
        rating: product.rating,
        reviews: product.reviews,
        discount: product.discount || 0,
        tags: product.tags,
        rackLocation: product.rackLocation || "", // isi dari product
      });
    } else {
      setFormData({
        name: "",
        description: "",
        price: 0,
        category: "",
        image: "",
        images: [""],
        features: [""],
        inStock: true,
        rating: 5,
        reviews: 0,
        discount: 0,
        tags: [""],
        rackLocation: "", // default kosong
      });
    }
  }, [product]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    const productData = {
      ...formData,
      images: formData.images.filter((img) => img.trim() !== ""),
      features: formData.features.filter((feature) => feature.trim() !== ""),
      tags: formData.tags.filter((tag) => tag.trim() !== ""),
      image: formData.images[0] || formData.image,
      rackLocation: formData.rackLocation || "",
    };
    try {
      if (product) {
        await updateProduct(product.id, productData);
        setSuccess(true);
        onSave("edit");
      } else {
        await addProduct(productData);
        setSuccess(true);
        onSave("add");
      }
    } catch (err: any) {
      // Tampilkan error Supabase secara lengkap
      if (typeof err === "object") {
        setError(JSON.stringify(err, null, 2));
        // Juga log ke console untuk debug
        // eslint-disable-next-line no-console
        console.error("Supabase error:", err);
      } else {
        setError(String(err));
      }
    } finally {
      setLoading(false);
    }
  };

  const addField = (field: "images" | "features" | "tags") => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const removeField = (
    field: "images" | "features" | "tags",
    index: number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const updateField = (
    field: "images" | "features" | "tags",
    index: number,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  // Helper for formatting price as Rupiah
  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        ></div>

        <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div className="bg-white px-6 py-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {product ? "Edit Product" : "Add New Product"}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-2 text-sm">
                  {error}
                </div>
              )}
              {success && (
                <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-2 text-sm">
                  Produk berhasil disimpan!
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Enter product name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      required
                      value={formData.category}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          category: e.target.value,
                        }))
                      }
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Harga (Rp) *
                      </label>
                      <input
                        type="number"
                        required
                        min="0"
                        step="100"
                        value={formData.price}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            price: parseInt(e.target.value) || 0,
                          }))
                        }
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="0"
                      />
                      <div className="text-xs text-gray-500 mt-1">
                        {formatRupiah(formData.price)}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Discount (%)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={formData.discount}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            discount: parseInt(e.target.value) || 0,
                          }))
                        }
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rating
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="5"
                        step="0.1"
                        value={formData.rating}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            rating: parseFloat(e.target.value),
                          }))
                        }
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Reviews Count
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={formData.reviews}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            reviews: parseInt(e.target.value) || 0,
                          }))
                        }
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.inStock}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            inStock: e.target.checked,
                          }))
                        }
                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        In Stock
                      </span>
                    </label>
                  </div>
                </div>

                {/* Description and Details */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.description}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Enter product description"
                    />
                  </div>

                  {/* Images */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Product Images *
                      </label>
                      <button
                        type="button"
                        onClick={() => addField("images")}
                        className="text-indigo-600 hover:text-indigo-700 text-sm flex items-center space-x-1"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Add Image</span>
                      </button>
                    </div>
                    {formData.images.map((image, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 mb-2"
                      >
                        <input
                          type="url"
                          value={image}
                          onChange={(e) =>
                            updateField("images", index, e.target.value)
                          }
                          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="https://example.com/image.jpg"
                        />
                        {formData.images.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeField("images", index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Features */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Features
                      </label>
                      <button
                        type="button"
                        onClick={() => addField("features")}
                        className="text-indigo-600 hover:text-indigo-700 text-sm flex items-center space-x-1"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Add Feature</span>
                      </button>
                    </div>
                    {formData.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 mb-2"
                      >
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) =>
                            updateField("features", index, e.target.value)
                          }
                          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="Enter feature"
                        />
                        {formData.features.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeField("features", index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Tags
                      </label>
                      <button
                        type="button"
                        onClick={() => addField("tags")}
                        className="text-indigo-600 hover:text-indigo-700 text-sm flex items-center space-x-1"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Add Tag</span>
                      </button>
                    </div>
                    {formData.tags.map((tag, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 mb-2"
                      >
                        <input
                          type="text"
                          value={tag}
                          onChange={(e) =>
                            updateField("tags", index, e.target.value)
                          }
                          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="Enter tag"
                        />
                        {formData.tags.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeField("tags", index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Rack Location */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rack Location
                    </label>
                    <input
                      type="text"
                      value={formData.rackLocation}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          rackLocation: e.target.value,
                        }))
                      }
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Enter rack location (optional)"
                    />
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`w-full flex justify-center items-center px-4 py-2 rounded-lg font-semibold text-white transition-colors duration-200 ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  }`}
                  disabled={loading}
                >
                  {loading ? (
                    <span className="animate-spin mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full inline-block"></span>
                  ) : null}
                  {product ? "Update Product" : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
