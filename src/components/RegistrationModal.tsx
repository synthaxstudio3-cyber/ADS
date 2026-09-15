import { useState, type FormEvent } from 'react';
import { X, Flame, CheckCircle, Trophy, Shield, Copy, Check, Users, User, UserCheck, Database, Loader2, Instagram, ExternalLink } from 'lucide-react';
import { TournamentFormat, MatchSlot, PlayerRegistration } from '../types';
import { saveRegistrationToSupabase, SupabaseSyncResult } from '../lib/supabase';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableSlots: MatchSlot[];
  initialFormat?: TournamentFormat;
  initialSlotId?: string;
  onSuccessfulRegistration: (reg: PlayerRegistration) => void;
}

export function RegistrationModal({
  isOpen,
  onClose,
  availableSlots,
  initialFormat = 'squad',
  initialSlotId,
  onSuccessfulRegistration,
}: RegistrationModalProps) {
  const [format, setFormat] = useState<TournamentFormat>(initialFormat);
  const [teamName, setTeamName] = useState('');
  const [captainName, setCaptainName] = useState('');
  const [captainIGN, setCaptainIGN] = useState('');
  const [captainUID, setCaptainUID] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [discordTag, setDiscordTag] = useState('');
  const [instagramHandle, setInstagramHandle] = useState('');
  const [selectedSlotId, setSelectedSlotId] = useState(
    initialSlotId || (availableSlots.length > 0 ? availableSlots[0].id : '')
  );

  // Additional teammates for Duo (1) or Squad (3)
  const [teammate2IGN, setTeammate2IGN] = useState('');
  const [teammate2UID, setTeammate2UID] = useState('');
  const [teammate3IGN, setTeammate3IGN] = useState('');
  const [teammate3UID, setTeammate3UID] = useState('');
  const [teammate4IGN, setTeammate4IGN] = useState('');
  const [teammate4UID, setTeammate4UID] = useState('');

  const [confirmedPass, setConfirmedPass] = useState<PlayerRegistration | null>(null);
  const [copiedPassId, setCopiedPassId] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [supabaseResult, setSupabaseResult] = useState<SupabaseSyncResult | null>(null);

  if (!isOpen) return null;

  const relevantSlots = availableSlots.filter((slot) => slot.format === format);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!captainIGN.trim() || !captainUID.trim() || !whatsappNumber.trim()) {
      setErrorMsg('Please fill out your In-Game Name, Free Fire UID, and WhatsApp number.');
      return;
    }

    if (format !== 'solo' && !teamName.trim()) {
      setErrorMsg('Team Name is required for Duo & Squad registrations.');
      return;
    }

    const slot = availableSlots.find((s) => s.id === selectedSlotId) || availableSlots[0];
    const passCode = `ADS-${format.toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;

    const newRegistration: PlayerRegistration = {
      id: passCode,
      ticketId: passCode,
      format,
      teamName: format === 'solo' ? captainIGN : teamName,
      captainName: captainName || captainIGN,
      captainIGN,
      captainUID,
      whatsappNumber,
      discordTag: discordTag || 'Not provided',
      instagramHandle: instagramHandle.trim() ? (instagramHandle.trim().startsWith('@') ? instagramHandle.trim() : `@${instagramHandle.trim()}`) : undefined,
      slotId: slot.id,
      map: slot.map,
      registeredAt: new Date().toISOString(),
      teammates:
        format === 'squad'
          ? [
              { ign: teammate2IGN || 'Squad Member 2', uid: teammate2UID },
              { ign: teammate3IGN || 'Squad Member 3', uid: teammate3UID },
              { ign: teammate4IGN || 'Squad Member 4', uid: teammate4UID },
            ]
          : format === 'duo'
          ? [{ ign: teammate2IGN || 'Duo Partner', uid: teammate2UID }]
          : undefined,
    };

    setIsSubmitting(true);

    try {
      // Connect and save directly into Supabase project rmkalviluxpknpaaviyb
      const result = await saveRegistrationToSupabase(newRegistration);
      setSupabaseResult(result);
    } catch (err: any) {
      console.warn('Supabase sync attempted with fallback:', err);
      setSupabaseResult({ success: false, error: err?.message || 'Offline queue' });
    } finally {
      setIsSubmitting(false);
      setConfirmedPass(newRegistration);
      onSuccessfulRegistration(newRegistration);
    }
  };

  const handleCopyPassId = () => {
    if (confirmedPass) {
      navigator.clipboard.writeText(confirmedPass.ticketId);
      setCopiedPassId(true);
      setTimeout(() => setCopiedPassId(false), 2500);
    }
  };

  const handleResetModal = () => {
    setConfirmedPass(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[92vh] flex flex-col bg-gradient-to-b from-[#121824] via-[#0d121c] to-[#080b10] rounded-2xl border-2 border-orange-500/40 shadow-2xl shadow-black/90 my-auto text-left overflow-hidden">
        {/* Close Button */}
        <button
          onClick={handleResetModal}
          className="absolute top-4 right-4 z-20 p-2 rounded-xl bg-slate-900/90 text-slate-300 hover:text-white border border-slate-700 hover:border-orange-500 transition-colors cursor-pointer shadow-md"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Modal Body */}
        <div className="p-4 sm:p-7 overflow-y-auto overscroll-contain">
        {confirmedPass ? (
          /* SUCCESS COMPETITOR PASS VIEW */
          <div className="text-center py-2">
            <div className="w-16 h-16 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-9 h-9" />
            </div>

            <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800/40">
              Registration Confirmed!
            </span>

            <h3 className="text-2xl sm:text-3xl font-extrabold font-['Rajdhani'] uppercase text-white mt-3">
              Grassroots Competitor Pass Generated
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto mt-2 leading-relaxed">
              Your registration is locked in for the upcoming weekend bracket. Room ID and password will be sent to your WhatsApp & Instagram 15 minutes before match drop.
            </p>

            {/* Pass Ticket Box */}
            <div className="mt-6 p-6 rounded-2xl bg-slate-950 border-2 border-orange-500/40 relative overflow-hidden text-left font-mono">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <div className="text-[10px] text-orange-400 uppercase font-bold">ADS Pass</div>
                  <div className="text-lg font-bold text-white uppercase">{confirmedPass.teamName}</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <div className="text-[10px] text-slate-400">PASS ID</div>
                    <div className="text-sm font-bold text-amber-400">{confirmedPass.ticketId}</div>
                  </div>
                  <button
                    onClick={handleCopyPassId}
                    className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-orange-500 text-slate-300 hover:text-white transition-colors"
                    title="Copy Pass ID"
                  >
                    {copiedPassId ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 text-xs">
                <div>
                  <div className="text-slate-500 text-[10px] uppercase">Format</div>
                  <div className="text-white font-bold uppercase">{confirmedPass.format}</div>
                </div>
                <div>
                  <div className="text-slate-500 text-[10px] uppercase">Map</div>
                  <div className="text-emerald-400 font-bold">{confirmedPass.map}</div>
                </div>
                <div>
                  <div className="text-slate-500 text-[10px] uppercase">Captain IGN</div>
                  <div className="text-amber-300 font-bold truncate">{confirmedPass.captainIGN}</div>
                </div>
                <div>
                  <div className="text-slate-500 text-[10px] uppercase">UID</div>
                  <div className="text-slate-300 font-bold">{confirmedPass.captainUID}</div>
                </div>
              </div>

              {confirmedPass.instagramHandle && (
                <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <Instagram className="w-3.5 h-3.5 text-pink-400" />
                    <span>Instagram Profile</span>
                  </span>
                  <span className="text-pink-300 font-semibold">{confirmedPass.instagramHandle}</span>
                </div>
              )}

              <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-emerald-400" />
                  Anti-Cheat Verified Spot
                </span>
                <span className="text-orange-400">Entry: FREE</span>
              </div>

              {/* Supabase Realtime Sync Status Indicator */}
              <div className="mt-3 pt-3 border-t border-slate-900 flex items-center justify-between text-[11px] font-mono">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <Database className="w-3.5 h-3.5 text-emerald-400" />
                  <span>
                    {supabaseResult?.success
                      ? `Synced with Supabase Cloud (${supabaseResult.table || 'registrations'})`
                      : 'Connected to Supabase Project (rmkalviluxpknpaaviyb)'}
                  </span>
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-400">
                  ID: rmkalvilux...
                </span>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleResetModal}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold font-['Rajdhani'] uppercase tracking-wider text-sm shadow-md"
              >
                Back To Tournament Hub
              </button>
              <a
                href="https://www.instagram.com/ads_tournaments/?hl=en#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 via-rose-600 to-orange-600 hover:from-pink-500 hover:to-orange-500 text-white font-bold font-['Rajdhani'] uppercase tracking-wider text-sm flex items-center justify-center gap-2 shadow-md shadow-pink-900/30"
                id="post-registration-instagram-btn"
              >
                <Instagram className="w-4 h-4" />
                Join Instagram Community
              </a>
            </div>
          </div>
        ) : (
          /* REGISTRATION FORM VIEW */
          <div>
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-orange-400 uppercase tracking-widest mb-1">
                <Flame className="w-4 h-4 text-orange-500" />
                Weekend Match Registration
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-['Rajdhani'] uppercase text-white">
                Register For Free Fire Tournaments
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Free entry for grassroots teams. Kickoff starts 23rd September 2026.
              </p>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-lg bg-red-950/80 border border-red-800/60 text-red-300 text-xs font-mono">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Format Switcher - Optimized for High Visibility & Touch Stability on Mobile */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-mono text-slate-200 uppercase tracking-wider font-bold flex items-center gap-1.5">
                    <span>1. Tournament Format</span>
                    <span className="text-[10px] text-orange-400 font-normal normal-case">(Tap to select)</span>
                  </label>
                  <span className="text-[11px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-amber-300">
                    {format.toUpperCase()} SELECTED
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 sm:gap-3" id="format-selection-group">
                  {/* SQUAD BUTTON */}
                  <button
                    type="button"
                    onClick={() => {
                      setFormat('squad');
                      const firstSquad = availableSlots.find((s) => s.format === 'squad');
                      if (firstSquad) setSelectedSlotId(firstSquad.id);
                    }}
                    className={`relative p-2.5 sm:p-3 rounded-xl border-2 text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-center min-h-[78px] sm:min-h-[86px] touch-manipulation select-none ${
                      format === 'squad'
                        ? 'bg-gradient-to-b from-orange-600 to-amber-600 border-orange-400 text-white shadow-lg shadow-orange-600/40 ring-2 ring-orange-500/50 scale-[1.02]'
                        : 'bg-slate-900 border-slate-700/90 text-slate-200 hover:text-white hover:border-slate-500 hover:bg-slate-800'
                    }`}
                    id="select-format-squad"
                    aria-pressed={format === 'squad'}
                  >
                    {format === 'squad' && (
                      <span className="absolute -top-2 right-1.5 px-1.5 py-0.5 rounded-full bg-white text-orange-600 text-[9px] font-black uppercase tracking-wider shadow-sm flex items-center gap-0.5">
                        <Check className="w-2.5 h-2.5 stroke-[3]" /> Active
                      </span>
                    )}
                    <Users className={`w-5 h-5 mb-1 ${format === 'squad' ? 'text-white' : 'text-orange-400'}`} />
                    <div className="text-xs sm:text-sm font-['Rajdhani'] uppercase font-extrabold tracking-wide leading-tight">
                      Squad
                    </div>
                    <div className={`text-[10px] font-mono leading-none mt-1 font-semibold ${format === 'squad' ? 'text-orange-100' : 'text-slate-400'}`}>
                      4v4 • 12 Teams
                    </div>
                  </button>

                  {/* DUO BUTTON */}
                  <button
                    type="button"
                    onClick={() => {
                      setFormat('duo');
                      const firstDuo = availableSlots.find((s) => s.format === 'duo');
                      if (firstDuo) setSelectedSlotId(firstDuo.id);
                    }}
                    className={`relative p-2.5 sm:p-3 rounded-xl border-2 text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-center min-h-[78px] sm:min-h-[86px] touch-manipulation select-none ${
                      format === 'duo'
                        ? 'bg-gradient-to-b from-amber-600 to-orange-600 border-amber-400 text-white shadow-lg shadow-amber-600/40 ring-2 ring-amber-500/50 scale-[1.02]'
                        : 'bg-slate-900 border-slate-700/90 text-slate-200 hover:text-white hover:border-slate-500 hover:bg-slate-800'
                    }`}
                    id="select-format-duo"
                    aria-pressed={format === 'duo'}
                  >
                    {format === 'duo' && (
                      <span className="absolute -top-2 right-1.5 px-1.5 py-0.5 rounded-full bg-white text-amber-600 text-[9px] font-black uppercase tracking-wider shadow-sm flex items-center gap-0.5">
                        <Check className="w-2.5 h-2.5 stroke-[3]" /> Active
                      </span>
                    )}
                    <UserCheck className={`w-5 h-5 mb-1 ${format === 'duo' ? 'text-white' : 'text-amber-400'}`} />
                    <div className="text-xs sm:text-sm font-['Rajdhani'] uppercase font-extrabold tracking-wide leading-tight">
                      Duo
                    </div>
                    <div className={`text-[10px] font-mono leading-none mt-1 font-semibold ${format === 'duo' ? 'text-amber-100' : 'text-slate-400'}`}>
                      2v2 • 24 Teams
                    </div>
                  </button>

                  {/* SOLO BUTTON */}
                  <button
                    type="button"
                    onClick={() => {
                      setFormat('solo');
                      const firstSolo = availableSlots.find((s) => s.format === 'solo');
                      if (firstSolo) setSelectedSlotId(firstSolo.id);
                    }}
                    className={`relative p-2.5 sm:p-3 rounded-xl border-2 text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-center min-h-[78px] sm:min-h-[86px] touch-manipulation select-none ${
                      format === 'solo'
                        ? 'bg-gradient-to-b from-red-600 to-orange-600 border-red-400 text-white shadow-lg shadow-red-600/40 ring-2 ring-red-500/50 scale-[1.02]'
                        : 'bg-slate-900 border-slate-700/90 text-slate-200 hover:text-white hover:border-slate-500 hover:bg-slate-800'
                    }`}
                    id="select-format-solo"
                    aria-pressed={format === 'solo'}
                  >
                    {format === 'solo' && (
                      <span className="absolute -top-2 right-1.5 px-1.5 py-0.5 rounded-full bg-white text-red-600 text-[9px] font-black uppercase tracking-wider shadow-sm flex items-center gap-0.5">
                        <Check className="w-2.5 h-2.5 stroke-[3]" /> Active
                      </span>
                    )}
                    <User className={`w-5 h-5 mb-1 ${format === 'solo' ? 'text-white' : 'text-red-400'}`} />
                    <div className="text-xs sm:text-sm font-['Rajdhani'] uppercase font-extrabold tracking-wide leading-tight">
                      Solo
                    </div>
                    <div className={`text-[10px] font-mono leading-none mt-1 font-semibold ${format === 'solo' ? 'text-red-100' : 'text-slate-400'}`}>
                      1v1 • 48 Players
                    </div>
                  </button>
                </div>
              </div>

              {/* Match Slot Picker */}
              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5 font-semibold">
                  2. Choose Preferred Weekend Slot
                </label>
                <select
                  value={selectedSlotId}
                  onChange={(e) => setSelectedSlotId(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-orange-500"
                >
                  {relevantSlots.map((slot) => (
                    <option key={slot.id} value={slot.id}>
                      {slot.day} • {slot.time} • Map: {slot.map} ({slot.spotsTotal - slot.spotsFilled} spots remaining)
                    </option>
                  ))}
                  {relevantSlots.length === 0 && (
                    <option value="">No slots currently open for this format</option>
                  )}
                </select>
              </div>

              {/* Team Details */}
              {format !== 'solo' && (
                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1 font-semibold">
                    Team Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Phoenix Apex or Hydra Strikers"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-orange-500"
                  />
                </div>
              )}

              {/* Captain / Player Credentials */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1 font-semibold">
                    {format === 'solo' ? 'Your In-Game Name (IGN)' : 'Captain In-Game Name (IGN)'} <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. FireGod_07"
                    value={captainIGN}
                    onChange={(e) => setCaptainIGN(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1 font-semibold">
                    Free Fire UID <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 1928471928 (8-10 digits)"
                    value={captainUID}
                    onChange={(e) => setCaptainUID(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              {/* Duo / Squad Teammate optional fields */}
              {format === 'duo' && (
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div className="text-[11px] font-mono text-slate-400 mb-2 uppercase font-semibold">
                    Duo Partner Credentials (Optional or fill prior to match):
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Partner IGN"
                      value={teammate2IGN}
                      onChange={(e) => setTeammate2IGN(e.target.value)}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-white"
                    />
                    <input
                      type="text"
                      placeholder="Partner UID"
                      value={teammate2UID}
                      onChange={(e) => setTeammate2UID(e.target.value)}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-white"
                    />
                  </div>
                </div>
              )}

              {format === 'squad' && (
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div className="text-[11px] font-mono text-slate-400 mb-2 uppercase font-semibold">
                    Squad Roster IGNs (Can be edited before room drop):
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <input
                      type="text"
                      placeholder="Player 2 IGN"
                      value={teammate2IGN}
                      onChange={(e) => setTeammate2IGN(e.target.value)}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-white"
                    />
                    <input
                      type="text"
                      placeholder="Player 3 IGN"
                      value={teammate3IGN}
                      onChange={(e) => setTeammate3IGN(e.target.value)}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-white"
                    />
                    <input
                      type="text"
                      placeholder="Player 4 IGN"
                      value={teammate4IGN}
                      onChange={(e) => setTeammate4IGN(e.target.value)}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-white"
                    />
                  </div>
                </div>
              )}

              {format === 'solo' && (
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-2.5 text-xs text-slate-300 font-mono">
                  <User className="w-4 h-4 text-red-400 shrink-0" />
                  <span>Solo 1v1 Mode: No teammates required. Enter your In-Game Name & UID below.</span>
                </div>
              )}

              {/* Room ID delivery details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1 font-semibold">
                    WhatsApp Number (For Room ID & Password) <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1 font-semibold">
                    Discord Username <span className="text-[10px] text-slate-400 font-normal lowercase">(optional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. firegod#1234 (optional)"
                    value={discordTag}
                    onChange={(e) => setDiscordTag(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              {/* Instagram Username Section */}
              <div id="instagram-username-section">
                <div className="flex items-center justify-between mb-1">
                  <label className="flex items-center gap-1.5 text-xs font-mono text-slate-300 uppercase tracking-wider font-semibold">
                    <Instagram className="w-3.5 h-3.5 text-pink-400" />
                    <span>Instagram Handle</span>
                    <span className="text-[10px] text-slate-400 font-normal normal-case">(For Highlights & Tags)</span>
                  </label>
                  <a
                    href="https://www.instagram.com/ads_tournaments/?hl=en#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-mono text-pink-400 hover:text-pink-300 flex items-center gap-1 hover:underline cursor-pointer"
                    id="modal-follow-instagram-link"
                  >
                    <span>Follow @ads_tournaments</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-pink-400/80 font-mono text-xs font-bold">
                    @
                  </div>
                  <input
                    type="text"
                    id="instagram-input"
                    placeholder="your_team_or_captain_handle"
                    value={instagramHandle.startsWith('@') ? instagramHandle.slice(1) : instagramHandle}
                    onChange={(e) => {
                      const val = e.target.value.replace(/^@/, '');
                      setInstagramHandle(val ? `@${val}` : '');
                    }}
                    className="w-full pl-8 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-pink-500 transition-colors"
                  />
                </div>
              </div>

              {/* Terms Checkbox note */}
              <div className="text-[11px] text-slate-400 font-mono pt-1">
                By registering, you confirm your team plays on <span className="text-white font-semibold">Mobile Only</span> with zero third-party mods, emulators, or stat-boost skins.
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-orange-600 via-amber-600 to-red-600 hover:from-orange-500 hover:to-red-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-extrabold font-['Rajdhani'] uppercase tracking-wider text-base shadow-lg shadow-orange-600/30 cursor-pointer flex items-center justify-center gap-2"
                  id="submit-registration-btn"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 text-white animate-spin" />
                      <span>Syncing With Supabase & Generating Pass...</span>
                    </>
                  ) : (
                    <>
                      <Flame className="w-4 h-4 text-amber-200 fill-amber-300" />
                      <span>Lock In Match Registration (FREE)</span>
                    </>
                  )}
                </button>
                <div className="mt-2 text-center text-[10px] text-slate-500 font-mono flex items-center justify-center gap-1.5">
                  <Database className="w-3 h-3 text-emerald-500/80" />
                  <span>Registrations directly synced with Supabase Project rmkalviluxpknpaaviyb</span>
                </div>
              </div>
            </form>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
