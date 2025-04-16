'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, ShoppingCartIcon, MagnifyingGlassIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import Search from './Search';
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/nextjs';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Categories', href: '/categories' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { totalItems } = useCart();
  const { user } = useUser();
  const isAdmin = user?.publicMetadata?.role === 'admin';

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img
              src="/logo.png"
              alt="Outdoor Furniture Logo"
              className="h-10 w-auto object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/test.jpg';
              }}
            />
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className={`text-gray-700 hover:text-[#B8860B] ${pathname === '/' ? 'text-[#B8860B]' : ''}`}
            >
              Home
            </Link>
            <Link 
              href="/categories" 
              className={`text-gray-700 hover:text-[#B8860B] ${pathname === '/categories' ? 'text-[#B8860B]' : ''}`}
            >
              Categories
            </Link>
            <Link 
              href="/about" 
              className={`text-gray-700 hover:text-[#B8860B] ${pathname === '/about' ? 'text-[#B8860B]' : ''}`}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className={`text-gray-700 hover:text-[#B8860B] ${pathname === '/contact' ? 'text-[#B8860B]' : ''}`}
            >
              Contact
            </Link>
            <Link 
              href="/happy-customers" 
              className={`text-gray-700 hover:text-[#B8860B] ${pathname === '/happy-customers' ? 'text-[#B8860B]' : ''}`}
            >
              Happy Customers
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center px-4 py-2 rounded-lg border border-gray-300 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 text-gray-500"
            >
              <MagnifyingGlassIcon className="h-5 w-5 mr-2" />
              <span>Search products...</span>
            </button>
          </div>

          {/* Cart and Auth */}
          <div className="flex items-center space-x-4">
            <Link
              href="/cart"
              className="relative p-2 text-gray-700 hover:text-[#B8860B]"
            >
              <ShoppingCartIcon className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#B8860B] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
            <SignedIn>
              {isAdmin && (
                <Link
                  href="/admin/dashboard"
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#B8860B] hover:bg-[#966F09] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B8860B]"
                >
                  <UserCircleIcon className="h-5 w-5 mr-2" />
                  Admin Dashboard
                </Link>
              )}
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="redirect" fallbackRedirectUrl="/">
                <button className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#B8860B] hover:bg-[#966F09] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B8860B]">
                  Sign in
                </button>
              </SignInButton>
            </SignedOut>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#B8860B]"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <Dialog as="div" className="md:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">FurnitxureOutdoor</span>
              <img
                className="h-8 w-auto"
                src="/logo.png"
                alt="FurnitxureOutdoor Logo"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/test.jpg';
                }}
              />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 ${
                      pathname === item.href
                        ? 'text-[#B8860B]'
                        : 'text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  href="/happy-customers"
                  className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 ${
                    pathname === '/happy-customers'
                      ? 'text-[#B8860B]'
                      : 'text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  Happy Customers
                </Link>
                {isAdmin && (
                  <Link
                    href="/admin/dashboard"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Admin Dashboard
                  </Link>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>

      {/* Search Modal */}
      <Search isOpen={isSearchOpen} setIsOpen={setIsSearchOpen} />
    </nav>
  );
} 