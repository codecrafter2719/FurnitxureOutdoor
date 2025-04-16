'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import { products } from '@/lib/products';
import { categories } from '@/lib/categories';
import Breadcrumb from '@/app/components/Breadcrumb';
import { useState } from 'react';
import { useCart } from '@/app/context/CartContext';

export default function ProductDetailPage() {
  const { slug, subSlug, productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const { addToCart } = useCart();
  
  const category = categories.find(cat => cat.slug === slug);
  const subCategory = category?.subCategories?.find(sub => sub.slug === subSlug);
  const product = products[subSlug as string]?.find(p => p.id === productId);

  if (!product || !category || !subCategory) {
    return <div>Product not found</div>;
  }

  const features = [
    'Weather-resistant materials',
    'High-quality finish',
    'Professional installation available',
    'Easy maintenance',
    'Durable construction'
  ];

  const specifications = {
    Material: 'Premium quality materials',
    Warranty: '2 years manufacturer warranty',
    Delivery: 'Free delivery within Karachi',
    Assembly: 'Professional assembly available for additional charge'
  };

  const dimensions = {
    Width: '180cm',
    Height: '90cm',
    Depth: '75cm'
  };

  const handleAddToCart = () => {
    // Add the product to cart with the selected quantity
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image
      });
    }
    
    // Show success message
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <>
      <Breadcrumb />
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Product Details */}
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              <div className="text-3xl font-bold text-[#B8860B] mb-6">
                {product.currency} {product.price.toLocaleString()}
              </div>
              
              <p className="text-gray-600 mb-8">
                {product.description}
              </p>

              {/* Features */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Features</h2>
                <ul className="space-y-2">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Specifications */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Specifications</h2>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(specifications).map(([key, value]) => (
                    <div key={key}>
                      <div className="font-medium text-gray-900">{key}</div>
                      <div className="text-gray-600">{value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dimensions */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Dimensions</h2>
                <div className="grid grid-cols-3 gap-4">
                  {Object.entries(dimensions).map(([key, value]) => (
                    <div key={key}>
                      <div className="font-medium text-gray-900">{key}</div>
                      <div className="text-gray-600">{value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="flex flex-col space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <label htmlFor="quantity" className="mr-2 text-gray-700">
                      Quantity:
                    </label>
                    <input
                      type="number"
                      id="quantity"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B8860B]"
                    />
                  </div>
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-[#B8860B] text-white px-8 py-3 rounded-lg hover:bg-[#9B7100] transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
                {showSuccess && (
                  <div className="text-green-600 text-center py-2 bg-green-50 rounded-lg">
                    Product added to cart successfully!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 