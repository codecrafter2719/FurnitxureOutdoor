'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const collections = [
  {
    title: 'Luxury Interior',
    description: 'Elevate your living space with modern interior solutions',
    images: ['/Hero.png', '/Slider.jpg', '/Test.jpg'],
    href: '/collections/luxury-interior'
  },
  {
    title: 'Outdoor Living',
    description: 'Transform your outdoor space into a paradise',
    images: ['/Test.jpg', '/Hero.png', '/Slider.jpg'],
    href: '/collections/outdoor-living'
  },
  {
    title: 'Office Solutions',
    description: 'Create a productive workspace with our office collections',
    images: ['/Slider.jpg', '/Test.jpg', '/Hero.png'],
    href: '/collections/office-solutions'
  }
];

export default function FeaturedCollections() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-slide functionality for main slides
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % collections.length);
    }, 8000); // Changed from 5000 to 8000 (8 seconds)

    return () => clearInterval(slideTimer);
  }, []);

  // Auto-change images within each slide
  useEffect(() => {
    const imageTimer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % 3);
    }, 4000); // Changed from 2000 to 4000 (4 seconds)

    return () => clearInterval(imageTimer);
  }, []);

  // Navigation functions
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % collections.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + collections.length) % collections.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Featured Collections
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our handpicked selection of premium furniture and interior solutions designed to 
            elevate your living spaces.
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative overflow-hidden rounded-2xl">
          {/* Slides */}
          <div className="relative aspect-[16/9] w-full">
            {collections.map((collection, slideIndex) => (
              <div 
                key={collection.title}
                className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
                  slideIndex === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {collection.images.map((image, imgIndex) => (
                  <Image
                    key={image}
                    src={image}
                    alt={`${collection.title} - Image ${imgIndex + 1}`}
                    fill
                    className={`object-cover transition-opacity duration-500 ${
                      imgIndex === currentImageIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                    priority
                  />
                ))}
                <div className="absolute inset-0 bg-black/30">
                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                      {collection.title}
                    </h3>
                    <p className="text-lg text-gray-200 mb-6">
                      {collection.description}
                    </p>
                    <Link 
                      href={collection.href}
                      className="inline-block bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors duration-200"
                    >
                      Explore Collection
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-colors duration-200"
            aria-label="Previous slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-colors duration-200"
            aria-label="Next slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dot Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {collections.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-colors duration-200 ${
                  index === currentSlide ? 'bg-white' : 'bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 