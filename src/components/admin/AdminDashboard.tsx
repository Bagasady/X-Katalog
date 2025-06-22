import React from "react";
import { useProductContext } from "../../context/ProductContext";
import {
  Package,
  TrendingUp,
  Eye,
  BarChart3,
  MapPin,
  Star,
  ShieldCheck,
} from "lucide-react";
import { categories } from "../../data/mockData";

const AdminDashboard: React.FC = () => {
  const { products } = useProductContext();
  const totalViews = products.reduce((sum, p) => sum + p.viewCount, 0);
  const avgRating =
    products.reduce((sum, p) => sum + p.rating, 0) / products.length || 0;
  const topViewedProducts = [...products]
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, 5);
  const stats = [
    {
      title: "Total Produk",
      value: products.length.toLocaleString("id-ID"),
      icon: Package,
      color: "bg-blue-500",
      change: "",
    },
    {
      title: "Produk Tersedia",
      value: products.filter((p) => p.inStock).length.toLocaleString("id-ID"),
      icon: TrendingUp,
      color: "bg-green-500",
      change: "",
    },
    {
      title: "Total Views",
      value: totalViews.toLocaleString("id-ID"),
      icon: Eye,
      color: "bg-xptn-yellow",
      change: "",
    },
    {
      title: "Rating Rata-rata",
      value: avgRating.toFixed(1),
      icon: Star,
      color: "bg-purple-500",
      change: "",
    },
  ];
  const categoryStats = categories
    .map((category) => {
      const categoryProducts = products.filter(
        (p) => p.category === category.name
      );
      const categoryViews = categoryProducts.reduce(
        (sum, p) => sum + p.viewCount,
        0
      );
      return {
        name: category.name,
        products: categoryProducts.length,
        views: categoryViews,
      };
    })
    .sort((a, b) => b.views - a.views);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-emerald-50 py-10 px-2 md:px-8 animate-fade-in">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-4 shadow-lg border border-indigo-100 animate-glow">
              <ShieldCheck className="h-12 w-12 text-indigo-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-xptn-dark mb-1 tracking-tight">
                Dashboard Analytics
              </h1>
              <p className="text-gray-600 text-base">
                Selamat datang kembali! Berikut ringkasan performa X-Katalog
                Anda.
              </p>
            </div>
          </div>
        </div>
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-indigo-100 p-6 hover:shadow-2xl transition-shadow duration-200 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-xptn-dark tracking-tight">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg shadow-md`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                {stat.change && (
                  <div className="mt-4 flex items-center">
                    <span className="text-sm font-medium text-green-600">
                      {stat.change}
                    </span>
                    <span className="text-sm text-gray-500 ml-2">
                      dari bulan lalu
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Viewed Products */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-indigo-100 animate-slide-up">
            <div className="p-6 border-b border-indigo-100">
              <h2 className="text-lg font-semibold text-xptn-dark flex items-center">
                <Eye className="h-5 w-5 mr-2 text-xptn-yellow" />
                Produk Paling Dilihat
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {topViewedProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="flex items-center space-x-4 p-3 rounded-lg hover:bg-yellow-50 transition-colors duration-200"
                  >
                    <div className="flex-shrink-0">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-xptn-yellow text-xptn-dark rounded-full text-sm font-bold">
                        {index + 1}
                      </span>
                    </div>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover shadow"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-xptn-dark truncate">
                        {product.name}
                      </h3>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <span>{product.category}</span>
                        <span>•</span>
                        <span className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {product.rackLocation}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-xptn-dark">
                        {product.viewCount.toLocaleString("id-ID")}
                      </p>
                      <p className="text-xs text-gray-500">views</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Category Performance */}
          <div
            className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-indigo-100 animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="p-6 border-b border-indigo-100">
              <h2 className="text-lg font-semibold text-xptn-dark flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-xptn-yellow" />
                Performa Kategori
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {categoryStats.slice(0, 5).map((category) => (
                  <div
                    key={category.name}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-yellow-50 transition-colors duration-200"
                  >
                    <div>
                      <h3 className="text-sm font-medium text-xptn-dark">
                        {category.name}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {category.products} produk
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-xptn-dark">
                        {category.views.toLocaleString("id-ID")}
                      </p>
                      <p className="text-xs text-gray-500">views</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
