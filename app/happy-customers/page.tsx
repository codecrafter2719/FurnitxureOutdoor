'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Feedback, getFeedback, submitFeedback } from '@/lib/feedback';
import { supabase } from '@/lib/supabase';
import { FeedbackService } from '@/lib/feedback';

const categories = ['All', 'Home Owner', 'Business Owner', 'Interior Designer'];
const ratings = [5, 4, 3, 2, 1];

export default function HappyCustomersPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRating, setSelectedRating] = useState(0);
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [formError, setFormError] = useState<string | null>(null);
  
  const [feedbackForm, setFeedbackForm] = useState({
    name: '',
    email: '',
    role: 'Home Owner',
    location: '',
    rating: 5,
    purchasedItems: '',
    productName: '',
    feedbackText: ''
  });

  useEffect(() => {
    async function loadFeedback() {
      try {
        const data = await getFeedback();
        setFeedback(data);
      } catch (error) {
        console.error('Error loading feedback:', error);
      } finally {
        setLoading(false);
      }
    }

    loadFeedback();
  }, []);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!validateEmail(feedbackForm.email)) {
      setFormError('Please enter a valid email address');
      return;
    }

    try {
      const purchasedItemsArray = feedbackForm.purchasedItems
        .split(',')
        .map(item => item.trim())
        .filter(item => item.length > 0);

      const newFeedback = await submitFeedback({
        name: feedbackForm.name,
        email: feedbackForm.email,
        role: feedbackForm.role,
        location: feedbackForm.location,
        rating: feedbackForm.rating,
        purchased_items: purchasedItemsArray,
        product_name: feedbackForm.productName,
        feedback_text: feedbackForm.feedbackText
      });

      if (newFeedback) {
        setFeedback(prev => [newFeedback, ...prev]);
      }

      setFeedbackForm({
        name: '',
        email: '',
        role: 'Home Owner',
        location: '',
        rating: 5,
        purchasedItems: '',
        productName: '',
        feedbackText: ''
      });

      alert('Thank you for your feedback!');

    } catch (error) {
      console.error('Feedback submission error:', error);
      setFormError('Error submitting feedback. Please try again.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFeedbackForm(prev => ({ ...prev, [name]: value }));
  };

  const filteredFeedback = feedback.filter(item => {
    const categoryMatch = selectedCategory === 'All' || item.role === selectedCategory;
    const ratingMatch = selectedRating === 0 || item.rating === selectedRating;
    return categoryMatch && ratingMatch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B8860B]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="relative h-[300px] bg-gray-100">
      <Image
          src="/glassy.jpg"
          alt="About Us Background"
          fill
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">

          
          <h1 className="text-4xl font-bold mb-4">Happy Customers</h1>
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-gray-300">
              Home
            </Link>
            <span>›</span>
            <span>Happy Customers</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center p-6 bg-gray-50 rounded-2xl">
            <div className="text-4xl font-bold text-[#B8860B] mb-2">
              {feedback.length}+
            </div>
            <div className="text-gray-600">Customer Reviews</div>
          </div>
          <div className="text-center p-6 bg-gray-50 rounded-2xl">
            <div className="text-4xl font-bold text-[#B8860B] mb-2">
              {(feedback.reduce((sum, item) => sum + item.rating, 0) / feedback.length || 0).toFixed(1)}
            </div>
            <div className="text-gray-600">Average Rating</div>
          </div>
        </div>

        {/* Feedback Form */}
        <div className="mb-24 bg-gray-50 rounded-2xl p-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Share Your Experience</h2>
            {formError && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{formError}</div>
            )}
            <form onSubmit={handleFeedbackSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={feedbackForm.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#B8860B] focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={feedbackForm.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#B8860B] focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Role *
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={feedbackForm.role}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#B8860B] focus:border-transparent"
                  >
                    <option value="Home Owner">Home Owner</option>
                    <option value="Business Owner">Business Owner</option>
                    <option value="Interior Designer">Interior Designer</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    Location *
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={feedbackForm.location}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#B8860B] focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-1">
                  Purchased Products (comma separated) *
                </label>
                <input
                  type="text"
                  id="productName"
                  name="productName"
                  value={feedbackForm.productName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#B8860B] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rating *
                </label>
                <div className="flex gap-4">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => setFeedbackForm(prev => ({ ...prev, rating }))}
                      className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm ${
                        rating === feedbackForm.rating
                          ? 'bg-[#B8860B] text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <span>{rating}</span>
                      <svg
                        className="w-4 h-4"
                        fill={rating === feedbackForm.rating ? 'white' : '#B8860B'}
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="feedbackText" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Feedback *
                </label>
                <textarea
                  id="feedbackText"
                  name="feedbackText"
                  value={feedbackForm.feedbackText}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#B8860B] focus:border-transparent"
                  required
                  placeholder="Share your experience with the product..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#B8860B] text-white px-6 py-3 rounded-lg hover:bg-[#9A7209] transition-colors"
              >
                Submit Feedback
              </button>
            </form>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm ${
                    selectedCategory === category
                      ? 'bg-[#B8860B] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              {ratings.map((rating) => (
                <button
                  key={rating}
                  onClick={() => setSelectedRating(rating === selectedRating ? 0 : rating)}
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm ${
                    rating === selectedRating
                      ? 'bg-[#B8860B] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span>{rating}</span>
                  <svg
                    className="w-4 h-4"
                    fill={rating === selectedRating ? 'white' : '#B8860B'}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Feedback List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredFeedback.map((item) => (
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
                  <div className="flex gap-1 mt-1">
                    {[...Array(item.rating)].map((_, index) => (
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
        <div className="mt-16 bg-gray-900 text-white rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Happy Customers</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Experience the quality and service that our customers love. Browse our collection and transform your space today.
          </p>
          <Link
            href="/categories"
            className="inline-block bg-[#B8860B] text-white px-8 py-3 rounded-lg hover:bg-[#9A7209] transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
}