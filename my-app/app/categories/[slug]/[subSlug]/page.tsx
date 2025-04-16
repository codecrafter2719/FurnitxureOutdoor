'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import { categories } from '@/lib/categories';
import { products } from '@/lib/products';
import Breadcrumb from '@/app/components/Breadcrumb';
import Link from 'next/link';
import SubCategoryDescription from './description';

const descriptionSubcategories = ['interior', 'roller-blind', 'door'];

export default function SubCategoryPage() {
  const { slug, subSlug } = useParams();
  const category = categories.find(cat => cat.slug === slug);
  const subCategory = category?.subCategories?.find(sub => sub.slug === subSlug);
  const subCategoryProducts = products[subSlug as string] || [];

  if (!category || !subCategory) {
    return <div>Category not found</div>;
  }

  // If this is one of the subcategories that should show the description
  if (descriptionSubcategories.includes(subSlug as string)) {
    return <SubCategoryDescription />;
  }

  return (
    <>
      <Breadcrumb />
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Subcategory Header */}
          <div className="text-center mb-16">
            <div className="text-sm text-gray-600 mb-2">
              {category.name} /
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {subCategory.name}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {subCategory.description}
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {subCategoryProducts.map((product) => (
              <Link
                key={product.id}
                href={`/categories/${category.slug}/${subCategory.slug}/${product.id}`}
                className="group"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="relative h-64">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-[#B8860B]">
                        {product.currency} {product.price.toLocaleString()}
                      </span>
                      <button className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
} 