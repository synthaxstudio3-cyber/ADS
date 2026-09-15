import { TournamentFormatDetail, MatchSlot, LeaderboardEntry } from '../types';

export const TOURNAMENT_FORMATS: TournamentFormatDetail[] = [
  {
    id: 'squad',
    title: 'Squad Clash Royale',
    subtitle: '4v4 Tactical Warfare',
    badge: 'POPULAR CHOICE',
    teamSize: '4 Players + 1 Sub',
    playerCount: '48 Players (12 Squads)',
    registrationCloses: '1 Hour before kickoff',
    description: 'The premier Free Fire battle royale format. Coordinate callouts, zone rotations, and gloo wall rushes to capture the Booyah with your full squad.',
    highlights: [
      'Official competitive point system',
      'Full 12-Squad lobby format',
      'Scout streams with live shoutcasters',
      'Tier-1 team invites for top 3 squads'
    ],
    prizeShare: '60% of Weekend Pool',
    iconName: 'Users',
    recommendedFor: 'Established squads & team coordination'
  },
  {
    id: 'duo',
    title: 'Dynamic Duos',
    subtitle: 'High-Synergy Pair Battles',
    badge: 'TACTICAL DUEL',
    teamSize: '2 Players',
    playerCount: '48 Players (24 Duos)',
    registrationCloses: '2 Hours before kickoff',
    description: 'Fast-paced two-player combat where micro-synergy and crossfire setups matter. One cover-fire specialist and one aggressive rusher can dominate the lobby.',
    highlights: [
      '24 Duos per lobby intense chaos',
      'High-kill bounty multiplier',
      'Dedicated MVP fragger recognition',
      'Fast-track verification into Semi-Pro Duos'
    ],
    prizeShare: '25% of Weekend Pool',
    iconName: 'UserCheck',
    recommendedFor: 'Best duos & aggressive dynamic duos'
  },
  {
    id: 'solo',
    title: 'Lone Wolf Survival',
    subtitle: 'Pure Mechanical Skill',
    badge: 'HARDEST CHALLENGE',
    teamSize: '1 Player',
    playerCount: '48 Players (Free for All)',
    registrationCloses: '2 Hours before kickoff',
    description: 'No revives, no teammates to blame. Test your raw 1v1 gunfights, reflex gloo wall placement, and survival instincts against 47 other hungry grassroots fraggers.',
    highlights: [
      '48-player solo lobby bloodbath',
      'Direct 1v1 headshot bonus pool',
      'Grassroots MVP Scout contract alert',
      'Pure individual skill showcase'
    ],
    prizeShare: '15% of Weekend Pool',
    iconName: 'User',
    recommendedFor: 'Solo clutch gods & pure mechanical fraggers'
  }
];

export const INITIAL_MATCH_SLOTS: MatchSlot[] = [
  {
    id: 'sat-slot-1',
    day: 'Saturday',
    dateStr: 'Sat, Sep 26, 2026',
    time: '03:00 PM IST',
    map: 'Bermuda',
    format: 'squad',
    prizePool: '₹20,000 + Trophies',
    spotsTotal: 12,
    spotsFilled: 9,
    status: 'Filling Fast',
    roomDropTime: '02:45 PM (Instagram & WhatsApp)'
  },
  {
    id: 'sat-slot-2',
    day: 'Saturday',
    dateStr: 'Sat, Sep 26, 2026',
    time: '06:00 PM IST',
    map: 'Purgatory',
    format: 'duo',
    prizePool: '₹12,000 Cash Pool',
    spotsTotal: 24,
    spotsFilled: 18,
    status: 'Filling Fast',
    roomDropTime: '05:45 PM (Instagram & WhatsApp)'
  },
  {
    id: 'sat-slot-3',
    day: 'Saturday',
    dateStr: 'Sat, Sep 26, 2026',
    time: '08:30 PM IST',
    map: 'Kalahari',
    format: 'solo',
    prizePool: '₹8,000 + MVP Bounty',
    spotsTotal: 48,
    spotsFilled: 36,
    status: 'Registering',
    roomDropTime: '08:15 PM (Instagram & WhatsApp)'
  },
  {
    id: 'sun-slot-1',
    day: 'Sunday',
    dateStr: 'Sun, Sep 27, 2026',
    time: '02:30 PM IST',
    map: 'Bermuda',
    format: 'duo',
    prizePool: '₹12,000 Cash Pool',
    spotsTotal: 24,
    spotsFilled: 14,
    status: 'Registering',
    roomDropTime: '02:15 PM (Instagram & WhatsApp)'
  },
  {
    id: 'sun-slot-2',
    day: 'Sunday',
    dateStr: 'Sun, Sep 27, 2026',
    time: '05:30 PM IST',
    map: 'Purgatory',
    format: 'squad',
    prizePool: '₹25,000 Weekend Grand Final',
    spotsTotal: 12,
    spotsFilled: 11,
    status: 'Filling Fast',
    roomDropTime: '05:15 PM (Instagram & WhatsApp)'
  },
  {
    id: 'sun-slot-3',
    day: 'Sunday',
    dateStr: 'Sun, Sep 27, 2026',
    time: '08:30 PM IST',
    map: 'Kalahari',
    format: 'solo',
    prizePool: '₹10,000 Night Showdown',
    spotsTotal: 48,
    spotsFilled: 29,
    status: 'Registering',
    roomDropTime: '08:15 PM (Instagram & WhatsApp)'
  }
];

export const MAP_ROTATIONS = [
  {
    name: 'Bermuda',
    type: 'Classic Battleground',
    theme: 'Urban & Industrial Warfare',
    hotspots: ['Clock Tower', 'Peak', 'Pochinok', 'Factory'],
    description: 'The iconic proving grounds with vertical clocktower snipes and chaotic factory rooftop gunfights. High rotation density.',
    tag: 'STRATEGY HEAVY'
  },
  {
    name: 'Purgatory',
    type: 'Mountain & Valleys',
    theme: 'Zipline Rush & High Ground',
    hotspots: ['Brasilia', 'Central', 'Ski Lodge', 'Fields'],
    description: 'Extreme elevation differentials across deep rivers and bridges. Requires tactical zipline timing and long-range DMR dominance.',
    tag: 'ELEVATION PLAY'
  },
  {
    name: 'Kalahari',
    type: 'Desert Badlands',
    theme: 'Gloo Wall Speed & CQC',
    hotspots: ['Refinery', 'Command Post', 'Foundation', 'Shrine'],
    description: 'Dense desert plateaus and the massive Refinery structure where close-quarters shotgun reflexes and fast gloo walls rule.',
    tag: 'FAST PACED'
  }
];

export const SCOUTING_STAGES = [
  {
    step: '01',
    title: 'Weekend Grassroots Open',
    desc: 'Jump into free Saturday & Sunday lobbies. Every kill, placement, and clutch moment is tracked in our live scouting database.',
    badge: 'OPEN ENTRY'
  },
  {
    step: '02',
    title: 'Scout Review & Performance Metrics',
    desc: 'Our automated analytics track KD ratio, headshot percentage, zone survival, and damage output to flag elite performers.',
    badge: 'ANALYTICS ENGINE'
  },
  {
    step: '03',
    title: 'Verified Scrims & Casted Showdowns',
    desc: 'Top 10% grassroots talents receive direct invites to official weekly casted scrims watched by certified esports scouts.',
    badge: 'LIVE BROADCAST'
  },
  {
    step: '04',
    title: 'Pro Org Trials & Sponsorships',
    desc: 'Top talent gets matched with Tier-1 and Tier-2 esports organizations for paid roster trials, gaming gear, and contracts.',
    badge: 'PRO CONTRACT'
  }
];

export const INITIAL_LEADERBOARD: LeaderboardEntry[] = [
  {
    rank: 1,
    teamName: 'Inferno Apex',
    tag: 'INFX',
    captainIGN: 'INFX_Blaze99',
    format: 'squad',
    matchesPlayed: 14,
    kills: 88,
    booyahs: 6,
    totalPoints: 160,
    scoutStatus: 'Scouted Pro',
    winRate: '42.8%'
  },
  {
    rank: 2,
    teamName: 'Bermuda Snipers',
    tag: 'BRMD',
    captainIGN: 'SilentGhost_FF',
    format: 'squad',
    matchesPlayed: 14,
    kills: 76,
    booyahs: 5,
    totalPoints: 136,
    scoutStatus: 'Verified Talent',
    winRate: '35.7%'
  },
  {
    rank: 3,
    teamName: 'Total Dominance',
    tag: 'TDOM',
    captainIGN: 'TDOM_Viper',
    format: 'squad',
    matchesPlayed: 12,
    kills: 69,
    booyahs: 4,
    totalPoints: 117,
    scoutStatus: 'Verified Talent',
    winRate: '33.3%'
  },
  {
    rank: 4,
    teamName: 'Desert Wolves Duo',
    tag: 'DWLV',
    captainIGN: 'Wolfie_Sniper',
    format: 'duo',
    matchesPlayed: 16,
    kills: 62,
    booyahs: 4,
    totalPoints: 110,
    scoutStatus: 'Rising Star',
    winRate: '25.0%'
  },
  {
    rank: 5,
    teamName: 'Phoenix Clutches',
    tag: 'PHNX',
    captainIGN: 'PHNX_Demon',
    format: 'squad',
    matchesPlayed: 12,
    kills: 58,
    booyahs: 3,
    totalPoints: 94,
    scoutStatus: 'Rising Star',
    winRate: '25.0%'
  },
  {
    rank: 6,
    teamName: 'Kalahari Kings',
    tag: 'KLHR',
    captainIGN: 'GlooGod_Aman',
    format: 'solo',
    matchesPlayed: 10,
    kills: 44,
    booyahs: 3,
    totalPoints: 80,
    scoutStatus: 'Rising Star',
    winRate: '30.0%'
  },
  {
    rank: 7,
    teamName: 'Red Zone Strikers',
    tag: 'RZS',
    captainIGN: 'RZS_Striker',
    format: 'duo',
    matchesPlayed: 11,
    kills: 41,
    booyahs: 2,
    totalPoints: 65,
    scoutStatus: 'Rising Star',
    winRate: '18.2%'
  }
];

export const TOURNAMENT_RULES = [
  'Mobile devices only (strict zero tolerance for PC Emulators / Bluestacks).',
  'Gun skins with stat boosts are strictly DISABLED to ensure competitive balance.',
  'Characters with banned passives according to global FFWS regulations are restricted.',
  'Room ID and Password are distributed 15 minutes before match start via Instagram & WhatsApp.',
  'Minimum Free Fire account level requirement: Level 35+ with rank history.',
  'All participants must submit in-match post-game screenshots for point verification.',
  'Anti-cheat detection or third-party config injection results in an instant permanent ban.'
];
