import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useProductContext } from '../../context/ProductContext';
import { Star, ShoppingCart, Heart, Share2 } from 'lucide-react';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getProductById } = useProductContext();
  
  if (!id) return <Navigate to="/" replace />;
  
  const product = getProductById(id);
  
  if (!product) return <Navigate to="/" replace />;

  const discountedPrice = product.discount 
    ? product.price * (1 - product.discount / 100) 
    : product.price;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="lg:grid lg:grid-cols-2 lg:gap-12">
        {/* Product Images */}
        <div className="mb-8 lg:mb-0">
          <div className="aspect-square overflow-hidden rounded-2xl shadow-2xl">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full">
              {product.category}
            </span>
          </div>

          <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>

          <div className="flex items-center space-x-4">
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
            <span className="text-gray-600">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-4xl font-bold text-gray-900">
              ${discountedPrice.toFixed(2)}
            </span>
            {product.discount && (
              <span className="text-2xl text-gray-500 line-through">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          <p className="text-lg text-gray-600 leading-relaxed">
            {product.description}
          </p>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">Key Features</h3>
            <ul className="grid grid-cols-2 gap-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex space-x-4">
            <button className="flex-1 bg-indigo-600 text-white py-4 px-8 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center space-x-2">
              <ShoppingCart className="h-5 w-5" />
              <span>Add to Cart</span>
            </button>
            <button className="p-4 border-2 border-gray-300 rounded-lg hover:border-red-500 hover:text-red-500 transition-colors duration-200">
              <Heart className="h-6 w-6" />
            </button>
            <button className="p-4 border-2 border-gray-300 rounded-lg hover:border-indigo-500 hover:text-indigo-500 transition-colors duration-200">
              <Share2 className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;