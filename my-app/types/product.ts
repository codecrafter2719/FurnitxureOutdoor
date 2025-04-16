export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  sku: string;
  category: string;
  tags: string[];
  images: string[];
  sizes: string[];
  colors: {
    name: string;
    value: string;
  }[];
  reviews: {
    rating: number;
    count: number;
  };
} 