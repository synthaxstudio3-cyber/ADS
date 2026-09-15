import { Flame, MessageSquare, Send, Youtube, Instagram, Shield, Award, Heart } from 'lucide-react';
import logoImg from '../assets/images/firehunt_logo_1789481319227.jpg';

interface FooterProps {
  onRulesClick: () => void;
  onRegisterClick: () => void;
}

export function Footer({ onRulesClick, onRegisterClick }: FooterProps) {
  const socialLinks = [
    {
      name: 'Instagram Community',
      handle: '@ads_tournaments',
      url: 'https://www.instagram.com/ads_tournaments/?hl=en#',
      icon: Instagram,
      color: 'hover:text-pink-400',
      badge: 'Official Page',
    },
    {
      name: 'WhatsApp Community',
      handle: 'Join Alert Group',
      url: 'https://whatsapp.com',
      icon: MessageSquare,
      color: 'hover:text-emerald-400',
      badge: 'Room ID Drops',
    },
    {
      name: 'YouTube',
      handle: '@ADSEsportsLive',
      url: 'https://youtube.com',
      icon: Youtube,
      color: 'hover:text-red-500',
      badge: 'Weekend Casts',
    },
    {
      name: 'Match Highlights',
      handle: 'Follow Reels & MVPs',
      url: 'https://www.instagram.com/ads_tournaments/?hl=en#',
      icon: Award,
      color: 'hover:text-amber-400',
      badge: 'Highlights & MVPs',
    },
  ];

  return (
    <footer className="bg-[#070a0f] border-t border-orange-500/20 pt-16 pb-12 relative overflow-hidden text-left">
      {/* Subtle bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-orange-600/5 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg overflow-hidden border border-orange-500/40 p-0.5 bg-gradient-to-br from-orange-500/20 to-red-600/20">
                <img
                  src={logoImg}
                  alt="ADS"
                  className="w-full h-full object-cover rounded"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="text-2xl font-extrabold font-['Rajdhani'] uppercase tracking-wider bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                  ADS
                </span>
                <p className="text-[11px] text-orange-400/90 font-mono uppercase tracking-wider">
                  Hunt the Talent. Claim the Glory.
                </p>
              </div>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              The premier grassroots Free Fire tournament organizer. Hosting weekend Squad, Duo, and Solo matches with casted streams, anti-cheat enforcement, and direct scout invitations.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="text-xs font-mono text-slate-400">Weekly Schedule:</span>
              <span className="text-xs font-mono font-bold text-amber-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                Every Sat & Sun
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold font-['Rajdhani'] uppercase tracking-wider text-white mb-4">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-mono">
              <li>
                <a href="#hero" className="hover:text-orange-400 transition-colors">
                  Home Overview
                </a>
              </li>
              <li>
                <a href="#schedule" className="hover:text-orange-400 transition-colors">
                  Weekend Schedule
                </a>
              </li>
              <li>
                <a href="#formats" className="hover:text-orange-400 transition-colors">
                  Tournament Formats
                </a>
              </li>
              <li>
                <a href="#leaderboard" className="hover:text-orange-400 transition-colors">
                  Grassroots Leaderboard
                </a>
              </li>
              <li>
                <a href="#talenthunt" className="hover:text-orange-400 transition-colors">
                  Talent Discovery Pipeline
                </a>
              </li>
              <li>
                <button
                  onClick={onRulesClick}
                  className="hover:text-orange-400 transition-colors text-left"
                >
                  Rules & Fair Play
                </button>
              </li>
            </ul>
          </div>

          {/* Tournament Formats Links */}
          <div>
            <h4 className="text-sm font-bold font-['Rajdhani'] uppercase tracking-wider text-white mb-4">
              Formats & Maps
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-mono">
              <li>
                <a href="#formats" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  <span>Squad Clash (4v4)</span>
                </a>
              </li>
              <li>
                <a href="#formats" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  <span>Dynamic Duos (2v2)</span>
                </a>
              </li>
              <li>
                <a href="#formats" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  <span>Lone Wolf Solo (1v1)</span>
                </a>
              </li>
              <li className="pt-2 text-[11px] text-slate-500 uppercase font-semibold">Active Maps:</li>
              <li className="text-slate-300">Bermuda • Purgatory • Kalahari</li>
              <li className="text-emerald-400 text-[11px]">Kickoff: 23rd Sept 2026</li>
            </ul>
          </div>

          {/* Social Channels (Required: YouTube, Instagram, Discord, WhatsApp) */}
          <div>
            <h4 className="text-sm font-bold font-['Rajdhani'] uppercase tracking-wider text-white mb-4">
              Community Channels
            </h4>
            <ul className="space-y-3 text-xs">
              {socialLinks.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-between text-slate-300 ${social.color} transition-colors group p-2 rounded-lg bg-slate-900/60 border border-slate-800/80 hover:border-slate-700`}
                    id={`social-link-${social.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <div className="flex items-center gap-2">
                      <social.icon className="w-4 h-4 text-orange-400 group-hover:scale-110 transition-transform" />
                      <span className="font-semibold">{social.name}</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 group-hover:text-slate-300">
                      {social.badge}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Room ID & Disclaimer Banner */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 text-xs leading-relaxed mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-[11px] font-mono">
            <Shield className="w-4 h-4 text-orange-500 shrink-0" />
            <span>
              Disclaimer: ADS is an independent grassroots tournament organizer. Free Fire is a registered trademark of Garena. All community matches operate under official community tournament guidelines.
            </span>
          </div>
          <button
            onClick={onRegisterClick}
            className="shrink-0 px-4 py-1.5 rounded-lg bg-orange-600/20 hover:bg-orange-600/40 text-orange-300 border border-orange-500/40 text-xs font-bold font-['Rajdhani'] uppercase"
          >
            Register Weekend Slot
          </button>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono gap-3">
          <div>
            © 2026 ADS. All rights reserved. Hunt the Talent. Claim the Glory.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Built for Grassroots Free Fire Champions</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
