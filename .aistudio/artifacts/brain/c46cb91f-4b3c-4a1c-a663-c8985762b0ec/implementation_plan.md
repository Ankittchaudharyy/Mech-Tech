# Mechtech 2025 Product Catalog — Complete Image & Specification Update

This plan resolves the missing product photos and truncated/unlinked specification details across the Mechtech Enterprises catalog by binding realistic, catalog-matched machine photography and complete verbatim technical specification tables from `Catalog.pdf` to every available machine across the `mechtech-catalog.json` hierarchy.

## User Review & Critical Decisions

> [!IMPORTANT]
> **Multi-Variant Specification Formatting & Catalog Photo Coverage**
> Since the multi-variant formatting question was skipped, we will use the cleanest, most readable industrial data presentation: **structured per-model specification tables** on both the product cards and the specification modal so every parameter from `Catalog.pdf` is visible without truncation.

- **Confirmed Decision — Multi-Variant Machines (`ME-310/315/330/416`, `ME-10/20/50`, `ME-2.0T/3.0T/4.0T`, `ME-100A/100M`)**: Render all common specifications alongside clearly labeled per-variant rows (Travel Length, Stripping Length, Output Capacity, Cylinder Size, Dimensions, and Weight) exactly as printed in `Catalog.pdf`.
- **Confirmed Decision — Product Photography (`photo: "yes"` & `photo: "shared"`)**: Replace `image: null` and generic schematic cartoons with high-resolution studio product images matched to each machine's exact physical configuration in `Catalog.pdf` (tower crimping workstations, dual-wire tinning cabinets, benchtop LCD wire strippers, rotary coaxial strippers, pneumatic strippers/crimpers, pull testers, wire joining presses, wire feeders, applicators, decoiler, V-groove PCB cutters, and component forming machines).
- **Confirmed Decision — Edge Cases & Unavailable Products (`inCatalog: false` or `photo: "no"`)**:
  - **Specs + No Photo (`ME-2.0T / ME-3.0T / ME-4.0T`)**: Displays the neutral `"Image Not Available"` placeholder with the model and product name in the image frame, paired with its complete verbatim specification table below.
  - **Photo + No Specs (`ME-100 Single Wire Feeder`, `ME-200 Double Wire Feeder`, `Applicators`, `Decoiler`)**: Displays the machine photo in the image frame, paired with `"Details not available"` in the specification area.
  - **Unavailable Products (`inCatalog: false`)**: All 24 unavailable products across Wire Harness, SMT, Packaging, and Glue Dispensing/Screw Feeding retain dedicated slots with uniform card dimensions (`h-[540px]`), neutral `"Image Not Available"` placeholders, `"Details not available"` spec blocks, and active `"Enquire Now / Get Quote"` buttons.
  - **Empty Sub-Category (`Wire Harness Assembly`)**: Displays a dedicated `"Coming Soon"` card matching the exact grid geometry.

---

## 1. Overview & Core Concept

- **What It Does**: Provides an interactive, responsive industrial equipment catalog for Mechtech Enterprises driven strictly by the 4-category, 19-subcategory structure of `mechtech-catalog.json` (all 62 product slots) and populated verbatim with the machine photos, model numbers, names, and technical specifications from `Catalog.pdf`.
- **Target Audience / Persona**: Industrial procurement managers, automotive/electronics manufacturing engineers, and wire harness production leads evaluating machine capacities and requesting B2B quotes.
- **Key Value**: Eliminates hidden or truncated technical data and missing product visuals, enabling engineers to inspect exact wire gauge ranges, stripping tolerances, crimping tonnages, and machine photos directly on the card grid and in the full specification modal.

---

## 2. User Experience & Visual Design

- **Key User Flows**:
  1. **Category & Sub-Category Filtering**: Visitors select any of the 4 main divisions (*Wire Harness Machines*, *SMT Machines*, *Packaging Machines*, *Auto Glue Dispensing & Screw Feeding Machines*) from the sticky navigation mega-menu, division cards, or catalog filter bar, then drill down into any of the 19 sub-categories without a search bar.
  2. **Direct Card Inspection**: Each product card displays the catalog page/item reference, machine photo (or uniform neutral placeholder if `photo: "no"`), model number, full product name, and an expandable/scrollable verbatim specification list showing all parameters from `Catalog.pdf`.
  3. **Full Specification Modal & Hero/Showcase Linking**: Clicking `"View Specs"` on any catalog card, Hero Slider slide, or Featured Equipment Showcase card opens the unified specification modal with the large product photo and complete tabular specification sheet.
  4. **Quote Enquiry Flow**: Clicking `"Enquire Now / Get Quote"` on any available, unavailable, or coming-soon card pre-selects that exact machine model in the consultation form and smoothly scrolls to the inquiry section.
- **Visual Identity & Theme**:
  - *Aesthetic Direction*: High-precision industrial B2B catalog with clean structural alignment and zero visual clutter.
  - *Color Palette & Mood*: Deep Navy Blue (`#06234B`) structural headers and primary surfaces, Bright Orange (`#F97316`) primary action highlights and active indicators, crisp neutral slate (`#F4F8FB` / `#FFFFFF`) card canvases, and subtle Mechtech logo accents in Green (`#66B821`) and Blue (`#0084D6`).
  - *Typography & Hierarchy*: `Exo 2` bold display headings for model numbers and section titles, `Inter` for clean specification labels, and `tabular-nums` monospace alignment for technical measurements (AWG ranges, dimensions, speeds, and weights).
  - *Component Styling & Layout*: 3-column desktop (`lg:grid-cols-3`), 2-column tablet (`md:grid-cols-2`), and 1-column mobile (`grid-cols-1`) grid where every card—whether full catalog item, photo-only item, spec-only item, or unavailable placeholder—shares identical height, image container proportions, font sizes, and button placement.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Full Verbatim Specification Visibility on Cards & Modal**
  - *Chosen Approach*: Display all key specification rows directly inside a clean, scrollable specification table on each product card (rather than slicing to 3 truncated lines) and render the complete multi-row specification table inside the modal, while unifying Hero Slider and Featured Showcase IDs with the catalog dataset so clicking any featured machine opens its exact specification sheet.
  - *Why*: Users reported not seeing product details from `Catalog.pdf`; slicing specs to 3 truncated lines hid critical parameters (such as multi-model variants and dimensions), and mismatched IDs between the homepage sliders and catalog prevented the modal from opening on several featured machines.
  - *Alternatives Considered*: Keeping 3-line truncated summaries on cards—rejected because multi-variant machines (`ME-310/315/330/416`, `ME-2.0T/3.0T/4.0T`, `ME-10/20/50`) lose their per-model data on the card view.
- **Decision 2: Resilient Product Image Architecture with Automatic Placeholder Swap**
  - *Chosen Approach*: Populate `product.image` for all 38 catalog products that have photos in `Catalog.pdf` (`photo: "yes"` and `photo: "shared"`), while keeping `image: null` for products without catalog photos (`ME-2.0T/3.0T/4.0T` and all `inCatalog: false` items). The card component checks `Boolean(product.image)` first: whenever a valid image URL/path is present, it renders the real photo; if `null` or if the image fails to load, it automatically renders the uniform neutral `"Image Not Available"` placeholder with the product name.
  - *Why*: Guarantees every product with a photo in `Catalog.pdf` displays a clear visual representation immediately, while strictly honoring the requirement that missing-photo items show the clean neutral placeholder and can be upgraded later simply by setting `image` in the data file.

---

## 4. Technical Architecture & Data Strategy *(Technical Reference)*

- **Architecture & Component Diagram**:
```
┌─────────────────────────────────────────────────────────────────────────┐
│                     Unified Catalog Data Store                          │
│  4 Categories • 19 Sub-Categories • All 62 Product Slots                │
│  • Verbatim Specs from Catalog.pdf (including multi-variant tables)     │
│  • Catalog-Matched Machine Photos (photo: "yes" | "shared")             │
│  • Explicit Nulls for Placeholder Slots (photo: "no" / inCatalog:false) │
└───────────────────┬───────────────────────────────┬─────────────────────┘
                    │                               │
                    ▼                               ▼
┌───────────────────────────────────┐ ┌───────────────────────────────────┐
│   Homepage Auto-Sliders (3.0s)    │ │   Product Catalog Section         │
│  • HeroSlider                     │ │  • Category Tabs & Sub-Filters    │
│  • FeaturedShowcaseSlider         │ │  • Uniform ProductCard Grid       │
│  • ClientTestimonials             │ │    ├─ Real Photo + Verbatim Specs │
│  (Unified IDs -> Spec Modal)      │ │    ├─ Placeholder + Verbatim Specs│
└───────────────────┬───────────────┘ │    ├─ Real Photo + "Details N/A"  │
                    │                 │    ├─ Placeholder + "Details N/A" │
                    │                 │    └─ Empty Subcat "Coming Soon"  │
                    │                 └─────────────────┬─────────────────┘
                    ▼                                   ▼
┌─────────────────────────────────────────────────────────────────────────┐
│             Interactive Modals & Lead Capture Handlers                  │
│  • ProductSpecModal: Full-resolution photo + complete spec table        │
│  • ConsultationSection: Auto-scrolls & pre-fills selected model quote   │
└─────────────────────────────────────────────────────────────────────────┘
```

- **Data Model & State**:
  - **Complete 62-Product Inventory**: Synchronize all categories and sub-categories from `mechtech-catalog.json`, ensuring all 38 catalog items (`inCatalog: true`) and all 24 unlisted items (`inCatalog: false`, including the 7 additional unlisted wire harness / processing slots) are present so category counters dynamically match the true total.
  - **Image Binding**: Each product with `photo: "yes"` or `photo: "shared"` in `Catalog.pdf` receives a dedicated, high-clarity machine image asset path in `product.image`. Products with `photo: "no"` (`ME-2.0T / ME-3.0T / ME-4.0T` and all `inCatalog: false` entries) keep `image: null`.
- **Interactive Component & State Mapping**:
  - **Category & Sub-Category Filter Bar**: Selecting a main category resets the sub-category filter to `"all"` and updates the displayed grid and item count badge; selecting `"Wire Harness Assembly"` renders the uniform `"Coming Soon"` card.
  - **Product Card Image & Spec Renderer**: Renders `<img>` when `product.image` is truthy (with an `onError` state fallback to the neutral placeholder), or renders the neutral gray box with the product's model/name and `"Image Not Available"` when `product.image` is `null`. Renders the verbatim specification key-value rows when `product.specs` is non-empty, or `"Details not available"` in identical typography when `product.specs` is `null`.
  - **Modal & Quote Triggers**: Clicking `"View Specs"` from any slider or card resolves the product by ID, catalog number, or model name and opens the modal; clicking `"Enquire Now / Get Quote"` populates the machine selector in the consultation form and scrolls smoothly to `#consultation`.
