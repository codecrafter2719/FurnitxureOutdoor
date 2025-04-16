'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumb from '@/app/components/Breadcrumb';
import { categories } from '@/lib/categories';

// Sample products data (would normally come from an API/database)
const sampleProducts = [
  {
    id: '1',
    name: 'Premium Outdoor Dining Set',
    description: 'A luxurious outdoor dining set perfect for entertaining guests.',
    price: 45000,
    image: '/test.jpg',
    features: [
      'Weather-resistant materials',
      'Comfortable seating',
      'Easy to clean',
      'Includes 6 chairs and 1 table',
      'Assembly required'
    ],
    dimensions: {
      table: '180cm x 90cm x 75cm',
      chair: '45cm x 45cm x 90cm'
    },
    material: 'Teak wood with UV-resistant finish',
    warranty: '2 years manufacturer warranty',
    delivery: 'Free delivery within Karachi',
    assembly: 'Professional assembly available for additional charge'
  },
  {
    id: '2',
    name: 'Modern Outdoor Lounge Set',
    description: 'Contemporary outdoor lounge set with comfortable cushions.',
    price: 35000,
    image: '/test.jpg',
    features: [
      'Modern design',
      'Comfortable cushions included',
      'UV-resistant fabric',
      'Includes 2 chairs and 1 coffee table',
      'Easy to maintain'
    ],
    dimensions: {
      chair: '80cm x 80cm x 70cm',
      table: '60cm x 60cm x 45cm'
    },
    material: 'Powder-coated aluminum with weather-resistant cushions',
    warranty: '1 year manufacturer warranty',
    delivery: 'Free delivery within Karachi',
    assembly: 'Professional assembly available for additional charge'
  },
  {
    id: '3',
    name: 'Classic Wooden Bench',
    description: 'Handcrafted wooden bench perfect for gardens and patios.',
    price: 15000,
    image: '/test.jpg',
    features: [
      'Handcrafted design',
      'Solid wood construction',
      'Weather-resistant finish',
      'Seats 2-3 people',
      'No assembly required'
    ],
    dimensions: {
      length: '150cm',
      width: '45cm',
      height: '45cm'
    },
    material: 'Solid teak wood with protective finish',
    warranty: '1 year manufacturer warranty',
    delivery: 'Free delivery within Karachi',
    assembly: 'No assembly required'
  }
];

export default function CategoryPage() {
  const params = useParams();
  const category = categories.find(cat => cat.slug === params.slug);

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900">Category not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Breadcrumb
          items={[
            { name: 'Home', href: '/' },
            { name: 'Categories', href: '/categories' },
            { name: category.name, href: '#' }
          ]}
        />

        <h1 className="text-3xl font-bold text-gray-900 mt-8 mb-8">{category.name}</h1>

        {category.subCategories ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {category.subCategories.map((subCategory) => (
              <Link
                key={subCategory.slug}
                href={`/categories/${category.slug}/${subCategory.slug}`}
                className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="aspect-w-16 aspect-h-9">
                  <Image
                    src={subCategory.image}
                    alt={subCategory.name}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-900 group-hover:text-[#B8860B] transition-colors duration-300">
                    {subCategory.name}
                  </h2>
                  <p className="mt-2 text-gray-600">{subCategory.description}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sampleProducts.map((product) => (
              <Link
                key={product.id}
                href={`/categories/${category.slug}/products/${product.id}`}
                className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-48 w-full overflow-hidden rounded-lg">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/test.jpg';
                    }}
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-900 group-hover:text-[#B8860B] transition-colors duration-300">
                    {product.name}
                  </h2>
                  <p className="mt-2 text-gray-600">{product.description}</p>
                  <p className="mt-2 text-lg font-semibold text-[#B8860B]">
                    PKR {product.price.toLocaleString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 