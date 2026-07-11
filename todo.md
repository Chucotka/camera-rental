# KINORENTA Project TODO

## Core Features
- [x] Equipment catalog with professional images
- [x] Responsive design for all screen sizes
- [x] Custom KINORENTA logo (film reel with red "RENTA" text)
- [x] Logo clickable (footer scrolls to top, nav navigates)
- [x] Online booking system with calendar date selection
- [x] Booking availability checking
- [x] Stripe payment integration for online payments
- [x] Admin panel for managing bookings (/admin/bookings)
- [x] Booking status filtering and updates
- [x] Equipment categories with custom icons (including drone SVG)
- [x] Fixed logo display on Contacts page

## Email Notifications
- [x] Email service integration setup
- [x] Email template for booking confirmations
- [x] Send confirmation email on successful booking
- [ ] Send payment receipt email after Stripe payment
- [ ] Send booking cancellation email
- [x] Email notification for admin on new bookings

## Booking Cancellation
- [x] Create cancellation email template
- [x] Add sendCancellationEmail function
- [x] Create cancelBooking tRPC procedure
- [x] Add cancel button to admin panel
- [x] Test cancellation flow

## SMS Notifications
- [x] Set up Twilio or alternative SMS service
- [x] Create SMS templates for confirmations, cancellations, reminders
- [x] Add SMS sending functions to notification service
- [x] Integrate SMS into booking creation flow
- [x] Integrate SMS into booking cancellation flow
- [x] Create scheduled delivery reminder system
- [x] Test SMS notifications

## Mobile Optimization
- [x] Implement mobile hamburger menu
- [x] Optimize product grid for mobile (1 col mobile, 2 col tablet, 3+ col desktop)
- [x] Increase button sizes for touch targets (48px on mobile)
- [x] Optimize hero section text sizes for mobile
- [x] Add search functionality for products
- [ ] Implement bottom sheet for product modal on mobile
- [ ] Add sticky booking button on mobile
- [x] Add floating booking button for mobile quick access
- [x] Optimize images with responsive srcset
- [x] Add lazy loading for images
- [x] Create responsive image component with WebP
- [x] Optimize ProductCard images
- [x] Optimize hero section images
- [x] Test mobile responsiveness on various devices

## AI Content Creation Service
- [x] Create AI content service data with pricing
- [x] Create Services page with all services and pricing
- [x] Add AI content service showcase to homepage
- [x] Create pricing calculator
- [x] Test services display

## Professional Video Services (Innoko Films)
- [x] Add professional video services data with pricing
- [x] Create portfolio examples component
- [x] Update Services page with professional video services
- [x] Add professional video services section to homepage
- [x] Test services display
- [x] Add Innoko Films logo to navigation
- [x] Make logo clickable to services page
- [x] Style logo proportionally with KINORENTA
- [x] Update Innoko logo with new design
- [x] Move CTA button to contacts page
- [x] Add studio text to hero section
- [x] Create studio badge with red pulsing animation

## Mobile Navigation
- [x] Add Innoko Films logo to mobile hamburger menu

## Bug Fixes
- [x] Equipment photos not loading - black rectangles instead of images
- [x] Remove "camera" text from hero background image on home page

## Future Enhancements
- [ ] Customer reviews and testimonials section
- [ ] Analytics dashboard with booking statistics
- [ ] Financial reports and revenue tracking
- [ ] Equipment comparison tool
- [ ] Bundle packages with discounts
- [ ] Customer account dashboard
- [ ] Booking history and management
- [ ] Equipment availability calendar view
- [ ] Multi-language support
- [ ] SMS notifications option
- [x] Make navigation header consistent across all pages
- [x] Remove blinking animation from "ПРОФЕССИОНАЛЬНЫЙ КИНОПРОКАТ" and "СТУДИЯ INNOKO FILMS" badges
- [x] Fix Innoko logo display in mobile navigation menu
- [x] Remove "ЗАПРОСИТЬ СМЕТУ" button from Contacts page
- [x] Remove blinking dots from "ПРОФЕССИОНАЛЬНОЕ ПРОИЗВОДСТВО" and "НОВОЕ НАПРАВЛЕНИЕ" badges
- [x] Use studio photo with green screen as background for Studio page
- [x] Fix Innoko Films logo navigation to go to Studio page instead of Services

## Redesign - New Navigation Structure
- [x] Update main hero text to "Экосистема для создания визуального контента..."
- [x] Replace navigation menu: ОБОРУДОВАНИЕ → РЕНТАЛ, СТУДИЯ → ПРОДАКШН, УСЛУГИ → AI-ЛАБОРАТОРИЯ
- [x] Create AI-ЛАБОРАТОРИЯ section page
- [x] Restructure РЕНТАЛ section (move equipment catalog)
- [x] Restructure ПРОДАКШН section (studio services, cinema, advertising)
- [x] Update all page links and routing
- [x] Test navigation across all pages

## Home Page Restructure - Unified Hub
- [x] Restructure Home page with 6 blocks in specific order
- [x] Keep Hero Section with current design and add 3 CTA buttons
- [x] Add Services Hub block with 3 navigation cards
- [x] Move equipment showcase to Rental block
- [x] Move studio services to Production block with studio info
- [x] Move AI content to AI Lab block
- [x] Add lead form block at bottom
- [x] Test all blocks and navigation

## Rental Catalog Page
- [x] Create RentalCatalog.tsx page with header and search bar
- [x] Build sidebar with category menu and filters
- [x] Create product grid with equipment cards
- [x] Add pagination controls
- [x] Add footer to catalog page
- [x] Update routing to include catalog page
- [x] Test catalog page functionality and styling

## Catalog Separation - Fix Home Page
- [x] Remove filters and full catalog from Home.tsx
- [x] Keep only 3-4 featured cameras in Rental block
- [x] Rename RentalCatalog.tsx to Catalog.tsx
- [x] Update route from /rental-catalog to /catalog
- [x] Update "РЕНТАЛ" navigation link to point to /catalog
- [x] Update "Перейти в полный каталог" button to link to /catalog
- [x] Test home page is clean and not overloaded
- [x] Test catalog page has all filters and products
- [x] Replace studio photo in INNOKO FILMS section with correct green screen image

## CTA Buttons Activation
- [x] Activate buttons on Production page (Запросить смету, Связаться)
- [x] Activate buttons on AILab page (Запросить консультацию)
- [x] Test all buttons navigate to Contacts page

## Portfolio Section
- [x] Upload AI portfolio video to S3
- [x] Create portfolio section on AILab page
- [x] Add video player component
- [x] Test portfolio video display
- [x] Add second AI portfolio video (lights.mp4) to AILab page
- [x] Add production portfolio video (Altai_Clip_site.mp4) to Production page
