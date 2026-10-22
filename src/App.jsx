import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';

// Pages
import Home from './pages/Home';
import Facilities from './pages/Facilities';
import SpacesPlans from './pages/SpacesPlans';
import CommunityReviews from './pages/CommunityReviews';
import VirtualTour from './pages/VirtualTour';
import Consultation from './pages/Consultation';
import Contact from './pages/Contact';

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState('Private Suite');

  const handleOpenBooking = (workspace = 'Private Suite') => {
    setSelectedWorkspace(workspace);
    setBookingModalOpen(true);
  };

  const handleCloseBooking = () => {
    setBookingModalOpen(false);
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-[#F8F9FA] text-slate-900 font-sans selection:bg-brand-500 selection:text-white">
        {/* Floating Navigation */}
        <Navbar onOpenBooking={handleOpenBooking} />

        {/* Main Content Router */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home onOpenBooking={handleOpenBooking} />} />
            <Route path="/facilities" element={<Facilities onOpenBooking={handleOpenBooking} />} />
            <Route path="/plans" element={<SpacesPlans onOpenBooking={handleOpenBooking} />} />
            <Route path="/reviews" element={<CommunityReviews onOpenBooking={handleOpenBooking} />} />
            <Route path="/tour" element={<VirtualTour onOpenBooking={handleOpenBooking} />} />
            <Route path="/consultation" element={<Consultation />} />
            <Route path="/contact" element={<Contact onOpenBooking={handleOpenBooking} />} />
          </Routes>
        </main>

        {/* Global Enterprise Footer */}
        <Footer onOpenBooking={handleOpenBooking} />

        {/* Global Booking Modal */}
        <BookingModal
          isOpen={bookingModalOpen}
          onClose={handleCloseBooking}
          initialWorkspace={selectedWorkspace}
        />
      </div>
    </BrowserRouter>
  );
}
