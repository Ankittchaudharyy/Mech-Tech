import React, { useState, useEffect } from 'react';
import {
  X,
  Send,
  Building2,
  Mail,
  Phone,
  User,
  MapPin,
  Cpu,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  ShieldCheck,
  FileSpreadsheet,
} from 'lucide-react';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProduct?: string | null;
  onSubmitSuccess: (machineName?: string) => void;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  selectedProduct,
  onSubmitSuccess,
}) => {
  // Form fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [machineOfInterest, setMachineOfInterest] = useState('');
  const [urgency, setUrgency] = useState('Immediate Requirement (1-2 Weeks)');
  const [requirements, setRequirements] = useState('');

  // States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // When selectedProduct changes or modal opens, update machineOfInterest
  useEffect(() => {
    if (selectedProduct) {
      setMachineOfInterest(selectedProduct);
    } else {
      setMachineOfInterest('General Machinery Inquiry / Wire Processing Solutions');
    }
    setErrors({});
  }, [selectedProduct, isOpen]);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const validateForm = () => {
    const errs: { [key: string]: string } = {};

    if (!fullName.trim()) {
      errs.fullName = 'Full Name is required';
    }

    if (!email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Please enter a valid email address';
    }

    if (!phone.trim()) {
      errs.phone = 'Phone / Mobile number is required';
    } else if (!/^[0-9+\s-]{7,16}$/.test(phone.trim())) {
      errs.phone = 'Please enter a valid contact number (at least 7 digits)';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate reliable dispatch to MechTech sales CRM
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
      onSubmitSuccess(machineOfInterest);
      // Reset form fields
      setFullName('');
      setEmail('');
      setPhone('');
      setCompany('');
      setLocation('');
      setRequirements('');
      setErrors({});
    }, 600);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto animate-in fade-in duration-200"
    >
      {/* Dark backdrop with blur */}
      <div
        className="fixed inset-0 bg-[#06234B]/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-slate-200 z-10 animate-in zoom-in-95 duration-200">
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-[#06234B] via-[#083066] to-[#0A3D80] text-white p-5 sm:p-6 relative shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="bg-white rounded-xl p-1.5 shadow-md shrink-0 hidden sm:block">
                <img
                  src="/images/logo.png"
                  alt="MECHTECH"
                  className="h-10 w-auto object-contain"
                />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#66B821] bg-[#66B821]/15 px-3 py-1 rounded-full border border-[#66B821]/30">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Official MECH TECH RFQ &amp; Sales Enquiry</span>
                </div>
                <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white mt-1.5 leading-snug">
                  Enquire Now / Get Quote
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-lg leading-relaxed">
                  Fill in your details below to receive technical specifications, formal quotation, and dispatch lead time from our engineering team.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition shrink-0 cursor-pointer"
              aria-label="Close enquiry form"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* If a machine is pre-selected, show highlighted machine banner */}
          {machineOfInterest && (
            <div className="mt-4 p-3 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#F97316] text-white flex items-center justify-center shrink-0 shadow-md">
                <Cpu className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#66B821] block">
                  Product of Interest
                </span>
                <span className="text-xs sm:text-sm font-bold text-white truncate block">
                  {machineOfInterest}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-7 overflow-y-auto flex-1 space-y-4">
          {/* Top Row: Full Name & Work Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-[#06234B] uppercase tracking-wider mb-1.5">
                Full Name <span className="text-[#F97316]">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (errors.fullName) {
                      setErrors((prev) => ({ ...prev, fullName: '' }));
                    }
                  }}
                  placeholder="e.g. Rajesh Sharma"
                  className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-sm text-slate-800 focus:outline-none transition ${
                    errors.fullName
                      ? 'border-red-500 bg-red-50/40 focus:ring-2 focus:ring-red-400'
                      : 'border-slate-300 focus:border-[#0084D6] focus:ring-2 focus:ring-[#0084D6]/20 bg-white'
                  }`}
                />
              </div>
              {errors.fullName && (
                <div className="flex items-center gap-1 text-[11px] text-red-600 mt-1">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  <span>{errors.fullName}</span>
                </div>
              )}
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-bold text-[#06234B] uppercase tracking-wider mb-1.5">
                Email Address <span className="text-[#F97316]">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) {
                      setErrors((prev) => ({ ...prev, email: '' }));
                    }
                  }}
                  placeholder="e.g. rajesh@company.com"
                  className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-sm text-slate-800 focus:outline-none transition ${
                    errors.email
                      ? 'border-red-500 bg-red-50/40 focus:ring-2 focus:ring-red-400'
                      : 'border-slate-300 focus:border-[#0084D6] focus:ring-2 focus:ring-[#0084D6]/20 bg-white'
                  }`}
                />
              </div>
              {errors.email && (
                <div className="flex items-center gap-1 text-[11px] text-red-600 mt-1">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  <span>{errors.email}</span>
                </div>
              )}
            </div>
          </div>

          {/* Row 2: Phone / Mobile & Company / Factory Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Phone Number */}
            <div>
              <label className="block text-xs font-bold text-[#06234B] uppercase tracking-wider mb-1.5">
                Phone / Mobile Number <span className="text-[#F97316]">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errors.phone) {
                      setErrors((prev) => ({ ...prev, phone: '' }));
                    }
                  }}
                  placeholder="e.g. +91 98765 43210"
                  className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-sm text-slate-800 focus:outline-none transition ${
                    errors.phone
                      ? 'border-red-500 bg-red-50/40 focus:ring-2 focus:ring-red-400'
                      : 'border-slate-300 focus:border-[#0084D6] focus:ring-2 focus:ring-[#0084D6]/20 bg-white'
                  }`}
                />
              </div>
              {errors.phone && (
                <div className="flex items-center gap-1 text-[11px] text-red-600 mt-1">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  <span>{errors.phone}</span>
                </div>
              )}
            </div>

            {/* Company / Factory */}
            <div>
              <label className="block text-xs font-bold text-[#06234B] uppercase tracking-wider mb-1.5">
                Company / Factory Name <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Building2 className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. AutoVolt Harness Ltd."
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:border-[#0084D6] focus:ring-2 focus:ring-[#0084D6]/20 transition bg-white"
                />
              </div>
            </div>
          </div>

          {/* Row 3: City / Location & Machine / Equipment of Interest */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* City & State */}
            <div>
              <label className="block text-xs font-bold text-[#06234B] uppercase tracking-wider mb-1.5">
                City / State / Country <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Pune, Maharashtra"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:border-[#0084D6] focus:ring-2 focus:ring-[#0084D6]/20 transition bg-white"
                />
              </div>
            </div>

            {/* Urgency / Project Scope */}
            <div>
              <label className="block text-xs font-bold text-[#06234B] uppercase tracking-wider mb-1.5">
                Procurement Timeline
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Clock className="w-4 h-4" />
                </div>
                <select
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:border-[#0084D6] focus:ring-2 focus:ring-[#0084D6]/20 transition bg-white cursor-pointer"
                >
                  <option value="Immediate Requirement (1-2 Weeks)">Immediate Requirement (1-2 Weeks)</option>
                  <option value="Within 1 Month">Within 1 Month</option>
                  <option value="1 - 3 Months (Expansion Plan)">1 - 3 Months (Expansion Plan)</option>
                  <option value="Budgeting &amp; Technical Evaluation">Budgeting &amp; Technical Evaluation</option>
                </select>
              </div>
            </div>
          </div>

          {/* Machine Selection Dropdown / Input */}
          <div>
            <label className="block text-xs font-bold text-[#06234B] uppercase tracking-wider mb-1.5">
              Specific Machine Model / Category
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Cpu className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={machineOfInterest}
                onChange={(e) => setMachineOfInterest(e.target.value)}
                placeholder="Enter model (e.g. ME-100, ME-2.0T, ME-90T+) or general query"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:border-[#0084D6] focus:ring-2 focus:ring-[#0084D6]/20 transition bg-white"
              />
            </div>
          </div>

          {/* Specific Requirements / Notes */}
          <div>
            <label className="block text-xs font-bold text-[#06234B] uppercase tracking-wider mb-1.5">
              Wire Specifications &amp; Requirements <span className="text-slate-400 font-normal">(Wire cross section, volume, custom tooling, etc.)</span>
            </label>
            <textarea
              rows={3}
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              placeholder="e.g., We process 0.5 to 2.5 sq.mm wires with open-barrel terminals. Looking for production speed of ~4000 pcs/hr, delivery to Gurgaon facility..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:border-[#0084D6] focus:ring-2 focus:ring-[#0084D6]/20 transition bg-white resize-none"
            />
          </div>

          {/* Direct Support Notice */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 text-[11px] text-slate-600">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#66B821] shrink-0" />
              <span>Official MECH TECH guarantee: No spam, direct engineer response within 24 hours.</span>
            </div>
            <span className="font-mono text-slate-500 shrink-0 font-bold hidden sm:inline">
              +91 9149158815
            </span>
          </div>

          {/* Form Actions Footer */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#06234B] via-[#083066] to-[#F97316] hover:opacity-95 text-white text-xs font-bold shadow-lg shadow-orange-500/20 transition flex items-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Submitting Inquiry...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Inquiry to MECH TECH</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
