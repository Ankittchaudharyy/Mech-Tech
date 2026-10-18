import React, { useState, useMemo, useEffect } from 'react';
import { Layers, Grid, Filter } from 'lucide-react';
import { Product } from '../types/index.ts';
import { CATALOG_CATEGORIES, ALL_PRODUCTS } from '../data/catalogData.ts';
import { ProductCard, ComingSoonCard } from './ProductCard.tsx';

interface ProductCatalogSectionProps {
  onViewProduct: (product: Product) => void;
  onEnquireProduct: (modelOrTitle: string) => void;
  selectedCategoryId?: string;
  onSelectCategory?: (catId: string) => void;
}

export const ProductCatalogSection: React.FC<ProductCatalogSectionProps> = ({
  onViewProduct,
  onEnquireProduct,
  selectedCategoryId: externalCategoryId,
  onSelectCategory: externalSetCategory,
}) => {
  const [internalCategoryId, setInternalCategoryId] = useState<string>('all');
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<string>('all');

  const activeCategoryId = externalCategoryId || internalCategoryId;

  // Reset subcategory when external category changes
  useEffect(() => {
    setSelectedSubcategoryId('all');
  }, [activeCategoryId]);

  const handleCategoryChange = (catId: string) => {
    if (externalSetCategory) {
      externalSetCategory(catId);
    }
    setInternalCategoryId(catId);
    setSelectedSubcategoryId('all');
  };

  // Find currently active Category object
  const activeCategoryObj = useMemo(() => {
    if (activeCategoryId === 'all') return null;
    return CATALOG_CATEGORIES.find((c) => c.id === activeCategoryId) || null;
  }, [activeCategoryId]);

  // Subcategories available for filter (shows all 19 when 'all' is active, or category-specific ones)
  const currentSubcategories = useMemo(() => {
    if (!activeCategoryObj) {
      return CATALOG_CATEGORIES.flatMap((c) =>
        c.subcategories.map((sub) => ({ ...sub, parentCategoryName: c.name, parentCategoryId: c.id }))
      );
    }
    return activeCategoryObj.subcategories.map((sub) => ({
      ...sub,
      parentCategoryName: activeCategoryObj.name,
      parentCategoryId: activeCategoryObj.id,
    }));
  }, [activeCategoryObj]);

  // Filter products based on Category & Subcategory selection
  const displayedItems = useMemo(() => {
    if (selectedSubcategoryId !== 'all') {
      for (const cat of CATALOG_CATEGORIES) {
        const sub = cat.subcategories.find((s) => s.id === selectedSubcategoryId);
        if (sub) return sub.products;
      }
      return [];
    }

    if (activeCategoryId === 'all') {
      return ALL_PRODUCTS;
    }

    if (!activeCategoryObj) return [];
    return activeCategoryObj.subcategories.flatMap((sub) => sub.products);
  }, [activeCategoryId, activeCategoryObj, selectedSubcategoryId]);

  const currentSubcategoryObj = useMemo(() => {
    if (selectedSubcategoryId === 'all') return null;
    return currentSubcategories.find((s) => s.id === selectedSubcategoryId) || null;
  }, [currentSubcategories, selectedSubcategoryId]);

  // Check if current view is an empty subcategory (e.g. Wire Harness Assembly)
  const isEmptySubcategory =
    selectedSubcategoryId !== 'all' &&
    currentSubcategoryObj !== null &&
    displayedItems.length === 0;

  // Also show Coming Soon card at the end when viewing all Wire Harness Machines or All Categories
  const showTrailingComingSoonForEmptySubcategories =
    selectedSubcategoryId === 'all' &&
    (activeCategoryId === 'all' || activeCategoryId === 'wire-harness-machines');

  return (
    <section id="catalog-section" className="py-16 bg-[#F4F8FB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#F97316] bg-[#F97316]/10 px-4 py-1.5 rounded mb-3">
            <Layers className="w-3.5 h-3.5 text-[#F97316]" />
            <span>Official 2025 Equipment Catalog</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#06234B] leading-tight">
            Mechtech Product Catalog
          </h2>
          <p className="text-slate-600 text-sm mt-2 leading-relaxed">
            Browse all categories, sub-categories, machine photographs, and verbatim technical specifications from our official catalog.
          </p>
        </div>

        {/* 1. Main Category Navigation Tabs (from mechtech-catalog.json) */}
        <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-200 mb-5 overflow-x-auto">
          <div className="flex items-center gap-2 min-w-max">
            <button
              type="button"
              onClick={() => handleCategoryChange('all')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition duration-200 cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                activeCategoryId === 'all'
                  ? 'bg-[#06234B] text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-[#06234B]'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>All Categories</span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-mono tabular-nums ${
                  activeCategoryId === 'all'
                    ? 'bg-[#F97316] text-white'
                    : 'bg-slate-200 text-slate-700'
                }`}
              >
                {ALL_PRODUCTS.length}
              </span>
            </button>

            {CATALOG_CATEGORIES.map((cat) => {
              const isActive = activeCategoryId === cat.id;
              const productCount = cat.subcategories.reduce(
                (sum, sub) => sum + sub.products.length,
                0
              );

              return (
                <button
                  type="button"
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition duration-200 cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-r from-[#06234B] to-[#F97316] text-white shadow-md'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono tabular-nums ${
                      isActive
                        ? 'bg-white text-[#06234B] font-bold'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {productCount}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Sub-Category Filter Buttons (Always visible so all 19 sub-categories are directly accessible) */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 mb-8 shadow-sm">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#06234B]">
              <Filter className="w-3.5 h-3.5 text-[#F97316]" />
              <span>
                {activeCategoryObj
                  ? `Sub-Categories in ${activeCategoryObj.name}`
                  : 'Filter by Sub-Category (All 19 Sub-Categories)'}
              </span>
            </div>
            {selectedSubcategoryId !== 'all' && (
              <button
                type="button"
                onClick={() => setSelectedSubcategoryId('all')}
                className="text-xs font-bold text-[#F97316] hover:underline cursor-pointer"
              >
                Reset Sub-Category Filter
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setSelectedSubcategoryId('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                selectedSubcategoryId === 'all'
                  ? 'bg-[#F97316] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Sub-Categories ({currentSubcategories.length})
            </button>

            {currentSubcategories.map((sub) => {
              const isSubActive = selectedSubcategoryId === sub.id;
              const count = sub.products.length;

              return (
                <button
                  type="button"
                  key={sub.id}
                  onClick={() => setSelectedSubcategoryId(sub.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                    isSubActive
                      ? 'bg-[#06234B] text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <span>{sub.name}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded font-mono tabular-nums ${
                      count === 0
                        ? 'bg-amber-100 text-amber-800'
                        : isSubActive
                        ? 'bg-[#F97316] text-white'
                        : 'bg-white text-slate-600'
                    }`}
                  >
                    {count === 0 ? 'Coming Soon' : count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Catalog Status Counter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-6 px-1 text-xs text-slate-600">
          <div className="flex items-center gap-2 font-medium">
            <span className="font-bold text-[#06234B]">Showing:</span>
            <span>
              {activeCategoryObj ? activeCategoryObj.name : 'All Categories'}
              {currentSubcategoryObj ? ` · ${currentSubcategoryObj.name}` : ''}
            </span>
          </div>

          <div className="font-mono text-[11px] bg-white px-3 py-1 rounded border border-slate-200 font-bold text-[#06234B] tabular-nums">
            {isEmptySubcategory
              ? '1 Sub-Category Slot (Coming Soon)'
              : `${displayedItems.length} Product Slots`}
          </div>
        </div>

        {/* 3. Product Cards Grid (Consistent, uniform card sizing across all 62 products & empty subcategories) */}
        {isEmptySubcategory ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ComingSoonCard
              subcategoryName={currentSubcategoryObj?.name || 'Wire Harness Assembly'}
              categoryName={
                currentSubcategoryObj?.parentCategoryName ||
                activeCategoryObj?.name ||
                'Wire Harness Machines'
              }
              onEnquire={onEnquireProduct}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedItems.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewProduct={onViewProduct}
                onEnquireProduct={onEnquireProduct}
              />
            ))}
            {showTrailingComingSoonForEmptySubcategories && (
              <ComingSoonCard
                subcategoryName="Wire Harness Assembly"
                categoryName="Wire Harness Machines"
                onEnquire={onEnquireProduct}
              />
            )}
          </div>
        )}
      </div>
    </section>
  );
};
