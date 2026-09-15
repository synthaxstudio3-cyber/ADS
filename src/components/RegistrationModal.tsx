import { useState, type FormEvent } from 'react';
import { X, Flame, CheckCircle, Trophy, Shield, Copy, Check, Users, User, UserCheck } from 'lucide-react';
import { TournamentFormat, MatchSlot, PlayerRegistration } from '../types';

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

  if (!isOpen) return null;

  const relevantSlots = availableSlots.filter((slot) => slot.format === format);

  const handleSubmit = (e: FormEvent) => {
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

    setConfirmedPass(newRegistration);
    onSuccessfulRegistration(newRegistration);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#111722] to-[#0a0d14] rounded-2xl border border-orange-500/30 shadow-2xl shadow-black/80 p-6 sm:p-8 my-8 text-left">
        {/* Close Button */}
        <button
          onClick={handleResetModal}
          className="absolute top-5 right-5 p-2 rounded-lg bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700 transition-colors"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {confirmedPass ? (
          /* SUCCESS COMPETITOR PASS VIEW */
          <div className="text-center py-4">
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
              Your registration is locked in for the upcoming weekend bracket. Room ID and password will be sent to your WhatsApp & Discord 15 minutes before match drop.
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

              <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-emerald-400" />
                  Anti-Cheat Verified Spot
                </span>
                <span className="text-orange-400">Entry: FREE</span>
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
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 hover:text-white font-bold font-['Rajdhani'] uppercase tracking-wider text-sm"
              >
                Join Discord Room ID Channel
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
              {/* Format Switcher */}
              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5 font-semibold">
                  1. Select Tournament Format
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setFormat('squad');
                      const firstSquad = availableSlots.find((s) => s.format === 'squad');
                      if (firstSquad) setSelectedSlotId(firstSquad.id);
                    }}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      format === 'squad'
                        ? 'bg-orange-500/20 border-orange-500 text-white font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Users className="w-5 h-5 mx-auto mb-1 text-orange-400" />
                    <div className="text-xs font-['Rajdhani'] uppercase font-bold">Squad (4v4)</div>
                    <div className="text-[10px] text-slate-400">12 Teams</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setFormat('duo');
                      const firstDuo = availableSlots.find((s) => s.format === 'duo');
                      if (firstDuo) setSelectedSlotId(firstDuo.id);
                    }}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      format === 'duo'
                        ? 'bg-orange-500/20 border-orange-500 text-white font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <UserCheck className="w-5 h-5 mx-auto mb-1 text-amber-400" />
                    <div className="text-xs font-['Rajdhani'] uppercase font-bold">Duo (2v2)</div>
                    <div className="text-[10px] text-slate-400">24 Teams</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setFormat('solo');
                      const firstSolo = availableSlots.find((s) => s.format === 'solo');
                      if (firstSolo) setSelectedSlotId(firstSolo.id);
                    }}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      format === 'solo'
                        ? 'bg-orange-500/20 border-orange-500 text-white font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <User className="w-5 h-5 mx-auto mb-1 text-red-400" />
                    <div className="text-xs font-['Rajdhani'] uppercase font-bold">Solo (1v1)</div>
                    <div className="text-[10px] text-slate-400">48 Players</div>
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
                    Discord Username
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. firegod#1234 or @firegod"
                    value={discordTag}
                    onChange={(e) => setDiscordTag(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-orange-500"
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
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-orange-600 via-amber-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-extrabold font-['Rajdhani'] uppercase tracking-wider text-base shadow-lg shadow-orange-600/30 cursor-pointer flex items-center justify-center gap-2"
                  id="submit-registration-btn"
                >
                  <Flame className="w-4 h-4 text-amber-200 fill-amber-300" />
                  <span>Lock In Match Registration (FREE)</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
