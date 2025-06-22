import React from "react";
import { Product } from "../types/Product";
import { Star, Eye, MapPin } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onView: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onView }) => {
  const discountedPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : product.price;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleView = () => {
    // Increment view count (in real app, this would be handled by backend)
    onView(product);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group overflow-hidden animate-scale-in border border-xptn-border">
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />

        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold animate-bounce-gentle">
            -{product.discount}%
          </div>
        )}

        {/* Stock Status */}
        <div
          className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold ${
            product.inStock
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {product.inStock ? "Tersedia" : "Stok Habis"}
        </div>

        {/* Hover Actions */}
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button
            onClick={handleView}
            className="bg-xptn-yellow text-xptn-dark px-6 py-3 rounded-lg font-semibold hover:bg-xptn-yellow-hover transition-colors duration-200 flex items-center space-x-2 transform hover:scale-105"
          >
            <Eye className="h-5 w-5" />
            <span>Lihat Detail</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-xptn-yellow font-medium bg-yellow-50 px-2 py-1 rounded border border-xptn-yellow">
            {product.category}
          </span>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-amber-400 fill-current" />
            <span className="text-sm text-gray-600">
              {product.rating} ({product.reviews})
            </span>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-xptn-dark mb-2 line-clamp-2 group-hover:text-xptn-yellow transition-colors duration-200">
          {product.name}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Location and Views */}
        <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <MapPin className="h-4 w-4" />
            <span>Rak {product.rackLocation}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Eye className="h-4 w-4" />
            <span>{product.viewCount.toLocaleString("id-ID")} views</span>
          </div>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-1 mb-4">
          {product.features.slice(0, 2).map((feature, index) => (
            <span
              key={index}
              className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded border"
            >
              {feature}
            </span>
          ))}
          {product.features.length > 2 && (
            <span className="text-xs text-gray-500">
              +{product.features.length - 2} lainnya
            </span>
          )}
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-xptn-dark">
              {formatPrice(discountedPrice)}
            </span>
            {product.discount && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          <button
            onClick={handleView}
            className="text-xptn-link hover:text-xptn-yellow font-medium text-sm hover:underline transition-colors duration-200"
          >
            Lihat Detail →
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
