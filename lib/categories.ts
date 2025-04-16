import { Category } from '@/types/categories';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Outdoor',
    description: 'Premium outdoor furniture for your garden and patio',
    image: '/Test.jpg',
    slug: 'outdoor'
  },
  {
    id: '2',
    name: 'Office Chairs',
    description: 'Ergonomic office chairs for maximum comfort',
    image: '/Test.jpg',
    slug: 'office-chairs'
  },
  {
    id: '3',
    name: 'Restaurant Furniture',
    description: 'Stylish and durable furniture for restaurants',
    image: '/Test.jpg',
    slug: 'restaurant-furniture'
  },
  {
    id: '4',
    name: 'Interior',
    description: 'Interior solutions for your space',
    image: '/Test.jpg',
    slug: 'interior',
    subCategories: [
      {
        id: '4.1',
        name: 'Wall Panel',
        description: 'Modern wall panels for elegant interiors',
        image: '/Test.jpg',
        slug: 'wall-panel'
      },
      {
        id: '4.2',
        name: 'Wallpaper',
        description: 'Stylish wallpapers for any room',
        image: '/Test.jpg',
        slug: 'wallpaper'
      },
      {
        id: '4.3',
        name: 'PVC Flooring',
        description: 'Durable and attractive PVC flooring solutions',
        image: '/Test.jpg',
        slug: 'pvc-flooring'
      },
      {
        id: '4.4',
        name: 'Ceiling',
        description: 'Beautiful ceiling solutions for your space',
        image: '/Test.jpg',
        slug: 'ceiling'
      }
    ]
  },
  {
    id: '5',
    name: 'Roller Blinds',
    description: 'Custom roller blinds for your windows',
    image: '/Test.jpg',
    slug: 'roller-blinds',
    subCategories: [
      {
        id: '5.1',
        name: 'Mini Blinder',
        description: 'Compact and stylish mini blinds',
        image: '/Test.jpg',
        slug: 'mini-blinder'
      },
      {
        id: '5.2',
        name: 'Zaire Blinder',
        description: 'Premium Zaire blinds for your windows',
        image: '/Test.jpg',
        slug: 'zaire-blinder'
      },
      {
        id: '5.3',
        name: 'Bamboo Blinder',
        description: 'Natural bamboo blinds for eco-friendly homes',
        image: '/Test.jpg',
        slug: 'bamboo-blinder'
      }
    ]
  },
  {
    id: '6',
    name: 'Door',
    description: 'High-quality doors for your home',
    image: '/Test.jpg',
    slug: 'door',
    subCategories: [
      {
        id: '6.1',
        name: 'PVC Door',
        description: 'Durable and stylish PVC doors',
        image: '/Test.jpg',
        slug: 'pvc-door'
      }
    ]
  }
]; 