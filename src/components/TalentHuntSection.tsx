import { Zap, CheckCircle2, ArrowRight } from 'lucide-react';
import { SCOUTING_STAGES } from '../data/tournamentData';

interface TalentHuntSectionProps {
  onRegisterClick: () => void;
}

export function TalentHuntSection({ onRegisterClick }: TalentHuntSectionProps) {
  const scoutCriteria = [
    { title: 'Mechanical Headshot %', metric: '>35% Headshot Rate', desc: 'Precision sniper and AR drag headshots in high-pressure 1v1s.' },
    { title: 'Gloo Wall Speed & CQC', metric: '<0.3s Placement', desc: 'Instant defensive wall placement while rushing or taking crossfire.' },
    { title: 'Tactical Zone Rotation', metric: 'Late-Zone Survival', desc: 'Map movement without unnecessary vehicle noise and smart edge play.' },
    { title: 'Clutch & Frag Consistency', metric: '3.5+ Tournament KD', desc: 'Converting 1v3 or 1v2 disadvantaged scenarios into team revives or Booyahs.' },
  ];

  const scoutedAthletes = [
    { name: 'Kunal "ApexViper"', prevTeam: 'Grassroots Solo', currentOrg: 'Entity Academy', quote: 'ADS was the first tournament that streamed our gameplay to verified scouts. Got signed within 3 weeks.' },
    { name: 'Aakash "GhostShot"', prevTeam: 'Bermuda Snipers Duo', currentOrg: 'Reckoning Esports', quote: 'Playing every weekend sharpened our squad comms. The prize money was instantly paid via UPI.' },
    { name: 'Tanmay "DemonClutch"', prevTeam: 'Inferno Squad', currentOrg: 'Total Dominance Pro', quote: 'No pay-to-win gun skins, pure skill. If you are good, you will be noticed here.' },
  ];

  return (
    <section id="talenthunt" className="py-20 bg-[#0c1017] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold font-['Rajdhani'] uppercase tracking-tight text-white">
            Why Join Us: <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">Grassroots To Pro</span>
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            Most tournaments cater only to established tier-1 invitees. ADS was built specifically to uncover underground mobile talent from every corner and connect them with verified esports organizations.
          </p>
        </div>

        {/* 4-Stage Scouting Pathway */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {SCOUTING_STAGES.map((stage) => (
            <div
              key={stage.step}
              className="rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 hover:border-orange-500/50 p-6 flex flex-col justify-between relative group hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-black/40"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-extrabold font-['Rajdhani'] text-orange-500/40 group-hover:text-orange-400 transition-colors">
                    {stage.step}
                  </span>
                </div>

                <h3 className="text-xl font-bold font-['Rajdhani'] text-white uppercase tracking-wide mb-2 group-hover:text-amber-300 transition-colors">
                  {stage.title}
                </h3>

                <p className="text-slate-300 text-xs leading-relaxed">
                  {stage.desc}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-800/60 flex items-center text-xs font-mono text-orange-400 group-hover:text-orange-300">
                <span>Phase {stage.step} Progress</span>
                <ArrowRight className="w-3.5 h-3.5 ml-auto group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* What Scouts Look For & Verified Scouting Metric Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-3xl font-extrabold font-['Rajdhani'] text-white uppercase tracking-wide">
              What Tier-1 Scouts Evaluate In Your VODs
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Every tournament match is recorded and fed into our performance radar. Rather than just raw placements, scouts look for decisive gunskill and game sense.
            </p>
            <div className="pt-2">
              <button
                onClick={onRegisterClick}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-bold font-['Rajdhani'] uppercase tracking-wider text-sm shadow-lg shadow-orange-600/30 flex items-center gap-2 cursor-pointer"
                id="talent-hunt-register-cta"
              >
                <Zap className="w-4 h-4 text-amber-300" />
                <span>Showcase Your Skills This Weekend</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {scoutCriteria.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-amber-400">{item.metric}</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <h4 className="text-base font-bold font-['Rajdhani'] text-white uppercase mb-1">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Grassroots Success Stories */}
        <div>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold font-['Rajdhani'] uppercase tracking-wide text-white">
              Discovered Through <span className="text-orange-400">ADS Scrims</span>
            </h3>
            <p className="text-xs font-mono text-slate-400 mt-1 uppercase">
              Real players who advanced from weekend free lobbies to signed roster spots
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {scoutedAthletes.map((athlete, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-[#0e131c] border border-slate-800 flex flex-col justify-between"
              >
                <p className="text-slate-300 text-xs italic leading-relaxed mb-4">
                  "{athlete.quote}"
                </p>
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-white font-['Rajdhani'] uppercase">
                      {athlete.name}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      {athlete.prevTeam}
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-700/40 text-[10px] font-mono font-bold">
                    {athlete.currentOrg}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
