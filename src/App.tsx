import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StorySection } from './components/StorySection';
import { MenuSection } from './components/MenuSection';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationMapSection } from './components/LocationMapSection';
import { ContactFormSection } from './components/ContactFormSection';
import { SocialSection } from './components/SocialSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { MobileStickyBar } from './components/MobileStickyBar';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [initialGuestCount, setInitialGuestCount] = useState(2);

  const handleOpenBooking = (guests: number = 2) => {
    setInitialGuestCount(guests);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0b0e0d] text-[#e8ece9] selection:bg-[#c5a059] selection:text-[#0b0e0d] pb-16 lg:pb-0">
      {/* Top Luxury Navigation */}
      <Navbar onOpenBooking={() => handleOpenBooking(2)} />

      {/* Main Sections */}
      <main>
        {/* Hero Section */}
        <Hero onOpenBooking={() => handleOpenBooking(2)} />

        {/* Story & Tanggero Culture */}
        <StorySection onOpenBooking={() => handleOpenBooking(2)} />

        {/* Menu Images in Tiles & PDF Download */}
        <MenuSection onOpenBooking={() => handleOpenBooking(2)} />

        {/* Google Reviews Showcase */}
        <ReviewsSection />

        {/* Maps & Green Sun Location */}
        <LocationMapSection onOpenBooking={() => handleOpenBooking(2)} />

        {/* Social Media Integration */}
        <SocialSection />

        {/* Inquiries & Event Form */}
        <ContactFormSection />
      </main>

      {/* Footer */}
      <Footer onOpenBooking={() => handleOpenBooking(2)} />

      {/* Mobile Sticky Booking Bar */}
      <MobileStickyBar onOpenBooking={() => handleOpenBooking(2)} />

      {/* 7-Step Integrated Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        initialGuests={initialGuestCount}
      />
    </div>
  );
}
