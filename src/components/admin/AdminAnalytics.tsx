import React from "react";
import { useProductContext } from "../../context/ProductContext";
import { BarChart3, TrendingUp, Star, Eye } from "lucide-react";

const AdminAnalytics: React.FC = () => {
  const { products } = useProductContext();

  // Example analytics: total products, average price, best seller, average rating, total views
  const totalProducts = products.length;
  const avgPrice =
    products.length > 0
      ? products.reduce((sum, p) => sum + p.price, 0) / products.length
      : 0;
  const bestSeller = products.reduce(
    (prev, curr) => (curr.viewCount > (prev?.viewCount || 0) ? curr : prev),
    products[0]
  );
  const avgRating =
    products.length > 0
      ? products.reduce((sum, p) => sum + p.rating, 0) / products.length
      : 0;
  const totalViews = products.reduce((sum, p) => sum + p.viewCount, 0);

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-fade-in">
      <div className="flex items-center gap-4 mb-6">
        <BarChart3 className="h-8 w-8 text-indigo-500" />
        <h1 className="text-2xl font-bold text-xptn-dark">Analytics Produk</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/80 rounded-xl shadow p-6 flex flex-col gap-2">
          <span className="text-gray-500 text-sm">Total Produk</span>
          <span className="text-2xl font-bold text-xptn-dark">
            {totalProducts}
          </span>
        </div>
        <div className="bg-white/80 rounded-xl shadow p-6 flex flex-col gap-2">
          <span className="text-gray-500 text-sm">Rata-rata Harga</span>
          <span className="text-2xl font-bold text-xptn-dark">
            {avgPrice.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
            })}
          </span>
        </div>
        <div className="bg-white/80 rounded-xl shadow p-6 flex flex-col gap-2">
          <span className="text-gray-500 text-sm">Rata-rata Rating</span>
          <span className="flex items-center gap-2 text-2xl font-bold text-xptn-dark">
            <Star className="h-6 w-6 text-amber-400" />
            {avgRating.toFixed(2)}
          </span>
        </div>
        <div className="bg-white/80 rounded-xl shadow p-6 flex flex-col gap-2">
          <span className="text-gray-500 text-sm">Total Views</span>
          <span className="flex items-center gap-2 text-2xl font-bold text-xptn-dark">
            <Eye className="h-6 w-6 text-indigo-400" />
            {totalViews.toLocaleString("id-ID")}
          </span>
        </div>
      </div>
      <div className="bg-white/80 rounded-xl shadow p-6 mt-6">
        <h2 className="text-lg font-semibold text-xptn-dark mb-2">
          Produk Paling Populer
        </h2>
        {bestSeller ? (
          <div className="flex items-center gap-4">
            <img
              src={bestSeller.image}
              alt={bestSeller.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div>
              <div className="font-bold text-xptn-dark">{bestSeller.name}</div>
              <div className="text-gray-500 text-sm">{bestSeller.category}</div>
              <div className="text-xs text-gray-400">
                {bestSeller.viewCount.toLocaleString("id-ID")} views
              </div>
            </div>
          </div>
        ) : (
          <div className="text-gray-400">Belum ada data produk.</div>
        )}
      </div>
    </div>
  );
};

export default AdminAnalytics;
