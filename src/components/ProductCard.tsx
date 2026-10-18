import React, { useState } from 'react';
import { ImageOff, Sparkles, Send, FileText } from 'lucide-react';
import { Product } from '../types/index.ts';

interface ProductCardProps {
  product: Product;
  onViewProduct: (product: Product) => void;
  onEnquireProduct: (modelOrName: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onViewProduct,
  onEnquireProduct,
}) => {
  const [imgError, setImgError] = useState(false);

  const specEntries = product.specs ? Object.entries(product.specs) : [];
  const hasSpecs = specEntries.length > 0;
  const showRealImage = Boolean(product.image) && !imgError;

  const titleString = product.model ? `${product.model} | ${product.name}` : product.name;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 hover:border-[#F97316] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden h-[580px] group">
      {/* 1. Uniform Image Area (Exact same h-52 height on ALL cards) */}
      <div className="relative h-52 w-full bg-white border-b border-slate-100 flex items-center justify-center p-3 overflow-hidden shrink-0">
        {/* Top Left Catalog Page / Status Tag */}
        <div className="absolute top-3 left-3 z-10">
          {product.inCatalog ? (
            <span className="px-2.5 py-1 rounded text-[11px] font-display font-bold text-white bg-[#06234B] shadow-sm">
              {product.catalogPage ? `PG ${String(product.catalogPage).padStart(2, '0')}` : 'CATALOG'}
              {product.catalogNumber ? ` • #${product.catalogNumber}` : ''}
            </span>
          ) : (
            <span className="px-2.5 py-1 rounded text-[11px] font-display font-bold text-slate-600 bg-slate-200">
              CATALOG SLOT
            </span>
          )}
        </div>

        {/* Top Right Badge */}
        <div className="absolute top-3 right-3 z-10">
          {product.inCatalog ? (
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-[#F97316] text-white shadow-sm">
              {product.model || 'Catalog Item'}
            </span>
          ) : (
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-slate-200 text-slate-600">
              Upon Request
            </span>
          )}
        </div>

        {/* Visual Content: Real Image from Catalog.pdf OR Clean Neutral Placeholder */}
        {showRealImage ? (
          <div
            onClick={() => onViewProduct(product)}
            className="w-full h-full flex items-center justify-center cursor-pointer relative"
          >
            <img
              src={product.image!}
              alt={titleString}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
            />
            {product.model && (
              <span className="absolute bottom-1 right-1 bg-[#06234B]/90 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded">
                {product.model}
              </span>
            )}
          </div>
        ) : (
          /* Clean Neutral Placeholder with Product Name and "Image Not Available" */
          <div className="w-full h-full bg-slate-100 rounded-xl flex flex-col items-center justify-center p-4 text-center select-none border border-slate-200">
            <div className="w-9 h-9 rounded-lg bg-slate-200/90 flex items-center justify-center text-slate-500 mb-2">
              <ImageOff className="w-4 h-4 text-slate-500" />
            </div>
            <p className="font-display font-bold text-xs text-[#06234B] line-clamp-2 px-3 leading-snug">
              {product.model ? `${product.model} - ${product.name}` : product.name}
            </p>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-1.5">
              Image Not Available
            </span>
          </div>
        )}
      </div>

      {/* 2. Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between min-h-0">
        <div className="flex flex-col min-h-0">
          {/* Subcategory & Group Breadcrumb */}
          <div className="flex items-center justify-between gap-2 text-[10px] font-bold uppercase tracking-wider text-[#0084D6]">
            <span className="truncate">
              {product.subcategoryId
                ? product.subcategoryId.replace(/-/g, ' ')
                : product.category || 'Equipment'}
            </span>
            {hasSpecs && (
              <span className="text-slate-500 font-mono shrink-0">
                {specEntries.length} Specs
              </span>
            )}
          </div>

          {/* Model & Name */}
          <h3 className="font-display font-extrabold text-base text-[#06234B] mt-1 group-hover:text-[#F97316] transition leading-snug line-clamp-2 min-h-[44px]">
            {product.model ? (
              <>
                <span className="text-[#F97316]">{product.model}</span> | {product.name}
              </>
            ) : (
              product.name
            )}
          </h3>

          {/* 3. Complete Verbatim Specs Section (Exact same h-48 height and style on ALL cards) */}
          <div
            className={`mt-2.5 h-48 bg-slate-50 rounded-xl p-3 border border-slate-200/80 overflow-y-auto flex flex-col ${
              hasSpecs ? 'justify-start' : 'justify-center'
            }`}
          >
            {hasSpecs ? (
              <div className="space-y-1.5 pr-1">
                {specEntries.map(([key, val]) => (
                  <div
                    key={key}
                    className="flex flex-col sm:flex-row sm:justify-between sm:items-start text-[11px] gap-0.5 sm:gap-2 border-b border-slate-200/70 pb-1.5 last:border-0 last:pb-0"
                  >
                    <span className="font-bold text-[#06234B] shrink-0 text-left">
                      {key}:
                    </span>
                    <span className="text-slate-700 sm:text-right font-medium leading-snug break-words">
                      {typeof val === 'string' ? val : JSON.stringify(val)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              /* Missing Specs Required Text in exact same style and size */
              <div className="h-full flex flex-col items-center justify-center text-center p-2">
                <span className="text-[11px] font-bold text-[#06234B]">
                  Details not available
                </span>
              </div>
            )}
          </div>
        </div>

        {/* 4. Action Buttons (Uniform height & styling across all cards) */}
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => onViewProduct(product)}
            className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-[#06234B] text-[#06234B] hover:text-white font-bold text-xs transition duration-200 flex items-center justify-center gap-1 cursor-pointer shrink-0"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{hasSpecs ? 'Full Specs' : 'View Slot'}</span>
          </button>

          <button
            type="button"
            onClick={() => onEnquireProduct(titleString)}
            className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#06234B] via-[#083066] to-[#F97316] hover:opacity-95 text-white font-bold text-xs transition shadow-sm flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 whitespace-nowrap"
          >
            <Send className="w-3.5 h-3.5 shrink-0" />
            <span>Enquire Now / Get Quote</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Dedicated Coming Soon Card for Empty Subcategories (Exact same h-[580px] size & proportions)
interface ComingSoonCardProps {
  subcategoryName: string;
  categoryName: string;
  onEnquire: (text: string) => void;
}

export const ComingSoonCard: React.FC<ComingSoonCardProps> = ({
  subcategoryName,
  categoryName,
  onEnquire,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between overflow-hidden h-[580px]">
      <div className="relative h-52 w-full bg-slate-100 flex flex-col items-center justify-center p-4 text-center border-b border-slate-200 shrink-0">
        <div className="w-10 h-10 rounded-xl bg-[#06234B]/10 text-[#06234B] flex items-center justify-center mb-2">
          <Sparkles className="w-5 h-5 text-[#F97316]" />
        </div>
        <span className="font-display font-extrabold text-sm text-[#06234B]">
          {subcategoryName}
        </span>
        <span className="text-[11px] font-bold text-[#F97316] uppercase tracking-widest mt-1">
          Coming Soon
        </span>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#0084D6]">
            {categoryName}
          </div>
          <h3 className="font-display font-extrabold text-base text-[#06234B] mt-1 min-h-[44px]">
            {subcategoryName} — Coming Soon
          </h3>

          <div className="mt-2.5 h-48 bg-slate-50 rounded-xl p-3 border border-slate-200/80 flex flex-col items-center justify-center text-center">
            <span className="text-[11px] font-bold text-[#06234B]">
              Details not available
            </span>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => onEnquire(`${subcategoryName} - Inquiry`)}
            className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#06234B] via-[#083066] to-[#F97316] hover:opacity-95 text-white font-bold text-xs transition shadow-sm flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 whitespace-nowrap"
          >
            <Send className="w-3.5 h-3.5 shrink-0" />
            <span>Enquire Now / Get Quote</span>
          </button>
        </div>
      </div>
    </div>
  );
};
