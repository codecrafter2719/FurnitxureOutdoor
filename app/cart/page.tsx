'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useCart } from '../context/CartContext';
import { useAuth } from '@clerk/nextjs';

export default function CartPage() {
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const { items, removeFromCart, updateQuantity } = useCart();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleCheckout = () => {
    if (isSignedIn) {
      router.push('/checkout');
    } else {
      router.push('/sign-in?redirect_url=/checkout');
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Your cart is empty</h1>
            <p className="mt-4 text-gray-600">
              Looks like you haven't added any items to your cart yet.
            </p>
            <button
              onClick={() => router.push('/categories')}
              className="mt-8 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#B8860B] hover:bg-[#966F09]"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="divide-y divide-gray-200">
            {items.map((item) => (
              <div key={item.id} className="p-6 flex items-center">
                <div className="flex-shrink-0 w-24 h-24 relative">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover rounded-md"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/test.jpg';
                    }}
                  />
                </div>
                <div className="ml-6 flex-1">
                  <h2 className="text-lg font-medium text-gray-900">{item.name}</h2>
                  <p className="mt-1 text-sm text-gray-500">PKR {item.price.toLocaleString()}</p>
                  <div className="mt-4 flex items-center">
                    <button
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    <span className="mx-4 text-gray-700">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => {
                    removeFromCart(item.id);
                    setShowSuccess(true);
                    setTimeout(() => setShowSuccess(false), 3000);
                  }}
                  className="ml-6 text-red-600 hover:text-red-800"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
          <div className="p-6 bg-gray-50">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium text-gray-900">Total</span>
              <span className="text-xl font-bold text-gray-900">PKR {total.toLocaleString()}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="mt-6 w-full bg-[#B8860B] text-white py-3 px-4 rounded-md hover:bg-[#966F09] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B8860B]"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 