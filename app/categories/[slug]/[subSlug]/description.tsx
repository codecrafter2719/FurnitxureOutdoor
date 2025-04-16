'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { categories } from '@/lib/categories';
import Breadcrumb from '@/app/components/Breadcrumb';

const subCategoryDescriptions = {
  interior: {
    title: "Interior Design Solutions",
    description: "Transform your indoor spaces with our premium interior design solutions. Our collection features modern, elegant, and functional pieces that will elevate your home's aesthetic.",
    features: [
      "Customizable designs",
      "Premium materials",
      "Modern aesthetics",
      "Functional solutions"
    ]
  },
  'roller-blind': {
    title: "Roller Blinds Collection",
    description: "Discover our extensive range of roller blinds designed for style and functionality. Perfect for controlling light and privacy while adding a touch of elegance to your windows.",
    features: [
      "Light control",
      "Privacy options",
      "Easy maintenance",
      "Various styles"
    ]
  },
  door: {
    title: "Door Solutions",
    description: "Explore our comprehensive door collection featuring both interior and exterior options. From classic designs to modern innovations, find the perfect door for your space.",
    features: [
      "Durable materials",
      "Security features",
      "Style variety",
      "Easy installation"
    ]
  }
};

export default function SubCategoryDescription() {
  const { slug, subSlug } = useParams();
  const category = categories.find(cat => cat.slug === slug);
  const subCategory = category?.subCategories?.find(sub => sub.slug === subSlug);
  const description = subCategoryDescriptions[subSlug as keyof typeof subCategoryDescriptions];

  if (!category || !subCategory || !description) {
    return <div>Description not found</div>;
  }

  return (
    <>
      <Breadcrumb />
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-6">
                {description.title}
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                {description.description}
              </p>
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900">Key Features</h2>
                <ul className="space-y-2">
                  {description.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/Slider.jpg"
                alt={description.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 