import React from "react";
import { Search, Package, CheckCircle, Eye } from "lucide-react";

const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="bg-gradient-to-br from-yellow-50 via-white to-orange-50 py-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          {/* Content */}
          <div className="mb-12 lg:mb-0 animate-slide-up">
            <div className="flex flex-wrap gap-3 mb-6">
              <div className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                <CheckCircle className="h-4 w-4 mr-1" />
                Data stok diperbarui setiap hari
              </div>
              <div className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                <Package className="h-4 w-4 mr-1" />
                12.500+ produk terdaftar
              </div>
              <div className="flex items-center bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                <Search className="h-4 w-4 mr-1" />
                Pencarian cepat & akurat
              </div>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold text-xptn-dark mb-6 leading-tight animate-hero-title">
              X-Katalog
              <span className="block text-xptn-yellow mt-2 lg:mt-3">
                Katalog Digital
              </span>
              <span className="block text-2xl lg:text-3xl font-medium text-gray-600 mt-1 lg:mt-2">
                Toko XPTN
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed animate-hero-desc">
              Telusuri ribuan produk berkualitas yang tersedia di toko XPTN. Cek
              ketersediaan, harga, dan lokasi rak dengan satu klik.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-xptn-yellow text-xptn-dark px-8 py-4 rounded-lg font-semibold hover:bg-xptn-yellow-hover transition-all duration-200 flex items-center justify-center group transform hover:scale-105 smooth-hover">
                Jelajahi Katalog
                <Search className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
              <button className="border-2 border-xptn-yellow text-xptn-dark px-8 py-4 rounded-lg font-semibold hover:bg-xptn-yellow hover:text-xptn-dark transition-all duration-200 smooth-hover">
                Pelajari Lebih Lanjut
              </button>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-8">
              <div className="text-center animate-bounce-gentle">
                <div className="text-2xl font-bold text-xptn-dark">12.5K+</div>
                <div className="text-sm text-gray-600">Produk Tersedia</div>
              </div>
              <div
                className="text-center animate-bounce-gentle"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="text-2xl font-bold text-xptn-dark">10</div>
                <div className="text-sm text-gray-600">Kategori Utama</div>
              </div>
              <div
                className="text-center animate-bounce-gentle"
                style={{ animationDelay: "0.4s" }}
              >
                <div className="text-2xl font-bold text-xptn-dark">99%</div>
                <div className="text-sm text-gray-600">Akurasi Stok</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative animate-fade-in">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500 bg-gradient-to-br from-xptn-yellow to-orange-200">
              <img
                src="https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg"
                alt="Toko XPTN - Produk Berkualitas"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Floating Cards */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-6 transform -rotate-6 hover:rotate-0 transition-transform duration-500 animate-scale-in">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-xptn-yellow rounded-full flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-xptn-dark" />
                </div>
                <div>
                  <div className="font-semibold text-xptn-dark">
                    Kualitas Terjamin
                  </div>
                  <div className="text-sm text-gray-600">Produk Original</div>
                </div>
              </div>
            </div>

            <div
              className="absolute -top-6 -right-6 bg-white rounded-xl shadow-lg p-4 transform rotate-6 hover:rotate-0 transition-transform duration-500 animate-scale-in"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="flex items-center space-x-2">
                <Eye className="h-5 w-5 text-xptn-yellow" />
                <div className="text-sm font-medium text-xptn-dark">
                  Stok Real-time
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
