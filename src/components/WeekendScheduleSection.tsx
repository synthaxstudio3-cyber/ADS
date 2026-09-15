import { useState } from 'react';
import { Calendar, Clock, MapPin, Trophy, Shield, Flame, Compass, ChevronRight, Check } from 'lucide-react';
import { INITIAL_MATCH_SLOTS, MAP_ROTATIONS } from '../data/tournamentData';
import { MatchSlot, TournamentFormat } from '../types';

interface WeekendScheduleSectionProps {
  onRegisterSlot: (slot: MatchSlot) => void;
  slots: MatchSlot[];
}

export function WeekendScheduleSection({ onRegisterSlot, slots }: WeekendScheduleSectionProps) {
  const [selectedDayFilter, setSelectedDayFilter] = useState<'All' | 'Saturday' | 'Sunday'>('All');
  const [selectedMapFilter, setSelectedMapFilter] = useState<'All' | 'Bermuda' | 'Purgatory' | 'Kalahari'>('All');
  const [activeMapTab, setActiveMapTab] = useState<'Bermuda' | 'Purgatory' | 'Kalahari'>('Bermuda');

  const filteredSlots = slots.filter((slot) => {
    const dayMatches = selectedDayFilter === 'All' || slot.day === selectedDayFilter;
    const mapMatches = selectedMapFilter === 'All' || slot.map === selectedMapFilter;
    return dayMatches && mapMatches;
  });

  const getMapBadgeColor = (map: string) => {
    switch (map) {
      case 'Bermuda':
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-700/50';
      case 'Purgatory':
        return 'bg-sky-950/80 text-sky-300 border-sky-700/50';
      case 'Kalahari':
        return 'bg-amber-950/80 text-amber-300 border-amber-700/50';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  const getFormatBadge = (format: TournamentFormat) => {
    switch (format) {
      case 'squad':
        return { label: 'SQUAD (4v4)', color: 'bg-orange-500/20 text-orange-400 border-orange-500/40' };
      case 'duo':
        return { label: 'DUO (2v2)', color: 'bg-amber-500/20 text-amber-400 border-amber-500/40' };
      case 'solo':
        return { label: 'SOLO (1v1)', color: 'bg-red-500/20 text-red-400 border-red-500/40' };
    }
  };

  return (
    <section id="schedule" className="py-20 bg-[#090c12] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-slate-800/80 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/60 border border-red-500/30 text-xs font-mono font-bold text-red-400 uppercase tracking-widest mb-3">
              <Calendar className="w-3.5 h-3.5" />
              Weekend Schedule
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-['Rajdhani'] uppercase tracking-tight text-white">
              Every <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">Saturday & Sunday</span>
            </h2>
            <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-xl">
              Competitive scrim slots scheduled every weekend with structured map rotations and live broadcast scrims.
            </p>
          </div>

          {/* Filter Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
              {(['All', 'Saturday', 'Sunday'] as const).map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDayFilter(day)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold font-['Rajdhani'] uppercase tracking-wider transition-colors cursor-pointer ${
                    selectedDayFilter === day
                      ? 'bg-orange-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  id={`filter-day-${day.toLowerCase()}`}
                >
                  {day === 'All' ? 'All Days' : day}
                </button>
              ))}
            </div>

            <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
              {(['All', 'Bermuda', 'Purgatory', 'Kalahari'] as const).map((map) => (
                <button
                  key={map}
                  onClick={() => setSelectedMapFilter(map)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold font-['Rajdhani'] uppercase tracking-wider transition-colors cursor-pointer ${
                    selectedMapFilter === map
                      ? 'bg-slate-700 text-amber-300'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  id={`filter-map-${map.toLowerCase()}`}
                >
                  {map}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Schedule Slots Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredSlots.map((slot) => {
            const formatBadge = getFormatBadge(slot.format);
            const spotsLeft = slot.spotsTotal - slot.spotsFilled;
            const progressPercent = Math.min(100, Math.round((slot.spotsFilled / slot.spotsTotal) * 100));

            return (
              <div
                key={slot.id}
                className="rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#0e131c] border border-slate-800 hover:border-orange-500/50 p-6 flex flex-col justify-between transition-all duration-200 group hover:shadow-xl hover:shadow-orange-950/20"
                id={`slot-card-${slot.id}`}
              >
                <div>
                  {/* Top Bar: Day & Status */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800">
                      {slot.dateStr}
                    </span>
                  </div>

                  {/* Slot Title & Format */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <div className="flex items-center gap-2 text-white font-extrabold text-2xl font-['Rajdhani']">
                        <Clock className="w-5 h-5 text-orange-400 shrink-0" />
                        <span>{slot.time}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${formatBadge.color}`}>
                          {formatBadge.label}
                        </span>
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${getMapBadgeColor(slot.map)}`}>
                          <MapPin className="w-3 h-3 inline mr-1" />
                          {slot.map}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Prize pool teaser */}
                  <div className="mt-4 p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-amber-400 shrink-0" />
                      <span className="text-xs font-mono text-slate-400">Prize Pool:</span>
                    </div>
                    <span className="text-sm font-bold text-amber-300 font-['Rajdhani']">
                      {slot.prizePool}
                    </span>
                  </div>

                  {/* Spots Gauge */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                      <span className="text-slate-400">Lobby Slots:</span>
                      <span className="text-slate-200 font-bold">
                        {slot.spotsFilled} / {slot.spotsTotal} filled ({spotsLeft} spots left)
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
                      <div
                        className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-500"
                        style={{ width: `${progressPercent}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Room ID notice */}
                  <div className="mt-3 text-[11px] text-slate-400 font-mono flex items-center gap-1.5">
                    <Shield className="w-3 h-3 text-orange-400 shrink-0" />
                    <span>Room ID: {slot.roomDropTime}</span>
                  </div>
                </div>

                {/* Card Action */}
                <div className="mt-6 pt-4 border-t border-slate-800/80">
                  <button
                    onClick={() => onRegisterSlot(slot)}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-bold font-['Rajdhani'] text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-orange-950/40 cursor-pointer group-hover:scale-[1.01] transition-transform"
                    id={`book-slot-btn-${slot.id}`}
                  >
                    <span>Book This Slot</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tactical Map Rotations Breakdown */}
        <div className="rounded-2xl bg-gradient-to-b from-slate-900 to-[#0e121a] border border-orange-500/20 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-orange-400 uppercase tracking-widest mb-1">
                <Compass className="w-4 h-4" />
                Featured Competitive Maps
              </div>
              <h3 className="text-2xl font-bold font-['Rajdhani'] uppercase tracking-wide text-white">
                Map Rotations: Bermuda, Purgatory & Kalahari
              </h3>
            </div>

            {/* Map tab switcher */}
            <div className="flex p-1 rounded-xl bg-slate-950 border border-slate-800">
              {(['Bermuda', 'Purgatory', 'Kalahari'] as const).map((mapName) => (
                <button
                  key={mapName}
                  onClick={() => setActiveMapTab(mapName)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold font-['Rajdhani'] uppercase tracking-wider transition-all cursor-pointer ${
                    activeMapTab === mapName
                      ? 'bg-orange-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  id={`map-tab-${mapName.toLowerCase()}`}
                >
                  {mapName}
                </button>
              ))}
            </div>
          </div>

          {/* Active Map Detail Card */}
          {MAP_ROTATIONS.map((map) => {
            if (map.name !== activeMapTab) return null;
            return (
              <div key={map.name} className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl sm:text-3xl font-extrabold font-['Rajdhani'] uppercase text-white">
                      {map.name}
                    </span>
                  </div>

                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    {map.description}
                  </p>

                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 font-semibold">
                      Crucial Hot Drop Zones:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {map.hotspots.map((spot) => (
                        <span
                          key={spot}
                          className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-amber-300 flex items-center gap-1.5"
                        >
                          <MapPin className="w-3 h-3 text-orange-500" />
                          {spot}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-slate-950/90 border border-slate-800 space-y-3">
                  <div className="text-xs font-mono uppercase text-orange-400 font-bold">
                    Tactical Rotation Tip:
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Safe-zone edge play is favored in our grassroots scoring system. Securing high ground with sniper support before the 4th zone collapse averages 3.2x higher Booyah rate.
                  </p>
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>Lobby Drop Interval:</span>
                    <span className="text-white font-bold">Every 2.5 Hours</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
