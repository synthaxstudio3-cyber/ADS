import { useState, useEffect } from 'react';
import { Flame, Trophy, ShieldAlert, Sparkles, Instagram, ExternalLink, CheckCircle, Clock } from 'lucide-react';
import defaultHeroBanner from '../assets/images/firehunt_hero_banner_1789481297600.jpg';

interface HeroSectionProps {
  onRegisterClick: () => void;
}

export function HeroSection({ onRegisterClick }: HeroSectionProps) {
  const [heroImageSrc] = useState<string>(defaultHeroBanner);

  // Countdown to 23rd September 2026 (Kickoff date specified in prompt)
  const targetDate = new Date('2026-09-23T15:00:00+05:30').getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = Math.max(0, targetDate - now);

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <section id="hero" className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Background ambient fiery glow & grid lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-b from-orange-600/20 via-red-600/15 to-transparent blur-3xl opacity-70"></div>
        <div className="absolute -top-24 right-0 w-96 h-96 bg-amber-500/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293d0d_1px,transparent_1px),linear-gradient(to_bottom,#1f293d0d_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-red-950/90 to-orange-950/80 border border-orange-500/40 text-xs sm:text-sm font-semibold text-orange-300 font-mono shadow-md shadow-orange-950/50">
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-ping"></span>
            <span>WEEKEND TOURNAMENTS • EVERY SATURDAY & SUNDAY</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs text-amber-300 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>GRASSROOTS TALENT HUNT 2026</span>
          </div>
        </div>

        {/* Headlines */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase font-['Rajdhani'] tracking-tight leading-[1.05] text-white">
            Hunt the Talent. <br />
            <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent text-glow">
              Claim the Glory.
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-xl text-slate-300 font-normal leading-relaxed max-w-3xl mx-auto">
            The proving grounds for rising mobile champions. High-octane Free Fire tournaments held{' '}
            <strong className="text-orange-400 font-semibold">every Saturday and Sunday</strong>. 
            Kickoff begins on <span className="underline decoration-orange-500/60 font-semibold text-white">23rd September 2026</span> with{' '}
            <span className="text-amber-300 font-semibold">Squad, Duo, and Solo</span> match formats.
          </p>

          {/* Countdown Clock to 23rd September */}
          <div className="mt-8 inline-block p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#0b0e14]/90 border border-orange-500/30 shadow-xl shadow-black/50 backdrop-blur-md">
            <div className="flex items-center justify-center gap-2 mb-3 text-xs uppercase tracking-widest text-slate-400 font-mono font-semibold">
              <Clock className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
              <span>Championship Kickoff Starts In:</span>
            </div>
            <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
              <div className="px-2.5 py-1.5 sm:px-4 sm:py-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80 min-w-[64px] sm:min-w-[80px]">
                <span className="block text-2xl sm:text-4xl font-extrabold font-['Rajdhani'] text-white">
                  {String(timeLeft.days).padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider font-mono">Days</span>
              </div>
              <div className="px-2.5 py-1.5 sm:px-4 sm:py-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80 min-w-[64px] sm:min-w-[80px]">
                <span className="block text-2xl sm:text-4xl font-extrabold font-['Rajdhani'] text-orange-400">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider font-mono">Hours</span>
              </div>
              <div className="px-2.5 py-1.5 sm:px-4 sm:py-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80 min-w-[64px] sm:min-w-[80px]">
                <span className="block text-2xl sm:text-4xl font-extrabold font-['Rajdhani'] text-amber-400">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider font-mono">Mins</span>
              </div>
              <div className="px-2.5 py-1.5 sm:px-4 sm:py-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80 min-w-[64px] sm:min-w-[80px]">
                <span className="block text-2xl sm:text-4xl font-extrabold font-['Rajdhani'] text-red-500">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider font-mono">Secs</span>
              </div>
            </div>
          </div>

          {/* Dual CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onRegisterClick}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-orange-600 via-amber-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-extrabold text-base tracking-wider uppercase font-['Rajdhani'] shadow-xl shadow-orange-600/40 hover:shadow-orange-500/60 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer group"
              id="hero-register-btn"
            >
              <Flame className="w-5 h-5 text-amber-200 fill-amber-300 group-hover:scale-110 transition-transform" />
              <span>Register For Next Match</span>
            </button>

            <a
              href="https://www.instagram.com/ads_tournaments/?hl=en#"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-gradient-to-r from-[#211122]/90 via-slate-900/90 to-[#190e24]/90 hover:from-[#2e1330] hover:to-[#221035] text-slate-100 hover:text-white font-bold text-base tracking-wider uppercase font-['Rajdhani'] border border-pink-500/40 hover:border-pink-500/80 transition-all duration-200 flex items-center justify-center gap-2.5 shadow-lg shadow-black/40 group cursor-pointer"
              id="hero-instagram-btn"
            >
              <Instagram className="w-5 h-5 text-pink-400 group-hover:text-pink-300 group-hover:scale-110 transition-transform" />
              <span>Join Instagram Community</span>
              <span className="ml-1 text-xs px-2 py-0.5 rounded bg-pink-950/80 text-pink-300 border border-pink-700/40 font-mono">
                @ads_tournaments
              </span>
            </a>
          </div>
        </div>

        {/* Prominent Hero Tournament Banner Image */}
        <div className="relative mt-8 max-w-5xl mx-auto">
          {/* Corner accent decorations */}
          <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-orange-500 z-20"></div>
          <div className="absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 border-orange-500 z-20"></div>
          <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b-2 border-l-2 border-red-500 z-20"></div>
          <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-red-500 z-20"></div>

          <div className="relative rounded-2xl overflow-hidden border-2 border-orange-500/30 bg-slate-950 shadow-2xl shadow-orange-950/40 group">
            {/* 
              ===========================================================================================
              HERO TOURNAMENT BANNER IMAGE ELEMENT:
              To replace with your custom image link or file name:
              Update the src="..." attribute below or use the "Customize Banner" toggle on the top right.
              ===========================================================================================
            */}
            <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
              <img
                id="hero-tournament-banner-img"
                src={heroImageSrc}
                alt="ADS Free Fire Tournament Official Banner"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transform group-hover:scale-[1.02] transition-transform duration-700 ease-out"
              />

              {/* Cinematic Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e14] via-transparent to-black/40 pointer-events-none"></div>

              {/* Bottom Banner Info Bar */}
              <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 text-white">
                <div>
                  <p className="text-xs uppercase tracking-widest text-orange-400 font-mono font-bold">
                    Official Grassroots Circuit
                  </p>
                </div>
                <div className="flex items-center gap-3 bg-black/80 backdrop-blur-md px-3.5 py-2 rounded-xl border border-orange-500/30">
                  <Trophy className="w-5 h-5 text-amber-400" />
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-mono">Weekly Prize Pool</div>
                    <div className="text-base font-extrabold text-white font-['Rajdhani']">₹50,000 INR + MVP Trophies</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Key Stats Bar */}
        <div className="mt-12 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-orange-500/30 transition-all text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-['Rajdhani']">₹1,00,000+</div>
            <div className="text-xs text-orange-400/90 font-mono uppercase mt-0.5">Monthly Prize Pool</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-orange-500/30 transition-all text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-['Rajdhani']">1,450+</div>
            <div className="text-xs text-slate-400 font-mono uppercase mt-0.5">Grassroots Fraggers</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-orange-500/30 transition-all text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-red-500 font-['Rajdhani']">64+</div>
            <div className="text-xs text-slate-400 font-mono uppercase mt-0.5">Weekend Scrims</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-orange-500/30 transition-all text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-['Rajdhani']">14 Scouts</div>
            <div className="text-xs text-slate-400 font-mono uppercase mt-0.5">Tier 1 & 2 Pro Orgs</div>
          </div>
        </div>
      </div>
    </section>
  );
}
