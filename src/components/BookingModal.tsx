import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, Calendar, Clock, Users, Utensils, Wine, CheckCircle2, 
  ArrowLeft, ArrowRight, Phone, Mail, Sparkles, AlertCircle, 
  MessageSquare, ChevronRight, ShieldCheck, MapPin, Share2, Download
} from 'lucide-react';
import { SeatingAreaType, ReservationData, BookingConfirmation } from '../types/restaurant';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialGuests?: number;
}

const TIME_SLOTS = [
  '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM',
  '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM',
  '9:00 PM', '9:30 PM', '10:00 PM', '10:30 PM'
];

const DIETARY_OPTIONS = [
  'No specific restrictions',
  'Shellfish / Seafood Allergy',
  'Gluten-Free / Celiac',
  'No Pork / Halal-friendly preference',
  'Nut Allergy',
  'Vegetarian',
  'Dairy / Lactose Intolerant'
];

const OCCASIONS = [
  'Casual Dining / Catch-up',
  'Birthday Celebration',
  'Romantic Date Night',
  'Anniversary',
  'Business / Corporate Dinner',
  'Visiting Manila Foodie'
];

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialGuests = 2,
}) => {
  // Step 1 to 7
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form states
  const [guests, setGuests] = useState<number>(initialGuests);
  
  // Default to upcoming Friday or Saturday
  const getInitialDate = () => {
    const today = new Date();
    // Advance by 1 day
    today.setDate(today.getDate() + 1);
    // If Sunday (0) or Monday (1), jump to Tuesday (2)
    if (today.getDay() === 0) today.setDate(today.getDate() + 2);
    else if (today.getDay() === 1) today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  };

  const [date, setDate] = useState<string>(getInitialDate());
  const [timeSlot, setTimeSlot] = useState<string>('7:30 PM');
  const [seatingArea, setSeatingArea] = useState<SeatingAreaType>('dining-area');
  
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [customDietaryNote, setCustomDietaryNote] = useState<string>('');
  const [specialOccasion, setSpecialOccasion] = useState<string>('Casual Dining / Catch-up');
  const [notificationType, setNotificationType] = useState<'both' | 'sms' | 'email'>('both');

  const [confirmedBooking, setConfirmedBooking] = useState<BookingConfirmation | null>(null);
  const [activeNotificationTab, setActiveNotificationTab] = useState<'sms' | 'email'>('sms');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

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

  // Day of week check for Tuesday - Saturday
  const selectedDateObj = new Date(date + 'T00:00:00');
  const dayOfWeek = selectedDateObj.getDay(); // 0 is Sunday, 1 is Monday
  const isClosedDay = dayOfWeek === 0 || dayOfWeek === 1;

  const handleDietaryToggle = (item: string) => {
    if (item === 'No specific restrictions') {
      setSelectedDietary(['No specific restrictions']);
      return;
    }

    const withoutNoRestrictions = selectedDietary.filter(d => d !== 'No specific restrictions');
    if (withoutNoRestrictions.includes(item)) {
      setSelectedDietary(withoutNoRestrictions.filter(d => d !== item));
    } else {
      setSelectedDietary([...withoutNoRestrictions, item]);
    }
  };

  const handleStep1Start = () => {
    setCurrentStep(2);
  };

  const handleStep2Next = () => {
    setCurrentStep(3);
  };

  const handleStep3Next = () => {
    if (isClosedDay) {
      setErrorMsg('Toma Toma is closed on Sundays and Mondays. Please select Tuesday through Saturday.');
      return;
    }
    setErrorMsg('');
    setCurrentStep(4);
  };

  const handleStep4Next = () => {
    setCurrentStep(5);
  };

  const handleStep5Next = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setErrorMsg('Please enter your full name');
      return;
    }
    if (!phone.trim() || phone.length < 8) {
      setErrorMsg('Please enter a valid mobile number for confirmation');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address');
      return;
    }
    setErrorMsg('');
    setCurrentStep(6);
  };

  const handleFinalReserve = () => {
    setIsSubmitting(true);
    setErrorMsg('');

    setTimeout(() => {
      setIsSubmitting(false);
      const generatedId = `TT-${Math.floor(100000 + Math.random() * 900000)}`;
      const confirmation: BookingConfirmation = {
        bookingId: generatedId,
        guests,
        date,
        timeSlot,
        seatingArea,
        fullName,
        phone,
        email,
        dietaryRequirements: selectedDietary,
        customDietaryNote,
        specialOccasion,
        sendMethod: notificationType,
        createdAt: new Date().toISOString(),
        status: 'confirmed',
      };

      setConfirmedBooking(confirmation);
      setCurrentStep(7);

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#d4af37', '#10b981', '#ffffff', '#e5c07b'],
        });
      } catch {
        // ignore
      }
    }, 900);
  };

  const resetAndClose = () => {
    setCurrentStep(1);
    setConfirmedBooking(null);
    onClose();
  };

  const formatDateDisplay = (dateStr: string) => {
    try {
      const d = new Date(dateStr + 'T00:00:00');
      return d.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#0e1311] border border-[#c5a059]/40 rounded-2xl shadow-2xl overflow-hidden my-auto">
        
        {/* Top Header / Progress Strip */}
        <div className="bg-[#081712] border-b border-[#1b3d32] p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#1b3d32] flex items-center justify-center text-[#d4af37] font-semibold text-sm border border-[#c5a059]/40">
              {currentStep}/7
            </div>
            <div>
              <span className="text-[11px] tracking-widest text-[#c5a059] uppercase font-mono">
                {currentStep === 1 && 'Step 1: Reservation'}
                {currentStep === 2 && 'Step 2: Party Size'}
                {currentStep === 3 && 'Step 3: Date & Time'}
                {currentStep === 4 && 'Step 4: Seating Area'}
                {currentStep === 5 && 'Step 5: Guest Details'}
                {currentStep === 6 && 'Step 6: Review & Confirmation'}
                {currentStep === 7 && 'Step 7: Automated Notification'}
              </span>
              <h2 className="text-lg sm:text-xl font-heading text-white">
                {currentStep === 1 && 'Find A Table at Toma Toma'}
                {currentStep === 2 && 'Select Number of Guests'}
                {currentStep === 3 && 'Choose Date & Time Slot'}
                {currentStep === 4 && 'Select Seating Ambiance'}
                {currentStep === 5 && 'Guest & Dietary Information'}
                {currentStep === 6 && 'Confirm Your Reservation'}
                {currentStep === 7 && 'Reservation Confirmed!'}
              </h2>
            </div>
          </div>
          
          <button 
            onClick={resetAndClose}
            className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800/60 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="w-full bg-[#0a100e] h-1.5 flex">
          {[1, 2, 3, 4, 5, 6, 7].map((s) => (
            <div
              key={s}
              className={`flex-1 transition-all duration-300 ${
                s <= currentStep ? 'bg-[#c5a059]' : 'bg-stone-800'
              }`}
            />
          ))}
        </div>

        {/* Modal Content Body */}
        <div className="p-5 sm:p-7 max-h-[80vh] overflow-y-auto">
          {errorMsg && (
            <div className="mb-4 p-3 bg-red-950/60 border border-red-500/50 rounded-xl text-red-200 text-xs sm:text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* ================= STEP 1: FIND A TABLE CTA ================= */}
          {currentStep === 1 && (
            <div className="space-y-6 text-center py-4">
              <div className="relative w-full h-44 rounded-xl overflow-hidden border border-[#c5a059]/30 shadow-inner">
                <img 
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80" 
                  alt="Toma Toma Grill Atmosphere" 
                  className="w-full h-full object-cover brightness-75 hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e1311] via-[#0e1311]/40 to-transparent flex flex-col justify-end p-4 text-left">
                  <span className="text-[#c5a059] text-xs font-semibold tracking-wider uppercase">Green Sun Makati</span>
                  <h3 className="text-xl font-heading text-white">An Immersive Fire & Spirit Experience</h3>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-stone-300 text-sm leading-relaxed max-w-lg mx-auto">
                  Experience wood-fired Filipino barbecue skewers, contemporary small plates by Chef Stephan Duhesme, and artisanal native cocktails curated by Arcadius Rybak.
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-xs text-stone-400 pt-2">
                  <span className="flex items-center gap-1.5 text-[#e5c07b]">
                    <Clock className="w-3.5 h-3.5 text-[#c5a059]" /> Tue – Sat: 5:00 PM – Midnight
                  </span>
                  <span className="flex items-center gap-1.5 text-[#e5c07b]">
                    <MapPin className="w-3.5 h-3.5 text-[#c5a059]" /> 2285 Chino Roces Ave Ext
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleStep1Start}
                  className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#d4af37] via-[#c5a059] to-[#aa8222] text-[#0b0e0d] font-bold tracking-wide rounded-xl shadow-lg shadow-[#c5a059]/20 hover:brightness-110 active:scale-95 transition-all text-sm uppercase flex items-center justify-center gap-2 mx-auto cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  Find A Table
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 2: TILES 1 TO 8 + NOTE FOR >8 ================= */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center space-y-1">
                <p className="text-xs text-[#c5a059] uppercase tracking-wider">Step 2</p>
                <h3 className="text-xl font-heading text-white">How many guests will be dining?</h3>
                <p className="text-xs text-stone-400">Select your party size from the tiles below:</p>
              </div>

              {/* 1 to 8 Tiled Buttons */}
              <div className="grid grid-cols-4 sm:grid-cols-4 gap-2.5 sm:gap-3">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => {
                  const isSelected = guests === num;
                  return (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setGuests(num)}
                      className={`p-3.5 sm:p-4 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-gradient-to-b from-[#1b4332] to-[#0d281e] border-[#d4af37] text-white shadow-lg shadow-[#10b981]/20 scale-102 ring-1 ring-[#d4af37]'
                          : 'bg-[#121915] border-stone-800 text-stone-300 hover:border-[#c5a059]/50 hover:bg-[#16221c]'
                      }`}
                    >
                      <Users className={`w-4 h-4 ${isSelected ? 'text-[#d4af37]' : 'text-stone-500'}`} />
                      <span className="text-xl sm:text-2xl font-bold font-heading">{num}</span>
                      <span className="text-[11px] uppercase tracking-wider text-stone-400">
                        {num === 1 ? 'Person' : 'People'}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* MANDATORY REQUIREMENT: Note shown below that for persons above 8, users must call us directly */}
              <div className="p-4 rounded-xl bg-[#091510] border border-[#1b3d32] space-y-2">
                <div className="flex items-start gap-2.5 text-xs text-stone-300">
                  <Phone className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#d4af37] block mb-0.5">
                      Planning for a party larger than 8 persons?
                    </span>
                    <p className="text-stone-300 leading-relaxed">
                      For parties above 8 guests, private mezzanine buyouts, or bespoke chef tasting events, users must call us directly at{' '}
                      <a 
                        href={`tel:${RESTAURANT_INFO.phone}`} 
                        className="text-[#d4af37] underline font-semibold hover:text-[#f3e5ab]"
                      >
                        {RESTAURANT_INFO.phoneDisplay}
                      </a>{' '}
                      so our host team can coordinate personalized seating and service.
                    </p>
                  </div>
                </div>

                <div className="pt-1 flex items-center justify-end">
                  <a
                    href={`tel:${RESTAURANT_INFO.phone}`}
                    className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 bg-[#1b3d32] text-[#d4af37] hover:bg-[#235242] border border-[#c5a059]/40 rounded-lg transition-colors font-medium"
                  >
                    <Phone className="w-3 h-3" />
                    Call Directly: {RESTAURANT_INFO.phoneDisplay}
                  </a>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2.5 text-xs text-stone-400 hover:text-white flex items-center gap-1.5 rounded-lg border border-stone-800 hover:border-stone-700"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
                <button
                  type="button"
                  onClick={handleStep2Next}
                  className="px-6 py-2.5 bg-gradient-to-r from-[#d4af37] to-[#aa8222] text-[#0b0e0d] font-bold text-xs uppercase tracking-wider rounded-xl hover:brightness-110 transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  Continue with {guests} {guests === 1 ? 'Guest' : 'Guests'} <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 3: DATE AND TIME SLOT ================= */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="block text-xs font-semibold text-[#c5a059] uppercase tracking-wider">
                  Select Reservation Date
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="flex-1 bg-[#121915] border border-stone-700 focus:border-[#d4af37] rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors"
                  />
                  <div className="text-xs text-stone-400 font-medium">
                    {formatDateDisplay(date)}
                  </div>
                </div>

                {/* Operating days reminder */}
                <div className={`p-2.5 rounded-lg text-xs flex items-center gap-2 ${
                  isClosedDay 
                    ? 'bg-amber-950/60 border border-amber-600/50 text-amber-200' 
                    : 'bg-[#081712] border border-[#1b3d32] text-emerald-400'
                }`}>
                  <Calendar className="w-3.5 h-3.5 shrink-0" />
                  <span>
                    {isClosedDay 
                      ? 'Notice: Toma Toma is closed on Sundays and Mondays. Please choose Tuesday through Saturday.' 
                      : 'Open Tuesday to Saturday: 5:00 PM – Midnight.'}
                  </span>
                </div>
              </div>

              {/* Time Slots */}
              <div className="space-y-3">
                <label className="block text-xs font-semibold text-[#c5a059] uppercase tracking-wider">
                  Select Seating Time Slot
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {TIME_SLOTS.map((slot) => {
                    const isSelected = timeSlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setTimeSlot(slot)}
                        className={`py-2.5 px-2 rounded-lg text-xs font-semibold tracking-wide border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#d4af37] text-[#0b0e0d] border-[#d4af37] shadow-md shadow-[#d4af37]/20 font-bold'
                            : 'bg-[#121915] border-stone-800 text-stone-300 hover:border-[#c5a059]/40 hover:bg-[#18231e]'
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
                <p className="text-[11px] text-stone-400">
                  Tables are reserved for 2 hours. We hold reservations for up to 15 minutes past the booking time.
                </p>
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-4 py-2.5 text-xs text-stone-400 hover:text-white flex items-center gap-1.5 rounded-lg border border-stone-800 hover:border-stone-700"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
                <button
                  type="button"
                  onClick={handleStep3Next}
                  className="px-6 py-2.5 bg-gradient-to-r from-[#d4af37] to-[#aa8222] text-[#0b0e0d] font-bold text-xs uppercase tracking-wider rounded-xl hover:brightness-110 transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  Continue to Seating Area <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 4: SELECT BAR OR DINING AREA ================= */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="text-center space-y-1">
                <p className="text-xs text-[#c5a059] uppercase tracking-wider">Step 4</p>
                <h3 className="text-xl font-heading text-white">Choose Your Seating Experience</h3>
                <p className="text-xs text-stone-400">Select where you would like to be seated:</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Bar Area Option */}
                <button
                  type="button"
                  onClick={() => setSeatingArea('bar')}
                  className={`p-4 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col justify-between cursor-pointer ${
                    seatingArea === 'bar'
                      ? 'bg-[#0f241a] border-[#d4af37] ring-1 ring-[#d4af37] shadow-xl shadow-[#10b981]/15'
                      : 'bg-[#121915] border-stone-800 hover:border-stone-600'
                  }`}
                >
                  <div className="h-28 w-full rounded-lg overflow-hidden mb-3 relative">
                    <img 
                      src="https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80" 
                      alt="Toma Toma Cocktail Bar" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-black/60 px-2 py-0.5 rounded text-[10px] text-[#c5a059] font-semibold uppercase">
                      High-Top & Counter
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-heading text-base text-white flex items-center gap-1.5">
                        <Wine className="w-4 h-4 text-[#d4af37]" /> Cocktail Bar
                      </h4>
                      {seatingArea === 'bar' && (
                        <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />
                      )}
                    </div>
                    <p className="text-xs text-stone-300 leading-relaxed mb-2">
                      Front-row seats to master Tanggeros mixing Quezon lambanog elixirs. High energy, cocktail artistry, and quick skewers.
                    </p>
                    <span className="text-[11px] text-[#c5a059] block font-mono">
                      Best for: Couples, Cocktails & Conversation
                    </span>
                  </div>
                </button>

                {/* Dining Area Option */}
                <button
                  type="button"
                  onClick={() => setSeatingArea('dining-area')}
                  className={`p-4 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col justify-between cursor-pointer ${
                    seatingArea === 'dining-area'
                      ? 'bg-[#0f241a] border-[#d4af37] ring-1 ring-[#d4af37] shadow-xl shadow-[#10b981]/15'
                      : 'bg-[#121915] border-stone-800 hover:border-stone-600'
                  }`}
                >
                  <div className="h-28 w-full rounded-lg overflow-hidden mb-3 relative">
                    <img 
                      src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80" 
                      alt="Toma Toma Dining Area" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-black/60 px-2 py-0.5 rounded text-[10px] text-[#c5a059] font-semibold uppercase">
                      Full Tables & Booths
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-heading text-base text-white flex items-center gap-1.5">
                        <Utensils className="w-4 h-4 text-[#d4af37]" /> Dining Area
                      </h4>
                      {seatingArea === 'dining-area' && (
                        <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />
                      )}
                    </div>
                    <p className="text-xs text-stone-300 leading-relaxed mb-2">
                      Communal acacia wood tables, Capiz shell accents, and full access to our wood-fired sharing feasts and tasting menus.
                    </p>
                    <span className="text-[11px] text-[#c5a059] block font-mono">
                      Best for: Groups, Feasts & Celebrations
                    </span>
                  </div>
                </button>
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-4 py-2.5 text-xs text-stone-400 hover:text-white flex items-center gap-1.5 rounded-lg border border-stone-800 hover:border-stone-700"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
                <button
                  type="button"
                  onClick={handleStep4Next}
                  className="px-6 py-2.5 bg-gradient-to-r from-[#d4af37] to-[#aa8222] text-[#0b0e0d] font-bold text-xs uppercase tracking-wider rounded-xl hover:brightness-110 transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  Continue to Details <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 5: RESERVATION DETAILS FORM ================= */}
          {currentStep === 5 && (
            <form onSubmit={handleStep5Next} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Arcadius Rybak"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-[#121915] border border-stone-700 focus:border-[#d4af37] rounded-xl px-3.5 py-2.5 text-white text-sm outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">
                    Mobile Phone (For SMS Confirmation) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +63 915 123 4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#121915] border border-stone-700 focus:border-[#d4af37] rounded-xl px-3.5 py-2.5 text-white text-sm outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">
                  Email Address (For Automated Booking Confirmation & Calendar Invite) *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. guest@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#121915] border border-stone-700 focus:border-[#d4af37] rounded-xl px-3.5 py-2.5 text-white text-sm outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">
                  Special Occasion
                </label>
                <select
                  value={specialOccasion}
                  onChange={(e) => setSpecialOccasion(e.target.value)}
                  className="w-full bg-[#121915] border border-stone-700 focus:border-[#d4af37] rounded-xl px-3.5 py-2.5 text-white text-sm outline-none transition-colors"
                >
                  {OCCASIONS.map((occ) => (
                    <option key={occ} value={occ} className="bg-[#121915] text-white">
                      {occ}
                    </option>
                  ))}
                </select>
              </div>

              {/* Special Dietary Requirements */}
              <div className="space-y-2 pt-1">
                <label className="block text-xs font-semibold text-[#c5a059] uppercase tracking-wider">
                  Special Dietary Requirements & Allergies
                </label>
                <div className="flex flex-wrap gap-2">
                  {DIETARY_OPTIONS.map((opt) => {
                    const isChecked = selectedDietary.includes(opt);
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleDietaryToggle(opt)}
                        className={`text-xs px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                          isChecked
                            ? 'bg-[#1b3d32] border-[#d4af37] text-[#d4af37]'
                            : 'bg-[#121915] border-stone-800 text-stone-300 hover:border-stone-700'
                        }`}
                      >
                        {isChecked && '✓ '} {opt}
                      </button>
                    );
                  })}
                </div>
                <textarea
                  rows={2}
                  placeholder="Any additional dietary notes, favorite skewers, or special requests..."
                  value={customDietaryNote}
                  onChange={(e) => setCustomDietaryNote(e.target.value)}
                  className="w-full bg-[#121915] border border-stone-700 focus:border-[#d4af37] rounded-xl px-3.5 py-2 text-white text-xs outline-none transition-colors mt-1 resize-none"
                />
              </div>

              {/* Notification method */}
              <div className="p-3 bg-[#081712] border border-[#1b3d32] rounded-xl flex items-center justify-between text-xs">
                <span className="text-stone-300">Automated Dispatch:</span>
                <div className="flex gap-2">
                  <label className="flex items-center gap-1.5 cursor-pointer text-stone-200">
                    <input
                      type="radio"
                      name="notify"
                      checked={notificationType === 'both'}
                      onChange={() => setNotificationType('both')}
                      className="accent-[#c5a059]"
                    />
                    <span>SMS + Email</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer text-stone-200">
                    <input
                      type="radio"
                      name="notify"
                      checked={notificationType === 'sms'}
                      onChange={() => setNotificationType('sms')}
                      className="accent-[#c5a059]"
                    />
                    <span>SMS Only</span>
                  </label>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="px-4 py-2.5 text-xs text-stone-400 hover:text-white flex items-center gap-1.5 rounded-lg border border-stone-800 hover:border-stone-700"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-[#d4af37] to-[#aa8222] text-[#0b0e0d] font-bold text-xs uppercase tracking-wider rounded-xl hover:brightness-110 transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  Review Booking Details <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}

          {/* ================= STEP 6: FINAL CONFIRMATION SCREEN WITH 'RESERVE NOW' BUTTON ================= */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <div className="text-center space-y-1">
                <p className="text-xs text-[#c5a059] uppercase tracking-wider">Step 6</p>
                <h3 className="text-xl font-heading text-white">Review Your Reservation</h3>
                <p className="text-xs text-stone-400">
                  Please verify your booking details before final confirmation:
                </p>
              </div>

              {/* Summary Card */}
              <div className="bg-[#121915] border border-[#c5a059]/40 rounded-xl p-4 sm:p-5 space-y-4 shadow-lg">
                <div className="flex justify-between items-start border-b border-stone-800 pb-3">
                  <div>
                    <span className="text-[11px] text-[#c5a059] uppercase font-mono tracking-wider">
                      Restaurant
                    </span>
                    <h4 className="text-lg font-heading text-white">Toma Toma</h4>
                    <p className="text-xs text-stone-400">Green Sun Building, Chino Roces Ave, Makati</p>
                  </div>
                  <div className="text-right">
                    <span className="px-2.5 py-1 bg-[#1b3d32] text-[#d4af37] text-xs font-semibold rounded-md border border-[#c5a059]/30">
                      {seatingArea === 'bar' ? 'Cocktail Bar' : 'Dining Area'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-stone-400 block mb-0.5">Party Size</span>
                    <span className="font-semibold text-white flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-[#c5a059]" /> {guests} {guests === 1 ? 'Guest' : 'Guests'}
                    </span>
                  </div>
                  <div>
                    <span className="text-stone-400 block mb-0.5">Date</span>
                    <span className="font-semibold text-white flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#c5a059]" /> {formatDateDisplay(date)}
                    </span>
                  </div>
                  <div>
                    <span className="text-stone-400 block mb-0.5">Seating Time</span>
                    <span className="font-semibold text-white flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#c5a059]" /> {timeSlot}
                    </span>
                  </div>
                </div>

                <div className="border-t border-stone-800/80 pt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-stone-400 block mb-0.5">Primary Guest</span>
                    <span className="font-medium text-white">{fullName}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block mb-0.5">Contact</span>
                    <span className="font-medium text-white">{phone} · {email}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block mb-0.5">Occasion</span>
                    <span className="font-medium text-stone-200">{specialOccasion}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block mb-0.5">Dietary Notes</span>
                    <span className="font-medium text-stone-200">
                      {selectedDietary.length > 0 ? selectedDietary.join(', ') : 'None specified'}
                      {customDietaryNote && ` (${customDietaryNote})`}
                    </span>
                  </div>
                </div>

                <div className="border-t border-stone-800/80 pt-2 text-[11px] text-stone-400 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#c5a059] shrink-0" />
                  <span>No cancellation fees up to 2 hours before seating. Smart casual dress code.</span>
                </div>
              </div>

              {/* Navigation & Reserve Now CTA */}
              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep(5)}
                  className="px-4 py-2.5 text-xs text-stone-400 hover:text-white flex items-center gap-1.5 rounded-lg border border-stone-800 hover:border-stone-700"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Edit Details
                </button>
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleFinalReserve}
                  className="px-8 py-3 bg-gradient-to-r from-[#d4af37] via-[#c5a059] to-[#aa8222] text-[#0b0e0d] font-black text-sm uppercase tracking-wider rounded-xl hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 cursor-pointer shadow-xl shadow-[#c5a059]/30 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      Securing Your Table...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Reserve Now
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 7: AUTOMATED CONFIRMATION EMAIL OR SMS UPON SUCCESS ================= */}
          {currentStep === 7 && confirmedBooking && (
            <div className="space-y-6 text-center py-2 animate-fadeIn">
              <div className="w-14 h-14 bg-[#1b3d32] border border-[#d4af37] text-[#d4af37] rounded-full flex items-center justify-center mx-auto shadow-lg shadow-[#10b981]/25">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-mono text-[#c5a059] tracking-widest uppercase">
                  Reservation Confirmed
                </span>
                <h3 className="text-2xl font-heading text-white">We Look Forward to Welcoming You!</h3>
                <p className="text-xs text-stone-300 max-w-md mx-auto">
                  Your table at Toma Toma has been successfully reserved. Reference: <strong className="text-[#d4af37] font-mono">{confirmedBooking.bookingId}</strong>
                </p>
              </div>

              {/* AUTOMATED DISPATCH STATUS */}
              <div className="p-3.5 rounded-xl bg-[#091510] border border-[#1b3d32] text-left text-xs space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                  <Sparkles className="w-4 h-4 text-[#d4af37]" />
                  <span>Automated Confirmation Dispatched:</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-stone-300">
                  <div className="flex items-center gap-2 bg-[#121915] p-2 rounded-lg border border-stone-800">
                    <MessageSquare className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>SMS sent to <strong className="text-white">{confirmedBooking.phone}</strong></span>
                  </div>
                  <div className="flex items-center gap-2 bg-[#121915] p-2 rounded-lg border border-stone-800">
                    <Mail className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Email sent to <strong className="text-white">{confirmedBooking.email}</strong></span>
                  </div>
                </div>
              </div>

              {/* INTERACTIVE NOTIFICATION PREVIEWS (SMS / EMAIL) */}
              <div className="text-left space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-stone-400 uppercase tracking-wider font-semibold">
                    Simulated Incoming Notification:
                  </span>
                  <div className="flex gap-1 bg-[#121915] p-1 rounded-lg border border-stone-800">
                    <button
                      type="button"
                      onClick={() => setActiveNotificationTab('sms')}
                      className={`px-2.5 py-1 text-xs rounded transition-colors ${
                        activeNotificationTab === 'sms' 
                          ? 'bg-[#1b3d32] text-[#d4af37] font-medium' 
                          : 'text-stone-400 hover:text-white'
                      }`}
                    >
                      SMS Message
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveNotificationTab('email')}
                      className={`px-2.5 py-1 text-xs rounded transition-colors ${
                        activeNotificationTab === 'email' 
                          ? 'bg-[#1b3d32] text-[#d4af37] font-medium' 
                          : 'text-stone-400 hover:text-white'
                      }`}
                    >
                      Email Receipt
                    </button>
                  </div>
                </div>

                {activeNotificationTab === 'sms' ? (
                  <div className="bg-[#121915] border border-stone-700/80 rounded-xl p-3.5 font-sans space-y-2 shadow-inner">
                    <div className="flex items-center justify-between text-[11px] text-stone-400 pb-1 border-b border-stone-800">
                      <span className="font-semibold text-emerald-400">TOMA-TOMA SMS ALERT</span>
                      <span>Just now</span>
                    </div>
                    <p className="text-xs text-stone-200 leading-relaxed font-mono">
                      CONFIRMED: Hi {confirmedBooking.fullName}, your table for {confirmedBooking.guests} at Toma Toma Makati is booked for {formatDateDisplay(confirmedBooking.date)} at {confirmedBooking.timeSlot} ({confirmedBooking.seatingArea === 'bar' ? 'Cocktail Bar' : 'Dining Area'}). Ref #{confirmedBooking.bookingId}. See you at Green Sun! Directions: {RESTAURANT_INFO.googleMapsUrl}
                    </p>
                  </div>
                ) : (
                  <div className="bg-[#121915] border border-[#c5a059]/40 rounded-xl p-4 font-sans space-y-3 shadow-inner">
                    <div className="flex justify-between items-center border-b border-stone-800 pb-2">
                      <div>
                        <span className="text-[10px] text-[#c5a059] uppercase font-mono">From: reservations@tomatoma.ph</span>
                        <h5 className="text-sm font-bold text-white">Your Reservation at Toma Toma is Confirmed</h5>
                      </div>
                      <span className="text-[10px] text-stone-400">Ref: {confirmedBooking.bookingId}</span>
                    </div>
                    <div className="text-xs text-stone-300 space-y-1">
                      <p>Dear {confirmedBooking.fullName},</p>
                      <p>We are delighted to confirm your upcoming reservation at Toma Toma, located inside Green Sun Building, 2285 Chino Roces Ave Ext, Makati.</p>
                      <div className="bg-[#081712] p-2.5 rounded-lg border border-[#1b3d32] my-2 text-stone-200">
                        <div>📅 <strong>{formatDateDisplay(confirmedBooking.date)} at {confirmedBooking.timeSlot}</strong></div>
                        <div>👥 <strong>{confirmedBooking.guests} Guests</strong> · 🍸 <strong>{confirmedBooking.seatingArea === 'bar' ? 'Cocktail Bar & Counter' : 'Dining Area'}</strong></div>
                        {confirmedBooking.specialOccasion && <div>✨ Occasion: {confirmedBooking.specialOccasion}</div>}
                      </div>
                      <p className="text-[11px] text-stone-400">Valet parking is available at the Green Sun ground lobby. Please arrive within 15 minutes of your booking time.</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2.5 justify-center pt-2">
                <a
                  href={RESTAURANT_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-[#1b3d32] text-[#d4af37] border border-[#c5a059]/40 rounded-xl text-xs font-semibold hover:bg-[#235242] transition-colors flex items-center justify-center gap-1.5"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  View Location on Google Maps
                </a>
                <button
                  onClick={resetAndClose}
                  className="px-6 py-2.5 bg-gradient-to-r from-[#d4af37] to-[#aa8222] text-[#0b0e0d] font-bold rounded-xl text-xs uppercase tracking-wider hover:brightness-110 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
