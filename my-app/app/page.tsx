'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import Hero from './components/Hero'
import Categories from './components/Categories'
import FeaturedCollections from './components/FeaturedCollections'
import Testimonials from './components/Testimonials'

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    if (isSignedIn && pathname !== '/') {
      const role = user?.publicMetadata?.role;

      if (role === 'admin') {
        router.push('/admin/dashboard');
      }
    }
  }, [isSignedIn, user, router, pathname]);

  return (
    <>
      <Hero />
      <Categories />
      <FeaturedCollections />
      <Testimonials />
    </>
  );
}
