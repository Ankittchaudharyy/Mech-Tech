import React, { useState, useEffect } from 'react';
import { X, Send, PhoneCall, ImageOff } from 'lucide-react';
import { Product } from '../types/index.ts';

interface ProductSpecModalProps {
  product: Product | null;
  onClose: () => void;
  onEnquire: (productTitle: string) => void;
}

export const ProductSpecModal: React.FC<ProductSpecModalProps> = ({
  product,
  onClose,
  onEnquire,
}) => {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [product?.id]);

  if (!product) return null;

  const titleString = product.model ? `${product.model} | ${product.name}` : product.name;
  const specEntries = product.specs ? Object.entries(product.specs) : [];
  const hasSpecs = specEntries.length > 0;
  const showRealImage = Boolean(product.image) && !imgError;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#06234B]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-slate-200 my-8 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#06234B] text-white p-6 flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="bg-white rounded-xl p-1.5 shadow-md shrink-0 hidden sm:block">
              <img
                src="/images/logo.png"
                alt="MECHTECH"
                className="h-10 w-auto object-contain"
              />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase text-[#F97316] tracking-wider">
                  {(product.categoryId || 'Equipment').replace(/-/g, ' ')} •{' '}
                  {(product.subcategoryId || 'Machine').replace(/-/g, ' ')}
                </span>
                {product.catalogPage && (
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-white/10 text-slate-200">
                    Catalog Pg {String(product.catalogPage).padStart(2, '0')}
                    {product.catalogNumber ? ` • #${product.catalogNumber}` : ''}
                  </span>
                )}
              </div>
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl mt-1.5">
                {product.model ? (
                  <>
                    <span className="text-[#F97316]">{product.model}</span> | {product.name}
                  </>
                ) : (
                  product.name
                )}
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition shrink-0 ml-4 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Visual Showcase */}
          <div className="md:col-span-5 bg-white rounded-2xl p-4 border border-slate-200 flex flex-col items-center justify-center min-h-[260px]">
            {showRealImage ? (
              <img
                src={product.image!}
                alt={titleString}
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="max-h-60 max-w-full object-contain rounded-lg"
              />
            ) : (
              <div className="w-full h-56 bg-slate-100 rounded-xl flex flex-col items-center justify-center p-4 text-center border border-slate-200">
                <div className="w-10 h-10 rounded-xl bg-slate-200 flex items-center justify-center text-slate-500 mb-2">
                  <ImageOff className="w-5 h-5" />
                </div>
                <p className="font-display font-bold text-xs text-[#06234B] line-clamp-2 px-2">
                  {titleString}
                </p>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-1.5">
                  Image Not Available
                </span>
              </div>
            )}

            <div className="mt-3 text-center">
              <span className="inline-block text-xs font-bold text-[#06234B] bg-slate-100 px-3 py-1 rounded border border-slate-200">
                {product.inCatalog ? 'Official 2025 Catalog Entry' : 'Catalog Slot • Enquire for Quote'}
              </span>
            </div>
          </div>

          {/* Full Verbatim Technical Parameter Table */}
          <div className="md:col-span-7">
            {hasSpecs ? (
              <div className="border border-slate-200 rounded-2xl overflow-hidden max-h-96 overflow-y-auto">
                <table className="w-full text-xs text-left">
                  <tbody>
                    {specEntries.map(([key, val], idx) => (
                      <tr
                        key={key}
                        className={`${
                          idx % 2 === 0 ? 'bg-slate-50' : 'bg-white'
                        } border-b border-slate-200 last:border-0`}
                      >
                        <th className="py-2.5 px-4 font-bold text-[#06234B] w-2/5 align-top">
                          {key}
                        </th>
                        <td className="py-2.5 px-4 text-slate-700 font-medium leading-relaxed">
                          {typeof val === 'string' ? val : JSON.stringify(val)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="border border-slate-200 rounded-2xl p-8 bg-slate-50 flex flex-col items-center justify-center text-center min-h-[220px]">
                <span className="font-display font-bold text-sm text-[#06234B]">
                  Details not available
                </span>
              </div>
            )}

            {product.notes && (
              <div className="mt-3 p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 text-[11px]">
                <strong>Catalog Reference:</strong> {product.notes}
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-500 flex items-center gap-2">
            <PhoneCall className="w-4 h-4 text-[#66B821]" />
            <span>
              Direct Helpline: <strong className="text-slate-800">+91 9149158815</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200 transition cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onEnquire(titleString);
              }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#06234B] to-[#F97316] hover:opacity-95 text-white text-xs font-bold shadow-sm transition flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Enquire Now / Get Quote</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
