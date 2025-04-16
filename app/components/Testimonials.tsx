'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Feedback, getTopFeedback } from '@/lib/feedback';

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1">
      {[...Array(rating)].map((_, index) => (
        <svg
          key={index}
          className="w-4 h-4 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const data = await getTopFeedback(3);
        setTestimonials(data);
      } catch (error) {
        console.error('Error loading testimonials:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTestimonials();
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B8860B] mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers have shared about their 
            experience with us.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
            <div className="text-4xl font-bold text-[#B8860B] mb-2">
              {testimonials.length}+
            </div>
            <div className="text-gray-600">Featured Reviews</div>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
            <div className="text-4xl font-bold text-[#B8860B] mb-2">
              {(testimonials.reduce((sum, item) => sum + item.rating, 0) / testimonials.length || 0).toFixed(1)}
            </div>
            <div className="text-gray-600">Average Rating</div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-gray-100 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-600">
                    {item.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.role}</p>
                  <p className="text-sm text-gray-500">{item.location}</p>
                  <StarRating rating={item.rating} />
                </div>
                <div className="ml-auto text-sm text-gray-500">
                  {new Date(item.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
              <p className="text-gray-600 mb-4">{item.feedback_text}</p>
              <div className="border-t border-gray-100 pt-4">
                <p className="text-sm text-gray-500 mb-2">Purchased Items:</p>
                <div className="flex flex-wrap gap-2">
                  {item.purchased_items.map((product, index) => (
                    <span
                      key={index}
                      className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {product}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Link
            href="/happy-customers"
            className="inline-block bg-[#B8860B] text-white px-8 py-3 rounded-lg hover:bg-[#9A7209] transition-colors"
          >
            View All Reviews
          </Link>
        </div>
      </div>
    </section>
  );
} 