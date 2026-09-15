import { X, ShieldAlert, CheckCircle2, AlertTriangle, Smartphone, Ban, Clock, Award } from 'lucide-react';
import { TOURNAMENT_RULES } from '../data/tournamentData';

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RulesModal({ isOpen, onClose }: RulesModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#111722] to-[#0a0d14] rounded-2xl border border-orange-500/30 shadow-2xl shadow-black/80 p-6 sm:p-8 my-8 text-left">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700 transition-colors"
          aria-label="Close Rules"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest mb-1">
            <ShieldAlert className="w-4 h-4 text-amber-500" />
            Official Rulebook
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold font-['Rajdhani'] uppercase text-white">
            Tournament Rules & Fair Play Policy
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            ADS adheres strictly to official Free Fire competitive guidelines to guarantee an even playing field for every grassroots participant.
          </p>
        </div>

        {/* 3 Major Directives */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
            <Smartphone className="w-6 h-6 text-emerald-400 mx-auto mb-1.5" />
            <div className="text-xs font-bold text-white font-['Rajdhani'] uppercase">Mobile Only</div>
            <div className="text-[10px] text-slate-400 font-mono">Emulators = Instant DQ</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
            <Ban className="w-6 h-6 text-red-400 mx-auto mb-1.5" />
            <div className="text-xs font-bold text-white font-['Rajdhani'] uppercase">No Gun Skin Stats</div>
            <div className="text-[10px] text-slate-400 font-mono">Default weapon attributes</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
            <Clock className="w-6 h-6 text-amber-400 mx-auto mb-1.5" />
            <div className="text-xs font-bold text-white font-['Rajdhani'] uppercase">15-Min Room ID</div>
            <div className="text-[10px] text-slate-400 font-mono">WhatsApp & Instagram</div>
          </div>
        </div>

        {/* Bulleted Detailed Rules */}
        <div className="space-y-3 mb-6">
          {TOURNAMENT_RULES.map((rule, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
              <span>{rule}</span>
            </div>
          ))}
        </div>

        {/* Point Breakdown */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono">
          <div className="text-orange-400 font-bold uppercase mb-1 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5" />
            Competitive Placement Points Matrix:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-slate-300 pt-2">
            <div>1st (Booyah): <strong className="text-amber-400">12 Pts</strong></div>
            <div>2nd Place: <strong className="text-white">9 Pts</strong></div>
            <div>3rd Place: <strong className="text-white">8 Pts</strong></div>
            <div>4th Place: <strong className="text-white">7 Pts</strong></div>
            <div>5th Place: <strong className="text-white">6 Pts</strong></div>
            <div>6th Place: <strong className="text-white">5 Pts</strong></div>
            <div>7th-10th: <strong className="text-white">4 to 1 Pts</strong></div>
            <div>Each Kill: <strong className="text-orange-400">+1 Point</strong></div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold font-['Rajdhani'] uppercase tracking-wider text-xs"
          >
            I Understand & Agree
          </button>
        </div>
      </div>
    </div>
  );
}
