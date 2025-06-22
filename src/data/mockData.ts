import { Product, Category } from '../types/Product';

export const categories: Category[] = [
  { id: '1', name: 'Peralatan Rumah Tangga', description: 'Perlengkapan dapur dan rumah tangga', icon: 'Home' },
  { id: '2', name: 'Perabotan', description: 'Furniture dan perabotan rumah', icon: 'Sofa' },
  { id: '3', name: 'Perkakas', description: 'Alat-alat pertukangan dan perbaikan', icon: 'Wrench' },
  { id: '4', name: 'Alat Tulis & Olahraga', description: 'Perlengkapan sekolah dan olahraga', icon: 'PenTool' },
  { id: '5', name: 'Perhiasan & Kosmetik', description: 'Aksesoris dan produk kecantikan', icon: 'Gem' },
  { id: '6', name: 'Mainan Anak', description: 'Mainan edukatif dan hiburan anak', icon: 'Gamepad2' },
  { id: '7', name: 'Aksesoris Mobil', description: 'Perlengkapan dan aksesoris kendaraan', icon: 'Car' },
  { id: '8', name: 'Peralatan Listrik', description: 'Alat elektronik dan listrik', icon: 'Zap' },
  { id: '9', name: 'Hadiah', description: 'Produk untuk hadiah dan souvenir', icon: 'Gift' },
  { id: '10', name: 'Aksesori Komputer & HP', description: 'Aksesoris teknologi dan gadget', icon: 'Smartphone' }
];

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Set Panci Stainless Steel 5 Pcs',
    description: 'Set panci stainless steel berkualitas tinggi dengan tutup kaca, cocok untuk memasak sehari-hari. Anti karat dan tahan lama.',
    price: 299000,
    category: 'Peralatan Rumah Tangga',
    image: 'https://images.pexels.com/photos/4226796/pexels-photo-4226796.jpeg',
    images: [
      'https://images.pexels.com/photos/4226796/pexels-photo-4226796.jpeg',
      'https://images.pexels.com/photos/4226806/pexels-photo-4226806.jpeg'
    ],
    features: ['Stainless Steel 304', 'Tutup Kaca Tempered', 'Handle Anti Panas', 'Set 5 Pcs Lengkap'],
    inStock: true,
    rating: 4.8,
    reviews: 156,
    discount: 15,
    tags: ['panci', 'dapur', 'stainless'],
    createdAt: '2024-01-15',
    viewCount: 1250,
    rackLocation: 'A-12'
  },
  {
    id: '2',
    name: 'Kursi Plastik Susun Olymplast',
    description: 'Kursi plastik berkualitas tinggi yang dapat disusun, hemat tempat dan tahan cuaca. Cocok untuk indoor dan outdoor.',
    price: 85000,
    category: 'Perabotan',
    image: 'https://images.pexels.com/photos/586744/pexels-photo-586744.jpeg',
    images: [
      'https://images.pexels.com/photos/586744/pexels-photo-586744.jpeg',
      'https://images.pexels.com/photos/1148955/pexels-photo-1148955.jpeg'
    ],
    features: ['Plastik PP Berkualitas', 'Dapat Disusun', 'Tahan Cuaca', 'Ringan & Kuat'],
    inStock: true,
    rating: 4.5,
    reviews: 89,
    tags: ['kursi', 'plastik', 'furniture'],
    createdAt: '2024-01-20',
    viewCount: 890,
    rackLocation: 'B-05'
  },
  {
    id: '3',
    name: 'Tool Set 46 Pcs dengan Box',
    description: 'Set perkakas lengkap 46 pieces dalam box plastik yang rapi. Cocok untuk perbaikan rumah tangga dan otomotif.',
    price: 175000,
    category: 'Perkakas',
    image: 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg',
    images: [
      'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg',
      'https://images.pexels.com/photos/1249611/pexels-photo-1249611.jpeg'
    ],
    features: ['46 Pieces Lengkap', 'Box Plastik Rapi', 'Chrome Vanadium Steel', 'Garansi 1 Tahun'],
    inStock: true,
    rating: 4.7,
    reviews: 234,
    discount: 20,
    tags: ['perkakas', 'tool set', 'perbaikan'],
    createdAt: '2024-01-10',
    viewCount: 2100,
    rackLocation: 'C-08'
  },
  {
    id: '4',
    name: 'Paket Alat Tulis Sekolah Lengkap',
    description: 'Paket alat tulis lengkap untuk sekolah berisi pensil, pulpen, penggaris, penghapus, dan perlengkapan lainnya.',
    price: 45000,
    category: 'Alat Tulis & Olahraga',
    image: 'https://images.pexels.com/photos/159751/book-address-book-learning-learn-159751.jpeg',
    images: [
      'https://images.pexels.com/photos/159751/book-address-book-learning-learn-159751.jpeg',
      'https://images.pexels.com/photos/301703/pexels-photo-301703.jpeg'
    ],
    features: ['Paket Lengkap', 'Kualitas Premium', 'Cocok Semua Usia', 'Harga Ekonomis'],
    inStock: true,
    rating: 4.6,
    reviews: 67,
    tags: ['alat tulis', 'sekolah', 'paket'],
    createdAt: '2024-01-18',
    viewCount: 450,
    rackLocation: 'D-15'
  },
  {
    id: '5',
    name: 'Set Perhiasan Emas Putih',
    description: 'Set perhiasan emas putih elegan terdiri dari kalung dan anting-anting dengan desain modern dan mewah.',
    price: 850000,
    category: 'Perhiasan & Kosmetik',
    image: 'https://images.pexels.com/photos/1454171/pexels-photo-1454171.jpeg',
    images: [
      'https://images.pexels.com/photos/1454171/pexels-photo-1454171.jpeg',
      'https://images.pexels.com/photos/1454172/pexels-photo-1454172.jpeg'
    ],
    features: ['Emas Putih 18K', 'Desain Elegan', 'Sertifikat Asli', 'Box Eksklusif'],
    inStock: true,
    rating: 4.9,
    reviews: 23,
    discount: 10,
    tags: ['perhiasan', 'emas', 'set'],
    createdAt: '2024-01-12',
    viewCount: 1890,
    rackLocation: 'E-03'
  },
  {
    id: '6',
    name: 'Mainan Edukatif Puzzle Kayu',
    description: 'Puzzle kayu edukatif untuk anak-anak dengan berbagai bentuk dan warna. Membantu perkembangan motorik dan kognitif.',
    price: 65000,
    category: 'Mainan Anak',
    image: 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg',
    images: [
      'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg',
      'https://images.pexels.com/photos/1148999/pexels-photo-1148999.jpeg'
    ],
    features: ['Kayu Berkualitas', 'Cat Non Toxic', 'Edukatif', 'Aman untuk Anak'],
    inStock: true,
    rating: 4.8,
    reviews: 145,
    tags: ['mainan', 'edukatif', 'puzzle'],
    createdAt: '2024-01-08',
    viewCount: 780,
    rackLocation: 'F-11'
  },
  {
    id: '7',
    name: 'Cover Jok Mobil Universal',
    description: 'Cover jok mobil universal dengan bahan berkualitas, mudah dipasang dan tahan lama. Cocok untuk berbagai jenis mobil.',
    price: 125000,
    category: 'Aksesoris Mobil',
    image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg',
    images: [
      'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg',
      'https://images.pexels.com/photos/3802511/pexels-photo-3802511.jpeg'
    ],
    features: ['Bahan Premium', 'Universal Fit', 'Mudah Dipasang', 'Tahan Lama'],
    inStock: true,
    rating: 4.4,
    reviews: 98,
    tags: ['mobil', 'cover jok', 'aksesoris'],
    createdAt: '2024-01-25',
    viewCount: 560,
    rackLocation: 'G-07'
  },
  {
    id: '8',
    name: 'Lampu LED Hemat Energi 12W',
    description: 'Lampu LED hemat energi 12W dengan cahaya putih terang, tahan lama hingga 25.000 jam pemakaian.',
    price: 35000,
    category: 'Peralatan Listrik',
    image: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg',
    images: [
      'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg',
      'https://images.pexels.com/photos/1112599/pexels-photo-1112599.jpeg'
    ],
    features: ['LED 12W', 'Hemat Energi 80%', 'Tahan 25.000 Jam', 'Cahaya Putih Terang'],
    inStock: true,
    rating: 4.7,
    reviews: 312,
    discount: 25,
    tags: ['lampu', 'led', 'hemat energi'],
    createdAt: '2024-01-22',
    viewCount: 1450,
    rackLocation: 'H-09'
  }
];