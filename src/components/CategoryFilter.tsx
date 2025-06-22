import React from 'react';
import { categories } from '../data/mockData';
import * as Icons from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategory, onCategoryChange }) => {
  const getIcon = (iconName: string) => {
    const IconComponent = Icons[iconName as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
    return IconComponent ? <IconComponent className="h-5 w-5" /> : null;
  };

  return (
    <section id="categories" className="py-16 bg-gradient-to-br from-yellow-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-slide-up">
          <h2 className="text-3xl font-bold text-xptn-dark mb-4">Jelajahi Berdasarkan Kategori</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Temukan produk yang Anda butuhkan dari 10 kategori utama kami
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={() => onCategoryChange('all')}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-200 flex items-center space-x-2 transform hover:scale-105 ${
              selectedCategory === 'all'
                ? 'bg-xptn-yellow text-xptn-dark shadow-lg border-2 border-xptn-yellow-hover'
                : 'bg-white text-xptn-dark hover:bg-yellow-50 hover:text-xptn-yellow border-2 border-xptn-border hover:border-xptn-yellow'
            }`}
          >
            <span>Semua Produk</span>
          </button>
          
          {categories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.name)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-200 flex items-center space-x-2 transform hover:scale-105 animate-scale-in ${
                selectedCategory === category.name
                  ? 'bg-xptn-yellow text-xptn-dark shadow-lg border-2 border-xptn-yellow-hover'
                  : 'bg-white text-xptn-dark hover:bg-yellow-50 hover:text-xptn-yellow border-2 border-xptn-border hover:border-xptn-yellow'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {getIcon(category.icon)}
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryFilter;