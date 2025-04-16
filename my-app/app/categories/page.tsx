'use client';

import Image from 'next/image';
import Link from 'next/link';
import { categories } from '@/lib/categories';
import Breadcrumb from '@/app/components/Breadcrumb';
import { motion } from 'framer-motion';

export default function CategoriesPage() {
  return (
    <>
      {/* Hero Section similar to About page */}
      <div className="relative h-[400px] bg-[#4A4A4A]">
        {/* Background overlay - removed since we're using the exact color */}
        
        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-center text-center">
        <Image
          src="/glassy.jpg"
          alt="About Us Background"
          fill
          className="object-cover opacity-40"
        />
          
          <h1 className="text-5xl font-bold text-white mb-4">
            Categories
          </h1>
          <div className="flex items-center text-gray-300 text-lg">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="mx-2">›</span>
            <span className="text-white">Categories</span>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              All Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Explore our complete collection of premium furniture and interior solutions for every space.
            </p>
          </motion.div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link 
                  href={`/categories/${category.slug}`}
                  className="group block"
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                    <div className="relative h-80">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent group-hover:from-[#B8860B] group-hover:via-[#B8860B]/40 transition-all duration-500">
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-r from-yellow-400 via-transparent to-yellow-400 transition-opacity duration-500"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-8">
                          <div className="transform group-hover:translate-y-0 transition-all duration-500">
                            <div className="relative inline-block">
                              <h2 className="text-3xl font-bold text-white mb-3 group-hover:text-white">
                                {category.name}
                              </h2>
                              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-500"></div>
                            </div>
                            <p className="text-gray-100 text-lg mb-4 opacity-90 group-hover:opacity-100 max-w-md">
                              {category.description}
                            </p>
                            {category.subCategories && (
                              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full py-2 px-4 group-hover:bg-white/20 transition-all duration-300">
                                <span className="text-white font-medium mr-2">
                                  {category.subCategories.length} subcategories
                                </span>
                                <svg 
                                  className="w-5 h-5 text-white transform group-hover:translate-x-1 transition-transform duration-300" 
                                  fill="none" 
                                  stroke="currentColor" 
                                  viewBox="0 0 24 24"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
} 