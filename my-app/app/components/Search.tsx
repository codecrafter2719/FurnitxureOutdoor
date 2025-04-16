'use client';

import { Fragment, useState, useEffect, useRef } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { categories } from '@/lib/categories';
import { products } from '@/lib/products';
import { Category, Product } from '@/types/categories';

interface SearchResults {
  products: Array<Product & { categorySlug: string; subCategorySlug: string }>;
  categories: Category[];
}

interface SearchProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Search({ isOpen, setIsOpen }: SearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResults>({
    products: [],
    categories: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close search when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        closeSearch();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Perform search when query changes
  useEffect(() => {
    const performSearch = async () => {
      if (!searchQuery.trim()) {
        setSearchResults({ products: [], categories: [] });
        return;
      }

      setIsLoading(true);
      try {
        const query = searchQuery.toLowerCase();
        
        // Search in categories and subcategories
        const matchedCategories = categories.filter(category => 
          category.name.toLowerCase().includes(query) ||
          category.description.toLowerCase().includes(query)
        );

        // Search in products
        const matchedProducts: Array<Product & { categorySlug: string; subCategorySlug: string }> = [];
        
        // Search through all categories and their subcategories
        categories.forEach(category => {
          if (category.subCategories) {
            category.subCategories.forEach(subCategory => {
              const subCategoryProducts = products[subCategory.slug];
              if (subCategoryProducts) {
                const filteredProducts = subCategoryProducts.filter(product =>
                  product.name.toLowerCase().includes(query) ||
                  product.description.toLowerCase().includes(query)
                ).map(product => ({
                  ...product,
                  categorySlug: category.slug,
                  subCategorySlug: subCategory.slug
                }));
                matchedProducts.push(...filteredProducts);
              }
            });
          }
        });

        setSearchResults({
          products: matchedProducts.slice(0, 5), // Limit to 5 products
          categories: matchedCategories.slice(0, 3) // Limit to 3 categories
        });
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(performSearch, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const closeSearch = () => {
    setIsOpen(false);
    setSearchQuery('');
    setSearchResults({ products: [], categories: [] });
  };

  if (!isOpen) return null;

  return (
    <div className="relative" ref={searchRef}>
      {/* Search Input */}
      <div className="fixed top-0 right-0 mt-16 mr-4 w-full max-w-lg bg-white rounded-lg shadow-xl border border-gray-200 z-50">
        <div className="p-4">
          <div className="relative">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B8860B] focus:border-transparent"
              placeholder="Search products and categories..."
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3"
              >
                <XMarkIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>

          {/* Search Results */}
          <div className="mt-4 max-h-[calc(100vh-200px)] overflow-y-auto">
            {isLoading ? (
              <div className="py-4 text-center text-gray-500">
                Searching...
              </div>
            ) : (
              <>
                {/* Categories */}
                {searchResults.categories.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Categories</h3>
                    <div className="space-y-2">
                      {searchResults.categories.map((category) => (
                        <Link
                          key={category.id}
                          href={`/categories/${category.slug}`}
                          onClick={closeSearch}
                          className="block p-2 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <div className="font-medium text-gray-900">{category.name}</div>
                          <div className="text-sm text-gray-500">{category.description}</div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Products */}
                {searchResults.products.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Products</h3>
                    <div className="space-y-2">
                      {searchResults.products.map((product) => (
                        <Link
                          key={product.id}
                          href={`/categories/${product.categorySlug}/${product.subCategorySlug}/${product.id}`}
                          onClick={closeSearch}
                          className="flex items-center p-2 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="ml-3 flex-1">
                            <div className="font-medium text-gray-900">{product.name}</div>
                            <div className="text-sm text-gray-500">
                              {product.currency} {product.price.toLocaleString()}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* No Results */}
                {!isLoading && searchQuery && !searchResults.products.length && !searchResults.categories.length && (
                  <div className="py-4 text-center text-gray-500">
                    No results found for "{searchQuery}"
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 