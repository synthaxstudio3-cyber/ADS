import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FormatsSection } from './components/FormatsSection';
import { WeekendScheduleSection } from './components/WeekendScheduleSection';
import { TalentHuntSection } from './components/TalentHuntSection';
import { LeaderboardSection } from './components/LeaderboardSection';
import { RegistrationModal } from './components/RegistrationModal';
import { RulesModal } from './components/RulesModal';
import { Footer } from './components/Footer';
import { INITIAL_MATCH_SLOTS } from './data/tournamentData';
import { TournamentFormat, MatchSlot, PlayerRegistration } from './types';
import { Flame, ArrowUp } from 'lucide-react';

export default function App() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<TournamentFormat>('squad');
  const [selectedSlotId, setSelectedSlotId] = useState<string | undefined>(undefined);

  // Match slots state with local persistence
  const [slots, setSlots] = useState<MatchSlot[]>(() => {
    const saved = localStorage.getItem('ads_slots') || localStorage.getItem('firehunt_slots');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_MATCH_SLOTS;
      }
    }
    return INITIAL_MATCH_SLOTS;
  });

  // Registered teams count
  const [registeredCount, setRegisteredCount] = useState<number>(() => {
    const saved = localStorage.getItem('ads_registered_count') || localStorage.getItem('firehunt_registered_count');
    return saved ? parseInt(saved, 10) : 128;
  });

  // Scroll to top button visibility
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenRegister = (format?: TournamentFormat, slotId?: string) => {
    if (format) setSelectedFormat(format);
    if (slotId) setSelectedSlotId(slotId);
    setIsRegisterOpen(true);
  };

  const handleSelectFormat = (format: TournamentFormat) => {
    setSelectedFormat(format);
    const matchingSlot = slots.find((s) => s.format === format);
    setSelectedSlotId(matchingSlot?.id);
    setIsRegisterOpen(true);
  };

  const handleRegisterSlot = (slot: MatchSlot) => {
    setSelectedFormat(slot.format);
    setSelectedSlotId(slot.id);
    setIsRegisterOpen(true);
  };

  const handleSuccessfulRegistration = (newRegistration: PlayerRegistration) => {
    // Increment registered count
    const updatedCount = registeredCount + 1;
    setRegisteredCount(updatedCount);
    localStorage.setItem('ads_registered_count', updatedCount.toString());

    // Update slots filled count
    setSlots((prevSlots) => {
      const updated = prevSlots.map((slot) => {
        if (slot.id === newRegistration.slotId && slot.spotsFilled < slot.spotsTotal) {
          const newFilled = slot.spotsFilled + 1;
          return {
            ...slot,
            spotsFilled: newFilled,
            status: (newFilled >= slot.spotsTotal ? 'Full' : newFilled >= slot.spotsTotal - 2 ? 'Filling Fast' : slot.status) as MatchSlot['status'],
          };
        }
        return slot;
      });
      localStorage.setItem('ads_slots', JSON.stringify(updated));
      return updated;
    });

    // Also persist user ticket to local history
    try {
      const existingHistory = JSON.parse(localStorage.getItem('ads_user_passes') || localStorage.getItem('firehunt_user_passes') || '[]');
      existingHistory.unshift(newRegistration);
      localStorage.setItem('ads_user_passes', JSON.stringify(existingHistory));
    } catch (e) {
      console.error(e);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0b0e14] text-slate-100 font-sans selection:bg-orange-500 selection:text-white relative">
      {/* Top Navbar */}
      <Navbar
        onRegisterClick={() => handleOpenRegister()}
        onRulesClick={() => setIsRulesOpen(true)}
        registeredCount={registeredCount}
      />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero Section */}
        <HeroSection onRegisterClick={() => handleOpenRegister()} />

        {/* 2. Weekend Schedule Section (Saturday & Sunday, Bermuda/Purgatory/Kalahari) */}
        <WeekendScheduleSection
          slots={slots}
          onRegisterSlot={handleRegisterSlot}
        />

        {/* 3. Tournament Formats Section (Solo, Duo, Squad) */}
        <FormatsSection onSelectFormat={handleSelectFormat} />

        {/* 4. Why Join Us / Grassroots Talent Hunt Section */}
        <TalentHuntSection onRegisterClick={() => handleOpenRegister()} />

        {/* 5. Leaderboard Section */}
        <LeaderboardSection />
      </main>

      {/* Footer */}
      <Footer
        onRulesClick={() => setIsRulesOpen(true)}
        onRegisterClick={() => handleOpenRegister()}
      />

      {/* Registration Modal */}
      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        availableSlots={slots}
        initialFormat={selectedFormat}
        initialSlotId={selectedSlotId}
        onSuccessfulRegistration={handleSuccessfulRegistration}
      />

      {/* Rules & Fair Play Modal */}
      <RulesModal
        isOpen={isRulesOpen}
        onClose={() => setIsRulesOpen(false)}
      />

      {/* Floating Scroll to Top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-xl bg-slate-900/90 text-orange-400 hover:text-white hover:bg-orange-600 border border-slate-700 hover:border-orange-500 shadow-xl transition-all duration-200 cursor-pointer"
          aria-label="Scroll to top"
          id="scroll-to-top-btn"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
