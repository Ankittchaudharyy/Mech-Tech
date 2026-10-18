export type SpecValue = string | Record<string, string>;

export interface Product {
  id: string;
  model: string | null;
  name: string;
  inCatalog?: boolean;
  catalogPage?: number | null;
  pdfPage?: number | null;
  catalogNumber?: string | null;
  photo?: 'yes' | 'no' | 'shared';
  image?: string | null;
  svgType?: string;
  specs: Record<string, SpecValue> | null;
  notes?: string;
  group?: string;
  categoryId?: string;
  subcategoryId?: string;
  page?: number;
  badge?: string;
  summary?: string;
  category?: string;
}

export interface SubCategory {
  id: string;
  name: string;
  mappingConfirmed?: boolean;
  products: Product[];
}

export interface Category {
  id: string;
  name: string;
  subcategories: SubCategory[];
}

export interface CategoryInfo {
  name: string;
  icon: string;
  count: number;
  desc: string;
}

export interface HeroSlide {
  productId: string;
  badge: string;
  model: string;
  title: string;
  description: string;
  highlights: { label: string; value: string }[];
  category: string;
  svgType: string;
  accent: string;
  bgGradient: string;
  image?: string | null;
}
