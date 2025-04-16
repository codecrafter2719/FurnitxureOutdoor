'use client';

import Image from 'next/image';
import Link from 'next/link';

// Sample statistics
const stats = [
  { id: 1, label: 'Years of Experience', value: '15+' },
  { id: 2, label: 'Products', value: '500+' },
  { id: 3, label: 'Team Members', value: '50+' },
  { id: 4, label: 'Countries', value: '25+' }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[400px] bg-[#4A4A4A]">
        {/* Background Image */}
        <Image
          src="/glassy.jpg"
          alt="About Us Background"
          fill
          className="object-cover opacity-40"
        />
        
        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-center text-center z-10">
          
          <h1 className="text-5xl font-bold text-white mb-4">
            About Us
          </h1>
          <div className="flex items-center text-gray-300 text-lg">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="mx-2">›</span>
            <span className="text-white">About</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Welcome to Outdoor Furniture
              </h2>
              <div className="space-y-6 text-lg text-gray-600">
                <p>
                  At Outdoor Furniture, we specialize in creating beautiful and durable outdoor living spaces. With years of experience in the industry, we understand that your outdoor area is an extension of your home - a place for relaxation, entertainment, and making memories.
                </p>
                <p>
                  Our commitment to quality is evident in every piece we offer. We carefully select materials that can withstand various weather conditions while maintaining their aesthetic appeal. From elegant dining sets to comfortable lounge furniture, our collection is designed to enhance your outdoor living experience.
                </p>
                <p>
                  We take pride in providing exceptional customer service and expert advice to help you find the perfect pieces for your space. Our team is dedicated to ensuring your complete satisfaction, from selection to delivery and beyond.
                </p>
              </div>
            </div>
            <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/about.jpg"
                alt="About Us"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 