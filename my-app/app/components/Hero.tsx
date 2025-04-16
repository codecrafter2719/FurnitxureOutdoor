import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  return (
    <div className="relative w-full h-screen">
      {/* Background Image */}
      <Image
        src="/Hero.png"
        alt="Modern furniture in a stylish living room"
        fill
        priority
        className="object-cover brightness-[0.85]"
      />

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Redefine Your Space with Premium Design
            </h1>
            <p className="text-xl text-gray-100 mb-8 leading-relaxed">
              Discover our exclusive collection of meticulously crafted furniture. From outdoor elegance to interior sophistication, create spaces that inspire.
            </p>
            <Link 
              href="/categories"
              className="inline-block bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors duration-200"
            >
              Explore Collection
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 