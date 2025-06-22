import React, { useState, useEffect } from 'react';
import { Product } from '../types/Product';
import { X, Star, Heart, Share2, ChevronLeft, ChevronRight, MapPin, Eye, Package } from 'lucide-react';
import { useProductContext } from '../context/ProductContext';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { incrementViewCount } = useProductContext();

  useEffect(() => {
    if (isOpen && product) {
      incrementViewCount(product.id);
    }
  }, [isOpen, product, incrementViewCount]);

  if (!isOpen || !product) return null;

  const discountedPrice = product.discount 
    ? product.price * (1 - product.discount / 100) 
    : product.price;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto animate-fade-in">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Overlay */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        ></div>

        {/* Modal */}
        <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-6xl sm:w-full animate-scale-in">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow duration-200 hover:bg-yellow-50"
          >
            <X className="h-6 w-6 text-xptn-dark" />
          </button>

          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            {/* Image Gallery */}
            <div className="relative">
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Image Navigation */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 hover:bg-opacity-100 transition-all duration-200 hover:scale-110"
                  >
                    <ChevronLeft className="h-6 w-6 text-xptn-dark" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 hover:bg-opacity-100 transition-all duration-200 hover:scale-110"
                  >
                    <ChevronRight className="h-6 w-6 text-xptn-dark" />
                  </button>

                  {/* Image Indicators */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {product.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-200 ${
                          index === currentImageIndex 
                            ? 'bg-xptn-yellow' 
                            : 'bg-white bg-opacity-50'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 space-y-2">
                {product.discount && (
                  <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold animate-bounce-gentle">
                    -{product.discount}% OFF
                  </div>
                )}
                <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  product.inStock 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {product.inStock ? 'Tersedia' : 'Stok Habis'}
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="p-8">
              <div className="flex items-center justify-between mb-4">
                <span className="bg-yellow-50 text-xptn-yellow text-sm font-medium px-3 py-1 rounded-full border border-xptn-yellow">
                  {product.category}
                </span>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200">
                    <Heart className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-xptn-yellow transition-colors duration-200">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <h1 className="text-3xl font-bold text-xptn-dark mb-4">
                {product.name}
              </h1>

              {/* Rating and Views */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating) 
                            ? 'text-amber-400 fill-current' 
                            : 'text-gray-300'
                        }`} 
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    {product.rating} ({product.reviews} ulasan)
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Eye className="h-4 w-4 mr-1" />
                  <span>{product.viewCount.toLocaleString('id-ID')} views</span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-3 mb-6">
                <span className="text-3xl font-bold text-xptn-dark">
                  {formatPrice(discountedPrice)}
                </span>
                {product.discount && (
                  <span className="text-xl text-gray-500 line-through">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>

              {/* Location */}
              <div className="flex items-center mb-6 p-3 bg-yellow-50 rounded-lg border border-xptn-yellow">
                <MapPin className="h-5 w-5 text-xptn-yellow mr-2" />
                <span className="text-sm font-medium text-xptn-dark">
                  Lokasi Rak: {product.rackLocation}
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-6 leading-relaxed">
                {product.description}
              </p>

              {/* Features */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-xptn-dark mb-3">Fitur Utama</h3>
                <div className="grid grid-cols-2 gap-2">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-xptn-yellow rounded-full"></div>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="mb-8">
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded border"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Kode Produk:</span>
                    <span className="ml-2 font-medium text-xptn-dark">{product.id}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Ditambahkan:</span>
                    <span className="ml-2 font-medium text-xptn-dark">
                      {new Date(product.createdAt).toLocaleDateString('id-ID')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;