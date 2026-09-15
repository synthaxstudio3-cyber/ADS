import { useState } from 'react';
import { Trophy, Medal, Flame, Search, Filter, Star, Crown } from 'lucide-react';
import { INITIAL_LEADERBOARD } from '../data/tournamentData';
import { TournamentFormat, LeaderboardEntry } from '../types';

export function LeaderboardSection() {
  const [selectedFormat, setSelectedFormat] = useState<'all' | TournamentFormat>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEntries = INITIAL_LEADERBOARD.filter((entry) => {
    const matchesFormat = selectedFormat === 'all' || entry.format === selectedFormat;
    const matchesSearch =
      entry.teamName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.captainIGN.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.tag.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFormat && matchesSearch;
  });

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return (
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/50 font-extrabold font-['Rajdhani'] text-lg">
            <Crown className="w-5 h-5 text-amber-400" />
          </div>
        );
      case 2:
        return (
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-400/20 text-slate-300 border border-slate-400/50 font-extrabold font-['Rajdhani'] text-lg">
            <Medal className="w-5 h-5 text-slate-300" />
          </div>
        );
      case 3:
        return (
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-700/20 text-amber-600 border border-amber-700/50 font-extrabold font-['Rajdhani'] text-lg">
            <Medal className="w-5 h-5 text-amber-600" />
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-900 text-slate-400 border border-slate-800 font-extrabold font-['Rajdhani'] text-sm">
            #{rank}
          </div>
        );
    }
  };

  const getScoutBadge = (status: LeaderboardEntry['scoutStatus']) => {
    switch (status) {
      case 'Scouted Pro':
        return 'bg-emerald-950/80 text-emerald-400 border-emerald-700/40';
      case 'Verified Talent':
        return 'bg-orange-950/80 text-orange-400 border-orange-700/40';
      case 'Rising Star':
        return 'bg-indigo-950/80 text-indigo-400 border-indigo-700/40';
    }
  };

  return (
    <section id="leaderboard" className="py-20 bg-[#090c12] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-slate-800/80 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-950/60 border border-orange-500/30 text-xs font-mono font-bold text-orange-400 uppercase tracking-widest mb-3">
              <Trophy className="w-3.5 h-3.5" />
              Grassroots Standings
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-['Rajdhani'] uppercase tracking-tight text-white">
              Weekend <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">Power Rankings</span>
            </h2>
            <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-xl">
              Real-time point tracker based on official competitive scoring: 1 Kill = 1 Point, Booyah = 12 Points.
            </p>
          </div>

          {/* Filters & Search */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search Team or IGN..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-56 pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-orange-500 font-mono"
              />
            </div>

            <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
              {(['all', 'squad', 'duo', 'solo'] as const).map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setSelectedFormat(fmt)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold font-['Rajdhani'] uppercase tracking-wider transition-colors cursor-pointer ${
                    selectedFormat === fmt
                      ? 'bg-orange-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  id={`leaderboard-tab-${fmt}`}
                >
                  {fmt}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Leaderboard Table / Card List */}
        <div className="rounded-2xl bg-gradient-to-b from-slate-900 to-[#0e121a] border border-slate-800 overflow-hidden shadow-xl shadow-black/40">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-950/80 border-b border-slate-800 text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                  <th className="py-3.5 px-4 font-semibold">Rank</th>
                  <th className="py-3.5 px-4 font-semibold">Team & Captain</th>
                  <th className="py-3.5 px-4 font-semibold">Format</th>
                  <th className="py-3.5 px-4 font-semibold text-center">Matches</th>
                  <th className="py-3.5 px-4 font-semibold text-center">Kills</th>
                  <th className="py-3.5 px-4 font-semibold text-center">Booyahs</th>
                  <th className="py-3.5 px-4 font-semibold text-center">Win Rate</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Points</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Scout Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs sm:text-sm font-mono">
                {filteredEntries.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="py-8 text-center text-slate-400 text-xs font-mono">
                      No teams found matching search criteria.
                    </td>
                  </tr>
                ) : (
                  filteredEntries.map((entry) => (
                    <tr
                      key={entry.teamName}
                      className="hover:bg-orange-500/5 transition-colors group"
                    >
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          {getRankBadge(entry.rank)}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-white font-['Rajdhani'] text-base group-hover:text-orange-400 transition-colors">
                            {entry.teamName}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                            [{entry.tag}]
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          Captain: <span className="text-slate-300 font-semibold">{entry.captainIGN}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="uppercase text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800/80 text-amber-300 border border-slate-700">
                          {entry.format}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center text-slate-300">
                        {entry.matchesPlayed}
                      </td>
                      <td className="py-3.5 px-4 text-center font-bold text-orange-400">
                        {entry.kills}
                      </td>
                      <td className="py-3.5 px-4 text-center font-bold text-amber-400">
                        {entry.booyahs} 👑
                      </td>
                      <td className="py-3.5 px-4 text-center text-slate-400">
                        {entry.winRate}
                      </td>
                      <td className="py-3.5 px-4 text-right font-extrabold text-lg text-white font-['Rajdhani']">
                        {entry.totalPoints} PTS
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${getScoutBadge(entry.scoutStatus)}`}>
                          {entry.scoutStatus}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer info */}
          <div className="p-4 bg-slate-950/60 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
            <div>
              <span className="text-orange-400 font-bold">Scoring formula:</span> Rank 1 = 12 pts, Rank 2 = 9 pts, Rank 3 = 8 pts, Rank 4 = 7 pts ... Rank 10 = 1 pt. 1 Kill = 1 pt.
            </div>
            <div className="font-mono text-slate-500">
              Updated Live after each match
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
