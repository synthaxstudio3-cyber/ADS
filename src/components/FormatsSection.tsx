import { Users, UserCheck, User, Clock, Award, CheckCircle2, ChevronRight, ShieldCheck } from 'lucide-react';
import { TOURNAMENT_FORMATS } from '../data/tournamentData';
import { TournamentFormat } from '../types';

interface FormatsSectionProps {
  onSelectFormat: (format: TournamentFormat) => void;
}

export function FormatsSection({ onSelectFormat }: FormatsSectionProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Users':
        return <Users className="w-7 h-7 text-orange-400" />;
      case 'UserCheck':
        return <UserCheck className="w-7 h-7 text-amber-400" />;
      case 'User':
        return <User className="w-7 h-7 text-red-400" />;
      default:
        return <Users className="w-7 h-7 text-orange-400" />;
    }
  };

  return (
    <section id="formats" className="py-20 bg-[#0c1017] relative border-t border-slate-800/80">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl h-96 bg-orange-600/5 blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-950/60 border border-orange-500/30 text-xs font-mono font-bold text-orange-400 uppercase tracking-widest mb-3">
            <Award className="w-3.5 h-3.5" />
            Competitive Formats
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-['Rajdhani'] uppercase tracking-tight text-white">
            Choose Your <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">Battleground</span> Format
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            Whether you lead an undefeated 4-man squad, dominate with your trusted duo partner, or test individual reflexes in solo lobbies—every format is scouted.
          </p>
        </div>

        {/* 3 Distinct Format Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {TOURNAMENT_FORMATS.map((format) => {
            const isSquad = format.id === 'squad';
            return (
              <div
                key={format.id}
                className={`relative rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1.5 ${
                  isSquad
                    ? 'bg-gradient-to-b from-slate-900 to-[#101520] border-2 border-orange-500/60 shadow-xl shadow-orange-950/30'
                    : 'bg-slate-900/80 border border-slate-800 hover:border-orange-500/40'
                }`}
                id={`format-card-${format.id}`}
              >
                {/* Featured Badge */}
                <div className="flex items-center justify-between mb-5">
                  <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800 group-hover:border-orange-500/50 transition-colors">
                    {getIcon(format.iconName)}
                  </div>
                  <span
                    className={`text-[11px] font-mono font-bold tracking-wider uppercase px-2.5 py-1 rounded-full border ${
                      isSquad
                        ? 'bg-orange-500/20 text-orange-300 border-orange-500/40'
                        : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    {format.badge}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <div>
                  <h3 className="text-2xl font-bold font-['Rajdhani'] text-white uppercase tracking-wide group-hover:text-orange-400 transition-colors">
                    {format.title}
                  </h3>
                  <div className="text-xs text-orange-400/90 font-mono mt-0.5 mb-3 font-semibold">
                    {format.subtitle}
                  </div>

                  <p className="text-slate-300 text-sm leading-relaxed mb-6">
                    {format.description}
                  </p>

                  {/* Specs Pill List */}
                  <div className="space-y-2 mb-6 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs font-mono">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Team Size:</span>
                      <span className="text-white font-bold">{format.teamSize}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Lobby Size:</span>
                      <span className="text-amber-400 font-bold">{format.playerCount}</span>
                    </div>
                    <div className="flex items-center justify-between border-t border-slate-800/80 pt-2">
                      <span className="text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-red-400" />
                        Registration Closes:
                      </span>
                      <span className="text-red-400 font-bold">{format.registrationCloses}</span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-2 mb-6">
                    <div className="text-xs uppercase font-mono tracking-wider text-slate-400 font-semibold mb-1">
                      Format Rules & Perks:
                    </div>
                    {format.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Card Action */}
                <div className="pt-4 border-t border-slate-800/80">
                  <div className="flex items-center justify-between mb-3 text-xs">
                    <span className="text-slate-400 font-mono">Prize Allocation:</span>
                    <span className="text-amber-400 font-mono font-bold">{format.prizeShare}</span>
                  </div>
                  <button
                    onClick={() => onSelectFormat(format.id)}
                    className={`w-full py-3 px-4 rounded-xl font-bold font-['Rajdhani'] uppercase tracking-wider text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      isSquad
                        ? 'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white shadow-lg shadow-orange-600/30'
                        : 'bg-slate-800 hover:bg-orange-600 text-slate-200 hover:text-white border border-slate-700 hover:border-orange-500'
                    }`}
                    id={`register-format-btn-${format.id}`}
                  >
                    <span>Register For {format.title.split(' ')[0]}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Anti-cheat banner badge */}
        <div className="mt-12 p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-600/30 text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-white font-['Rajdhani'] uppercase tracking-wide">
                100% Fair Play & Anti-Cheat Verified Matches
              </div>
              <div className="text-xs text-slate-400">
                Mobile-only lobby policy • Stat-boost gun skins disabled • UID & post-match screenshot audit
              </div>
            </div>
          </div>
          <div className="text-xs font-mono text-orange-400 bg-orange-950/40 border border-orange-900/50 px-3 py-1.5 rounded-lg">
            Free Entry For Grassroots Teams
          </div>
        </div>
      </div>
    </section>
  );
}
