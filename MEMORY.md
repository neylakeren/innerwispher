# Project Memory: InnerWhisper Landing Page & Dashboard Integration

This document serves as the project memory for the frontend landing page and dashboard development.

## Project Context
- **Workspace Path:** `D:\Coding\neyla`
- **Frontend Stack:** React, Tailwind CSS, Vite, React Router, Lucide React
- **Design Style:** Modern, clean, pastel-tinted neutral colors (Pink Salmon scheme using HSL tailored colors) with high accessibility and anti-slop guidelines.

## Development Progress & Milestones

### 1. Design System & Global Styles
- **File:** `frontend/tailwind.config.js`
  - Integrated the custom color palette (primary pink salmon variants `#9a4153`, secondary `#5d5c71`, backgrounds `#fbf9f9`, text `#1b1c1c`, etc.).
  - Configured typography scale (`Plus Jakarta Sans`), responsive headers, custom spacing system, and borders.
- **File:** `frontend/src/index.css`
  - Set up CSS rules, scrollbar customizations, ambient shadow effects, and hover-lift transitions.
  - Moved Google Font `@import` to the top to eliminate PostCSS build warnings.

### 2. Shared Layout & Components
- **File:** [LandingLayout.jsx](file:///D:/Coding/neyla/frontend/src/layouts/LandingLayout.jsx)
  - Layout wrapper combining Navbar, Footer, Mobile Bottom Navigation, and the WhatsApp FAB.
- **File:** [LandingNavbar.jsx](file:///D:/Coding/neyla/frontend/src/components/landing/LandingNavbar.jsx)
  - Responsive desktop header navigation. Updated to span **full-width** (using `px-8 md:px-16 lg:px-24`) with a premium "Masuk" button next to WhatsApp.
- **File:** [LandingFooter.jsx](file:///D:/Coding/neyla/frontend/src/components/landing/LandingFooter.jsx)
  - Footer listing core information, privacy policies, terms, and help portals. Updated to **full-width**.
- **File:** [BottomNavBar.jsx](file:///D:/Coding/neyla/frontend/src/components/landing/BottomNavBar.jsx)
  - Accessible mobile bottom-tab navbar.
- **File:** [WhatsAppFAB.jsx](file:///D:/Coding/neyla/frontend/src/components/landing/WhatsAppFAB.jsx)
  - Floating action button targeting WhatsApp counseling, containing soft pulse animation and hover information tooltips.

### 3. Landing Pages (Full-Width & Rescaled Layouts)
- **File:** [Beranda.jsx](file:///D:/Coding/neyla/frontend/src/pages/landing/Beranda.jsx)
  - Hero banner with scaled-up title (up to `lg:text-6xl`) and description, 3-column "how it works" grid cards with enlarged spacing (`gap-8` and `p-8`), and larger trust badges. Removed 1200px max-width boundary.
- **File:** [Layanan.jsx](file:///D:/Coding/neyla/frontend/src/pages/landing/Layanan.jsx)
  - Comprehensive service listing (Individual, Couples, Career) and value proposition metrics. Expanded container width and padded grids for wider screens.
- **File:** [TentangKami.jsx](file:///D:/Coding/neyla/frontend/src/pages/landing/TentangKami.jsx)
  - Introduces professional psychologists, licensing status, and fields of expertise. Enlarged profile avatars, tag spacing, card dimensions, and call-to-actions.
- **File:** [Artikel.jsx](file:///D:/Coding/neyla/frontend/src/pages/landing/Artikel.jsx)
  - Category filtration buttons, a prominent featured article, a clean card grid, and a newsletter subscription block. Custom chips and cards padded for massive wide screens.

### 4. Routing & Auth Pages (Redesigned)
- **File:** [App.jsx](file:///D:/Coding/neyla/frontend/src/App.jsx)
  - Set up routing for all public landing pages (`/`, `/layanan`, `/tentang-kami`, `/artikel`) under the `LandingLayout` wrapper.
  - Retained dashboard routing under protected routes `/dashboard` with authentication checks.
- **File:** [ui.jsx](file:///D:/Coding/neyla/frontend/src/components/ui.jsx)
  - Overhauled reusable input elements and buttons to map to the new theme colors (`primary` salmon color instead of generic `indigo-600`). This unifies both the authentication pages and the inner dashboard designs.
- **File:** [Login.jsx](file:///D:/Coding/neyla/frontend/src/pages/Login.jsx)
  - Redesigned with soft salmon background blurs, a centered icon box, custom forms, and a "Kembali ke Beranda" link.
- **File:** [Register.jsx](file:///D:/Coding/neyla/frontend/src/pages/Register.jsx)
  - Redesigned layout mirroring `Login.jsx` for registration flows.

### 5. Unified Dashboard & Role-Specific Page Customizations
- **File:** [DashboardLayout.jsx](file:///D:/Coding/neyla/frontend/src/layouts/DashboardLayout.jsx)
  - Aligned dashboard layout structure, sidebar, brand typography ("Neyla" -> "InnerWhisper"), active navigation highlights, avatar boxes, and logout options to use the salmon theme.
- **Pages Modified:**
  - [Dashboard.jsx](file:///D:/Coding/neyla/frontend/src/pages/Dashboard.jsx)
  - [AdminDashboard.jsx](file:///D:/Coding/neyla/frontend/src/pages/AdminDashboard.jsx)
  - [AdminPatientList.jsx](file:///D:/Coding/neyla/frontend/src/pages/AdminPatientList.jsx)
  - [AdminPsychologistList.jsx](file:///D:/Coding/neyla/frontend/src/pages/AdminPsychologistList.jsx)
  - [BookingList.jsx](file:///D:/Coding/neyla/frontend/src/pages/BookingList.jsx)
  - [ChatRoom.jsx](file:///D:/Coding/neyla/frontend/src/pages/ChatRoom.jsx)
  - [PsychologistDashboard.jsx](file:///D:/Coding/neyla/frontend/src/pages/PsychologistDashboard.jsx)
  - [PsychologistDiscovery.jsx](file:///D:/Coding/neyla/frontend/src/pages/PsychologistDiscovery.jsx)
  - Replaced all legacy `indigo-` styling elements with themed variables (`primary`, `primary-container`, `surface`, etc.) to unify styling across all roles (Patient, Psychologist, Admin).

---

## Recent Fixes (June 23, 2026)
- **File:** [Beranda.jsx](file:///D:/Coding/neyla/frontend/src/pages/landing/Beranda.jsx)
  - Restored H1 ("Temukan Ketenangan Jiwa Anda Bersama Kami") and H2 ("Alur Pengguna yang Mudah") headings back to the premium `text-primary` (pink salmon) color.
- **File:** [Layanan.jsx](file:///D:/Coding/neyla/frontend/src/pages/landing/Layanan.jsx)
  - Restored H1 ("Layanan Kami") and H2 ("Mengapa memilih layanan kami?") headings to `text-primary` (pink salmon).
- **File:** [TentangKami.jsx](file:///D:/Coding/neyla/frontend/src/pages/landing/TentangKami.jsx)
  - Updated CTA heading ("Ingin mulai bercerita?") to `text-primary` for layout consistency.
- **Files:** [Login.jsx](file:///D:/Coding/neyla/frontend/src/pages/Login.jsx) & [Register.jsx](file:///D:/Coding/neyla/frontend/src/pages/Register.jsx)
  - Changed target redirect path upon successful login/registration from `/` (landing page) to `/dashboard` to ensure users enter their control panels.
- **File:** [LandingNavbar.jsx](file:///D:/Coding/neyla/frontend/src/components/landing/LandingNavbar.jsx)
  - Integrated `useAuth` to dynamically replace the "Masuk" navigation link with a "Dashboard" link when the user is authenticated.
- **File:** [Artikel.jsx](file:///D:/Coding/neyla/frontend/src/pages/landing/Artikel.jsx)
  - Filled out all article items with rich, detailed content structures (paragraphs, subheadings, and quotes).
  - Added a state-driven premium reading mode that dynamically displays the chosen article with typeset details and a dedicated WhatsApp counseling CTA without page reloads.

## Status and Verification
- **Build Status:** Verified (Vite production build succeeds in 2.02 seconds with **zero** errors and warnings).
- **Runtime Status:** Vite dev server ([http://localhost:5173/](http://localhost:5173/)), Laravel backend server ([http://127.0.0.1:8000/](http://127.0.0.1:8000/)), and Laravel Reverb server (port 8080) are all running smoothly.

