export type TournamentFormat = 'squad' | 'duo' | 'solo';

export interface TournamentFormatDetail {
  id: TournamentFormat;
  title: string;
  subtitle: string;
  badge: string;
  teamSize: string;
  playerCount: string;
  registrationCloses: string;
  description: string;
  highlights: string[];
  prizeShare: string;
  iconName: 'Users' | 'UserCheck' | 'User';
  recommendedFor: string;
}

export interface MatchSlot {
  id: string;
  day: 'Saturday' | 'Sunday';
  dateStr: string;
  time: string;
  map: 'Bermuda' | 'Purgatory' | 'Kalahari';
  format: TournamentFormat;
  prizePool: string;
  spotsTotal: number;
  spotsFilled: number;
  status: 'Registering' | 'Filling Fast' | 'Full' | 'Live';
  roomDropTime: string;
}

export interface LeaderboardEntry {
  rank: number;
  teamName: string;
  tag: string;
  captainIGN: string;
  format: TournamentFormat;
  matchesPlayed: number;
  kills: number;
  booyahs: number;
  totalPoints: number;
  scoutStatus: 'Scouted Pro' | 'Verified Talent' | 'Rising Star';
  winRate: string;
}

export interface PlayerRegistration {
  id: string;
  format: TournamentFormat;
  teamName: string;
  captainName: string;
  captainIGN: string;
  captainUID: string;
  teammates?: { ign: string; uid: string }[];
  whatsappNumber: string;
  discordTag: string;
  slotId: string;
  map: string;
  registeredAt: string;
  ticketId: string;
}
