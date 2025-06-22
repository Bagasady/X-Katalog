import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-xptn-dark text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div>
                <h3 className="text-2xl font-bold text-white">X-Katalog</h3>
                <div className="text-sm text-gray-300">Toko XPTN</div>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Katalog digital terpercaya dengan lebih dari 12.500 produk
              berkualitas. Kami berkomitmen memberikan informasi produk yang
              akurat dan terkini.
            </p>

            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-xptn-yellow transition-colors duration-200"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-xptn-yellow transition-colors duration-200"
              >
                <Twitter className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-xptn-yellow transition-colors duration-200"
              >
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">
              Navigasi Cepat
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#home"
                  className="text-gray-300 hover:text-xptn-yellow transition-colors duration-200"
                >
                  Beranda
                </a>
              </li>
              <li>
                <a
                  href="#products"
                  className="text-gray-300 hover:text-xptn-yellow transition-colors duration-200"
                >
                  Produk
                </a>
              </li>
              <li>
                <a
                  href="#categories"
                  className="text-gray-300 hover:text-xptn-yellow transition-colors duration-200"
                >
                  Kategori
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-gray-300 hover:text-xptn-yellow transition-colors duration-200"
                >
                  Tentang Kami
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">
              Kategori Populer
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-xptn-yellow transition-colors duration-200"
                >
                  Peralatan Rumah Tangga
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-xptn-yellow transition-colors duration-200"
                >
                  Perkakas
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-xptn-yellow transition-colors duration-200"
                >
                  Perabotan
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-xptn-yellow transition-colors duration-200"
                >
                  Peralatan Listrik
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">
              Informasi Kontak
            </h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-xptn-yellow flex-shrink-0" />
                <span className="text-gray-300">
                  Jl. Perdagangan No. 123
                  <br />
                  Kota Dagang, Indonesia
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-xptn-yellow flex-shrink-0" />
                <span className="text-gray-300">+62 21 1234 5678</span>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-xptn-yellow flex-shrink-0" />
                <span className="text-gray-300">info@xkatalog-xptn.com</span>
              </div>
            </div>

            <div className="mt-6">
              <h5 className="text-sm font-semibold text-white mb-3">
                Berlangganan Update
              </h5>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Email Anda"
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:ring-2 focus:ring-xptn-yellow focus:border-transparent text-white placeholder-gray-400"
                />
                <button className="bg-xptn-yellow text-xptn-dark px-4 py-2 rounded-r-lg hover:bg-xptn-yellow-hover transition-colors duration-200 font-medium">
                  Kirim
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">
            © 2024 X-Katalog XPTN. Semua hak dilindungi. | Dibuat dengan ❤️
            untuk pengalaman berbelanja yang lebih baik.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
