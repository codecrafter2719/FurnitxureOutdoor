'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const pathname = usePathname();
  
  // If items are not provided, generate them from the pathname
  if (!items) {
    const paths = pathname.split('/').filter(Boolean);
    items = paths.map((path, index) => {
      const href = `/${paths.slice(0, index + 1).join('/')}`;
      const name = path.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
      
      return { name, href };
    });
  }

  if (items.length === 0) return null;

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center">
            {index > 0 && (
              <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-gray-400" />
            )}
            <Link
              href={item.href}
              className={`${
                index === items.length - 1
                  ? 'text-gray-500'
                  : 'text-gray-400 hover:text-gray-500'
              } text-sm font-medium`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
} 