"use client";

import { useState } from "react";
import { ToastProvider, useToast } from "@/components/ui/Toast";
import Link from "next/link";

const ZONES = [
  { id: "tours", label: "📍 Tours Centre" },
  { id: "marais", label: "🗼 Le Marais" },
  { id: "oberkampf", label: "🎸 Oberkampf" },
  { id: "bastille", label: "🔥 Bastille" },
];

const VIBES = [
  { id: "detente", icon: "🍷", label: "Detendu", sub: "Chill & talk" },
  { id: "festif", icon: "🎉", label: "On se lache", sub: "Full energy" },
  { id: "cocktail", icon: "🍸", label: "Cocktails", sub: "Classy vibes" },
  { id: "live", icon: "🎵", label: "Live music", sub: "Son a fond" },
];

const SCORES = [
  { id: "70", label: "≥ 70 OK" },
  { id: "80", label: "≥ 80 ✓" },
  { id: "90", label: "≥ 90 🔒" },
];

const ITINERARIES: Record<string, Array<{ name: string; score: number; type: string; time: string }>> = {
  tours: [
    { name: "Le Vieux Murier", score: 82, type: "Bar", time: "20h00" },
    { name: "La Guinguette", score: 85, type: "Bar concert", time: "22h00" },
    { name: "Bar du Centre", score: 78, type: "Bar brasserie", time: "00h00" },
  ],
  marais: [
    { name: "Le Marais Social Club", score: 91, type: "Bar cocktails", time: "20h30" },
    { name: "Bar Republique", score: 88, type: "Brasserie", time: "22h30" },
    { name: "Le Marais Social Club", score: 91, type: "Bar cocktails", time: "00h30" },
  ],
  oberkampf: [
    { name: "Cafe Oberkampf", score: 74, type: "Bar concert", time: "21h00" },
    { name: "Bar Republique", score: 88, type: "Brasserie", time: "23h00" },
    { name: "Le Marais Social Club", score: 91, type: "Bar cocktails", time: "01h00" },
  ],
  bastille: [
    { name: "La Scene Bastille", score: 71, type: "Bar PMU", time: "20h00" },
    { name: "Bar Republique", score: 88, type: "Brasserie", time: "22h00" },
    { name: "Le Marais Social Club", score: 91, type: "Bar cocktails", time: "00h00" },
  ],
};

function SoireeContent() {
  const [zone, setZone] = useState("tours");
  const [vibe, setVibe] = useState("detente");
  const [minScore, setMinScore] = useState("80");
  const [showResults, setShowResults] = useState(false);
  const { showToast } = useToast();

  const itinerary = ITINERARIES[zone] || ITINERARIES.tours;
  const avgScore = Math.round(itinerary.reduce((sum, s) => sum + s.score, 0) / itinerary.length);

  const generateItinerary = () => {
    setShowResults(true);
    showToast("✨ Soiree generee !");
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: "linear-gradient(160deg,#12002A 0%,#1A0038 35%,#0D001F 65%,#1C0035 100%)" }}>
      {/* Decorative halos */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[5%] left-[10%] w-[200px] h-[200px] rounded-full bg-[radial-gradient(circle,rgba(160,40,255,0.22),transparent_70%)]" />
        <div className="absolute top-[38%] -right-[30px] w-[140px] h-[140px] rounded-full bg-[radial-gradient(circle,rgba(255,60,180,0.15),transparent_70%)]" />
        <div className="absolute bottom-[20%] left-[15%] w-[100px] h-[100px] rounded-full bg-[radial-gradient(circle,rgba(100,200,255,0.1),transparent_70%)]" />
      </div>

      <div className="relative z-10 pb-24 max-w-md mx-auto">
        {/* Header */}
        <div className="px-5 pt-6 flex items-start justify-between">
          <div>
            <div className="text-[10px] font-bold text-purple-300/50 tracking-[0.18em] uppercase mb-1.5">Ce soir on sort 🌙</div>
            <h1 className="font-[var(--font-syne)] text-2xl font-black text-white leading-tight tracking-tight">
              Soiree<br />
              <span className="bg-gradient-to-r from-[#C060FF] to-[#FF60C0] bg-clip-text text-transparent">Securisee</span> ✨
            </h1>
            <p className="text-[11px] text-purple-300/45 mt-1.5">Bars certifies - Bonne ambiance garantie</p>
          </div>
          <Link href="/client" className="bg-white/[0.07] border border-white/10 rounded-full py-1.5 px-3.5 text-[11px] text-white/50 mt-1 shrink-0">← Retour</Link>
        </div>

        {/* Luminous divider */}
        <div className="h-px my-4" style={{ background: "linear-gradient(90deg,transparent,rgba(160,40,255,0.5),rgba(255,60,180,0.4),transparent)" }} />

        <div className="px-5">
          {/* Zone selection */}
          <div className="text-[10px] font-extrabold text-purple-300/55 tracking-[0.16em] uppercase mb-2.5">📍 T&apos;es ou ce soir ?</div>
          <div className="flex gap-2 flex-wrap mb-5">
            {ZONES.map((z) => (
              <button key={z.id} onClick={() => setZone(z.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
                  zone === z.id
                    ? "border-[#C060FF] text-white bg-[rgba(160,40,255,0.25)] shadow-[0_0_14px_rgba(160,40,255,0.3)]"
                    : "border-white/10 text-white/50 bg-white/[0.06]"
                }`}>{z.label}</button>
            ))}
          </div>

          {/* Vibe check */}
          <div className="text-[10px] font-extrabold text-purple-300/55 tracking-[0.16em] uppercase mb-2.5">🎭 Vibe check</div>
          <div className="grid grid-cols-2 gap-2 mb-5">
            {VIBES.map((v) => (
              <button key={v.id} onClick={() => setVibe(v.id)}
                className={`rounded-2xl p-3.5 flex items-center gap-2.5 cursor-pointer transition-all border ${
                  vibe === v.id
                    ? "border-[#C060FF] bg-[rgba(160,40,255,0.2)] shadow-[0_0_18px_rgba(160,40,255,0.25)]"
                    : "border-white/[0.08] bg-white/[0.05]"
                }`}>
                <span className="text-xl">{v.icon}</span>
                <div>
                  <div className="text-xs font-extrabold text-white">{v.label}</div>
                  <div className="text-[10px] text-white/40">{v.sub}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Score minimum */}
          <div className="text-[10px] font-extrabold text-purple-300/55 tracking-[0.16em] uppercase mb-2.5">🛡️ Niveau secu minimum</div>
          <div className="flex gap-2 mb-6">
            {SCORES.map((s) => (
              <button key={s.id} onClick={() => setMinScore(s.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold cursor-pointer transition-all border ${
                  minScore === s.id
                    ? "border-ss-green text-ss-green bg-ss-green/15 shadow-[0_0_14px_rgba(0,200,120,0.2)]"
                    : "border-white/[0.08] text-white/45 bg-white/[0.05]"
                }`}>{s.label}</button>
            ))}
          </div>

          {/* CTA */}
          <button onClick={generateItinerary}
            className="w-full py-4 rounded-[18px] text-[15px] font-black font-[var(--font-syne)] text-white cursor-pointer border-none mb-6"
            style={{ background: "linear-gradient(135deg,#8020E0,#C040FF,#FF40C0)", boxShadow: "0 6px 28px rgba(160,40,255,0.4),0 0 0 1px rgba(255,255,255,0.08)" }}>
            ✨ Lance ma soiree !
          </button>

          {/* Results */}
          {showResults && (
            <div>
              <div className="text-center mb-[18px]">
                <div className="text-[26px] mb-1.5">🔥</div>
                <div className="font-[var(--font-syne)] text-[17px] font-black text-white tracking-tight">Ta soiree est prete !</div>
                <div className="text-[11px] text-purple-300/60 mt-1">{itinerary.length} spots valides - Score moyen {avgScore}/100</div>
              </div>

              {/* Itinerary stops */}
              <div className="mb-[18px]">
                {itinerary.map((stop, i) => (
                  <div key={i} className="flex items-start gap-3.5 py-3.5 border-b border-white/[0.08] relative last:border-b-0">
                    {i < itinerary.length - 1 && (
                      <div className="absolute left-[14px] top-[42px] bottom-[-14px] w-0.5" style={{ background: "linear-gradient(to bottom,rgba(160,100,255,0.4),transparent)" }} />
                    )}
                    <div className={`w-[30px] h-[30px] rounded-full flex items-center justify-center text-[13px] font-black shrink-0 mt-0.5 ${
                      stop.score >= 85 ? "bg-ss-green/20 text-ss-green" : stop.score >= 75 ? "bg-ss-orange/20 text-ss-orange" : "bg-ss-red/15 text-ss-red"
                    }`}>{i + 1}</div>
                    <div className="flex-1">
                      <div className="text-[13px] font-bold text-white">{stop.name}</div>
                      <div className="text-[11px] text-white/35 mt-0.5">{stop.type} - {stop.time}</div>
                    </div>
                    <div className={`text-sm font-black ${stop.score >= 85 ? "text-ss-green" : stop.score >= 75 ? "text-ss-orange" : "text-ss-red"}`}>{stop.score}</div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-2.5 mb-3.5">
                <button onClick={() => showToast("📤 Lien copie !")} className="py-3 bg-white/[0.07] text-white border border-white/12 rounded-[14px] text-xs font-bold font-[var(--font-syne)] cursor-pointer">
                  📤 Partager
                </button>
                <button onClick={generateItinerary} className="py-3 bg-[rgba(160,40,255,0.2)] text-[#C060FF] border border-[rgba(160,40,255,0.35)] rounded-[14px] text-xs font-bold font-[var(--font-syne)] cursor-pointer">
                  🔀 Reshuffle
                </button>
              </div>

              {/* Safety badge */}
              <div className="bg-ss-green/[0.07] border border-ss-green/[0.18] rounded-[14px] p-3.5 flex gap-2.5 items-center mb-6">
                <span className="text-xl shrink-0">🛡️</span>
                <div>
                  <div className="text-xs font-extrabold text-ss-green mb-0.5">100% certifies Spotysafe</div>
                  <div className="text-[10px] text-white/35 leading-relaxed">Audites Apave / BV — t&apos;as plus qu&apos;a profiter 🎉</div>
                </div>
              </div>
            </div>
          )}

          {/* History */}
          <div className="text-[10px] font-extrabold text-purple-300/55 tracking-[0.16em] uppercase mb-3">📅 Tes dernieres sorties</div>
          {[
            { icon: "🎉", title: "Tours Centre - 3 bars", sub: "Score moyen 86 - il y a 5 jours" },
            { icon: "🍷", title: "Le Marais - 4 bars", sub: "Score moyen 91 - il y a 12 jours" },
          ].map((h) => (
            <div key={h.title} className="bg-white/[0.05] border border-white/[0.08] rounded-2xl p-3.5 flex items-center gap-3 cursor-pointer mb-2 active:bg-white/[0.09] transition-colors">
              <span className="text-xl">{h.icon}</span>
              <div className="flex-1">
                <div className="text-[13px] font-bold text-white">{h.title}</div>
                <div className="text-[11px] text-white/35 mt-0.5">{h.sub}</div>
              </div>
              <span className="text-base text-white/20">›</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SoireePage() {
  return (
    <ToastProvider>
      <SoireeContent />
    </ToastProvider>
  );
}
