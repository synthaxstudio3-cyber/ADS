import { useState, useEffect } from 'react';
import { Flame, Shield, Trophy, Calendar, Users, Menu, X, Bell } from 'lucide-react';
import logoImg from '../assets/images/firehunt_logo_1789481319227.jpg';

interface NavbarProps {
  onRegisterClick: () => void;
  onRulesClick: () => void;
  registeredCount: number;
}

export function Navbar({ onRegisterClick, onRulesClick, registeredCount }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero', icon: Flame },
    { name: 'Schedule', href: '#schedule', icon: Calendar },
    { name: 'Tournaments', href: '#formats', icon: Trophy },
    { name: 'Talent Hunt', href: '#talenthunt', icon: Shield },
    { name: 'Leaderboard', href: '#leaderboard', icon: Users },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0b0e14]/95 backdrop-blur-md border-b border-orange-500/20 shadow-lg shadow-black/60'
          : 'bg-gradient-to-b from-[#0b0e14] to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <a href="#hero" className="flex items-center gap-3 group focus:outline-none" id="brand-logo-link">
            <div className="relative w-11 h-11 rounded-lg overflow-hidden border border-orange-500/40 p-0.5 bg-gradient-to-br from-orange-500/20 to-red-600/20 group-hover:border-orange-400 transition-colors">
              <img
                src={logoImg}
                alt="ADS Logo"
                className="w-full h-full object-cover rounded-md"
                referrerPolicy="no-referrer"
              />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
              </span>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-extrabold tracking-wider font-['Rajdhani'] uppercase bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                  ADS
                </span>
              </div>
              <p className="text-[10px] text-slate-400 tracking-wider uppercase hidden sm:block font-medium">
                Hunt the Talent. Claim the Glory.
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="px-3 py-2 text-sm font-semibold text-slate-300 hover:text-orange-400 transition-colors tracking-wide rounded-md hover:bg-orange-500/10 flex items-center gap-1.5"
                id={`nav-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <item.icon className="w-3.5 h-3.5 text-orange-500/80" />
                {item.name}
              </a>
            ))}
            <button
              onClick={onRulesClick}
              className="px-3 py-2 text-sm font-semibold text-slate-300 hover:text-orange-400 transition-colors tracking-wide rounded-md hover:bg-orange-500/10 flex items-center gap-1.5"
              id="nav-rules-btn"
            >
              <Shield className="w-3.5 h-3.5 text-amber-500" />
              Rules & Fair Play
            </button>
          </nav>

          {/* CTAs & Action */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs text-slate-300 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>{registeredCount} Registered Teams</span>
            </div>

            <button
              onClick={onRegisterClick}
              className="relative group overflow-hidden px-5 py-2.5 rounded-lg bg-gradient-to-r from-orange-600 via-amber-600 to-red-600 text-white font-bold text-sm tracking-wider uppercase font-['Rajdhani'] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] shadow-lg shadow-orange-600/30 hover:shadow-orange-500/50 flex items-center gap-2 cursor-pointer"
              id="navbar-register-cta"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
              <Flame className="w-4 h-4 text-amber-200 fill-amber-300 animate-bounce" />
              <span>Register Now</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={onRegisterClick}
              className="px-3 py-1.5 rounded bg-gradient-to-r from-orange-600 to-red-600 text-white text-xs font-bold uppercase tracking-wider font-['Rajdhani'] shadow-md shadow-orange-500/30"
              id="mobile-nav-register-cta"
            >
              Register
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900/90 text-slate-300 hover:text-white border border-slate-800"
              aria-label="Toggle Navigation"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0e121a]/98 border-b border-orange-500/20 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Lobbies open for Sep 23 Kickoff
            </span>
            <span className="text-orange-400 font-bold">{registeredCount} Teams</span>
          </div>
          <div className="flex flex-col space-y-1">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-md text-base font-semibold text-slate-200 hover:text-orange-400 hover:bg-slate-900 flex items-center gap-3"
              >
                <item.icon className="w-4 h-4 text-orange-500" />
                {item.name}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onRulesClick();
              }}
              className="px-3 py-2.5 rounded-md text-base font-semibold text-slate-200 hover:text-orange-400 hover:bg-slate-900 flex items-center gap-3 text-left w-full"
            >
              <Shield className="w-4 h-4 text-amber-500" />
              Tournament Rules
            </button>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onRegisterClick();
              }}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-orange-600 via-amber-600 to-red-600 text-white font-bold tracking-wider uppercase font-['Rajdhani'] text-center flex items-center justify-center gap-2 shadow-lg shadow-orange-600/30"
              id="mobile-drawer-register"
            >
              <Flame className="w-5 h-5 text-amber-200" />
              Register For Next Match
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
