export interface SubCategory {
  id: string;
  name: string;
  description: string;
  image: string;
  slug: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  slug: string;
  subCategories?: Category[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  currency: string;
} 