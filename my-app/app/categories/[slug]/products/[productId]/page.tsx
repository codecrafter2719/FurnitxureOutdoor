'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumb from '@/app/components/Breadcrumb';
import { useCart } from '@/app/context/CartContext';

// Sample products data (would normally come from an API/database)
const sampleProducts = [
  {
    id: '1',
    name: 'Premium Outdoor Dining Set',
    description: 'A luxurious outdoor dining set perfect for entertaining guests. Made from high-quality weather-resistant materials.',
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
    description: 'Contemporary outdoor lounge set with comfortable cushions and durable frame.',
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

export default function ProductPage() {
  const params = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);

  // Find the product based on the ID
  const product = sampleProducts.find(p => p.id === params.productId);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900">Product not found</h1>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Breadcrumb
          items={[
            { name: 'Home', href: '/' },
            { name: 'Categories', href: '/categories' },
            { name: params.slug as string, href: `/categories/${params.slug}` },
            { name: product.name, href: '#' }
          ]}
        />

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Product Image */}
          <div className="w-full md:w-1/2">
            <div className="relative h-[400px] w-full overflow-hidden rounded-lg">
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
          </div>

          {/* Product Details */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            <p className="text-2xl font-semibold text-[#B8860B] mb-6">
              PKR {product.price.toLocaleString()}
            </p>
            <p className="text-gray-600 mb-6">{product.description}</p>

            {/* Features */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Features</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            {/* Specifications */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Specifications</h2>
              <div className="grid grid-cols-2 gap-4 text-gray-600">
                <div>
                  <p className="font-medium">Material</p>
                  <p>{product.material}</p>
                </div>
                <div>
                  <p className="font-medium">Warranty</p>
                  <p>{product.warranty}</p>
                </div>
                <div>
                  <p className="font-medium">Delivery</p>
                  <p>{product.delivery}</p>
                </div>
                <div>
                  <p className="font-medium">Assembly</p>
                  <p>{product.assembly}</p>
                </div>
              </div>
            </div>

            {/* Dimensions */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Dimensions</h2>
              <div className="grid grid-cols-2 gap-4 text-gray-600">
                {Object.entries(product.dimensions).map(([key, value]) => (
                  <div key={key}>
                    <p className="font-medium capitalize">{key}</p>
                    <p>{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Add to Cart */}
            <div className="mt-8">
              <div className="flex items-center space-x-4 mb-4">
                <label htmlFor="quantity" className="text-gray-700">Quantity:</label>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                  className="w-20 px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <button
                onClick={handleAddToCart}
                className="w-full bg-[#B8860B] text-white py-3 px-6 rounded-md hover:bg-[#966F09] transition-colors"
              >
                Add to Cart
              </button>
              {showSuccess && (
                <p className="mt-2 text-green-600 text-center">
                  Item added to cart successfully!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 