"use client";

import { useState, useEffect } from "react";
import { ToastProvider, useToast } from "@/components/ui/Toast";

const CORRECT_PIN = "240226";

const GEO_DATA = [
  { region: "Ile-de-France", count: 487, pct: 39, color: "#4A9EFF" },
  { region: "Centre-Val de Loire", count: 312, pct: 25, color: "#00E87A" },
  { region: "Nouvelle-Aquitaine", count: 198, pct: 16, color: "#E8B84B" },
  { region: "Auvergne-Rhone-Alpes", count: 148, pct: 12, color: "#A064FF" },
  { region: "Autres regions", count: 102, pct: 8, color: "rgba(240,240,248,0.25)" },
];

const CONTRACT_TYPES = [
  { type: "Type N — Restaurants / Bars", count: 723, pct: 58, color: "#00E87A" },
  { type: "Type L — Salles spectacle", count: 274, pct: 22, color: "#4A9EFF" },
  { type: "Type M — Commerces", count: 150, pct: 12, color: "#E8B84B" },
  { type: "Autres types ERP", count: 100, pct: 8, color: "#A064FF" },
];

const SYS_ALERTS = [
  { level: "critical", msg: "Serveur de scoring — latence > 500ms depuis 14:32", time: "il y a 28 min" },
  { level: "critical", msg: "Certificat SSL expire dans 3 jours (api.spotysafe.fr)", time: "il y a 2h" },
  { level: "warn", msg: "File d'attente signalements > 50 — delai traitement 72h", time: "il y a 4h" },
];

const ACTIVITIES = [
  { icon: "📝", text: "Nouveau contrat PRO — Le Zinc, Lyon", time: "il y a 12 min", color: "#00E87A" },
  { icon: "🚨", text: "Signalement critique — Chez Marcel, Paris", time: "il y a 45 min", color: "#FF3B3B" },
  { icon: "✅", text: "Certification validee — La Terrasse, Tours", time: "il y a 1h", color: "#00E87A" },
  { icon: "👤", text: "+23 nouveaux utilisateurs aujourd'hui", time: "il y a 2h", color: "#4A9EFF" },
];

function AdminContent() {
  const [pin, setPin] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [pinError, setPinError] = useState(false);
  const { showToast } = useToast();

  const handlePinKey = (key: string) => {
    if (key === "del") {
      setPin((p) => p.slice(0, -1));
      setPinError(false);
      return;
    }
    if (pin.length >= 6) return;
    const newPin = pin + key;
    setPin(newPin);
    if (newPin.length === 6) {
      if (newPin === CORRECT_PIN) {
        setUnlocked(true);
      } else {
        setPinError(true);
        setTimeout(() => { setPin(""); setPinError(false); }, 600);
      }
    }
  };

  if (!unlocked) {
    return (
      <div className="min-h-screen bg-[#080A0F] flex flex-col items-center justify-center px-8 app-container">
        <div className="text-center mb-8">
          <div className="font-[var(--font-mono)] text-[11px] font-medium text-ss-text/20 tracking-[0.16em] uppercase mb-3">SPOTYSAFE ADMINISTRATION</div>
          <div className="font-[var(--font-syne)] text-xl font-bold mb-2">Acces restreint</div>
          <div className="text-xs text-ss-muted">Entrez le code PIN administrateur</div>
        </div>

        {/* PIN dots */}
        <div className="flex gap-3 mb-8">
          {[0,1,2,3,4,5].map((i) => (
            <div key={i} className={`w-3.5 h-3.5 rounded-full border-2 transition-all ${
              pinError ? "bg-ss-red border-ss-red animate-[shake_0.4s_ease]" :
              i < pin.length ? "bg-ss-red border-ss-red shadow-[0_0_8px_rgba(255,59,59,0.4)]" : "bg-transparent border-ss-red/40"
            }`} />
          ))}
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-3 gap-3 w-full max-w-[240px]">
          {["1","2","3","4","5","6","7","8","9","","0","del"].map((key) => (
            key === "" ? <div key="empty" /> :
            <button key={key} onClick={() => handlePinKey(key)}
              className={`h-[60px] flex items-center justify-center font-[var(--font-syne)] text-[22px] font-bold rounded-[14px] cursor-pointer transition-all active:scale-[0.94] select-none ${
                key === "del" ? "bg-transparent border-transparent text-[13px] font-normal text-ss-muted" : "bg-white/[0.06] border border-white/[0.08] active:bg-ss-red/15 active:border-ss-red/30"
              }`}>
              {key === "del" ? "←" : key}
            </button>
          ))}
        </div>

        <button onClick={() => { window.location.href = "/"; }} className="mt-8 text-xs text-ss-muted cursor-pointer bg-transparent border-none">← Retour</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080A0F] app-container">
      {/* Header */}
      <div className="px-[18px] md:px-8 pt-5 pb-3.5 border-b border-white/[0.06]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="font-[var(--font-mono)] text-[11px] font-medium text-ss-text/20 tracking-[0.16em] uppercase">SPOTYSAFE</span>
            <div className="w-px h-3 bg-white/12" />
            <span className="font-[var(--font-mono)] text-[11px] font-medium text-ss-text/20 tracking-[0.12em]">ADMINISTRATION</span>
            <span className="bg-ss-red text-white font-[var(--font-mono)] text-[8px] font-bold tracking-[0.14em] rounded-sm px-1.5 py-px">LIVE</span>
          </div>
          <button onClick={() => { window.location.href = "/"; }} className="font-[var(--font-mono)] text-[10px] text-ss-text/30 cursor-pointer bg-transparent border-none tracking-wider">← EXIT</button>
        </div>
        <div className="flex items-baseline gap-3 mt-2.5">
          <span className="font-[var(--font-mono)] text-[22px] font-bold tracking-tight">DIM 15 FEV 2026</span>
          <span className="font-[var(--font-mono)] text-[11px] text-ss-text/25">Vue nationale consolidee</span>
        </div>
      </div>

      <div className="px-[18px] md:px-8 pb-24">
        {/* KPIs Grid */}
        <div className="border border-white/[0.07] mt-4 overflow-hidden">
          {/* Row headers */}
          <div className="grid grid-cols-2 lg:grid-cols-4 border-b border-white/[0.06]">
            <div className="px-3 py-1 font-[var(--font-mono)] text-[8px] font-semibold text-ss-text/20 tracking-[0.14em] border-r border-white/[0.06]">REVENUS RECURRENTS</div>
            <div className="px-3 py-1 font-[var(--font-mono)] text-[8px] font-semibold text-ss-text/20 tracking-[0.14em] lg:border-r lg:border-white/[0.06]">UTILISATEURS ACTIFS</div>
            <div className="hidden lg:block px-3 py-1 font-[var(--font-mono)] text-[8px] font-semibold text-ss-text/20 tracking-[0.14em] border-r border-white/[0.06]">CONTRATS ERP</div>
            <div className="hidden lg:block px-3 py-1 font-[var(--font-mono)] text-[8px] font-semibold text-ss-text/20 tracking-[0.14em]">SIGNALEMENTS</div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 border-b border-white/[0.06] lg:border-b-0">
            <div className="p-3.5 border-r border-white/[0.06]">
              <div className="font-[var(--font-mono)] text-[28px] font-bold text-ss-green tracking-tight leading-none">258 K€</div>
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className="font-[var(--font-mono)] text-[9px] text-ss-green">▲ +34.2%</span>
                <span className="font-[var(--font-mono)] text-[9px] text-ss-text/20">MoM</span>
              </div>
              <div className="mt-2 h-px bg-white/[0.06] relative"><div className="absolute top-0 left-0 h-full w-[29%] bg-ss-green" /></div>
              <div className="font-[var(--font-mono)] text-[8px] text-ss-text/20 mt-1">OBJ AN 1 - 885 K€ - 29%</div>
            </div>
            <div className="p-3.5 lg:border-r lg:border-white/[0.06]">
              <div className="font-[var(--font-mono)] text-[28px] font-bold text-ss-blue tracking-tight leading-none">4 821</div>
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className="font-[var(--font-mono)] text-[9px] text-ss-blue">▲ +12.3%</span>
                <span className="font-[var(--font-mono)] text-[9px] text-ss-text/20">/sem</span>
              </div>
              <div className="mt-2 h-px bg-white/[0.06] relative"><div className="absolute top-0 left-0 h-full w-[48%] bg-ss-blue" /></div>
              <div className="font-[var(--font-mono)] text-[8px] text-ss-text/20 mt-1">OBJ AN 1 - 10 000 - 48%</div>
            </div>
            <div className="hidden lg:block p-3.5 border-r border-white/[0.06]">
              <div className="font-[var(--font-mono)] text-[28px] font-bold text-ss-gold tracking-tight leading-none">1 247</div>
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className="font-[var(--font-mono)] text-[9px] text-ss-gold">▲ +89</span>
                <span className="font-[var(--font-mono)] text-[9px] text-ss-text/20">ce mois</span>
              </div>
              <div className="font-[var(--font-mono)] text-[8px] text-ss-text/20 mt-2">FREE 743 - PRO 504</div>
            </div>
            <div className="hidden lg:block p-3.5">
              <div className="font-[var(--font-mono)] text-[28px] font-bold text-[#FF6B6B] tracking-tight leading-none">312</div>
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className="font-[var(--font-mono)] text-[9px] text-ss-green">✓ 214</span>
                <span className="font-[var(--font-mono)] text-[9px] text-ss-gold">⧖ 98</span>
              </div>
              <div className="font-[var(--font-mono)] text-[8px] text-ss-text/20 mt-2">RESOLUS 69% - EN COURS 31%</div>
            </div>
          </div>
          <div className="grid grid-cols-2 border-b border-white/[0.06] lg:hidden">
            <div className="px-3 py-1 font-[var(--font-mono)] text-[8px] font-semibold text-ss-text/20 tracking-[0.14em] border-r border-white/[0.06]">CONTRATS ERP</div>
            <div className="px-3 py-1 font-[var(--font-mono)] text-[8px] font-semibold text-ss-text/20 tracking-[0.14em]">SIGNALEMENTS</div>
          </div>
          <div className="grid grid-cols-2 lg:hidden">
            <div className="p-3.5 border-r border-white/[0.06]">
              <div className="font-[var(--font-mono)] text-[28px] font-bold text-ss-gold tracking-tight leading-none">1 247</div>
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className="font-[var(--font-mono)] text-[9px] text-ss-gold">▲ +89</span>
                <span className="font-[var(--font-mono)] text-[9px] text-ss-text/20">ce mois</span>
              </div>
              <div className="font-[var(--font-mono)] text-[8px] text-ss-text/20 mt-2">FREE 743 - PRO 504</div>
            </div>
            <div className="p-3.5">
              <div className="font-[var(--font-mono)] text-[28px] font-bold text-[#FF6B6B] tracking-tight leading-none">312</div>
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className="font-[var(--font-mono)] text-[9px] text-ss-green">✓ 214</span>
                <span className="font-[var(--font-mono)] text-[9px] text-ss-gold">⧖ 98</span>
              </div>
              <div className="font-[var(--font-mono)] text-[8px] text-ss-text/20 mt-2">RESOLUS 69% - EN COURS 31%</div>
            </div>
          </div>
        </div>

        {/* Secondary metrics */}
        <div className="grid grid-cols-3 border border-white/[0.07] mt-2 overflow-hidden">
          {[
            { label: "CERTIF.", value: "18", sub: "partenaires", color: "#B47FFF" },
            { label: "SCORE MOY.", value: "79.4", sub: "▲ +2 pts/mois", color: "#00E87A" },
            { label: "ALERTES P.", value: "891", sub: "ce mois", color: "#FF6B9D" },
          ].map((m, i) => (
            <div key={m.label} className={`p-2.5 text-center ${i < 2 ? "border-r border-white/[0.06]" : ""}`}>
              <div className="font-[var(--font-mono)] text-[8px] text-ss-text/20 tracking-[0.1em] mb-1.5">{m.label}</div>
              <div className="font-[var(--font-mono)] text-xl font-bold" style={{ color: m.color }}>{m.value}</div>
              <div className="font-[var(--font-mono)] text-[7px] mt-0.5" style={{ color: `${m.color}80` }}>{m.sub}</div>
            </div>
          ))}
        </div>

        {/* Geographic + Contract sections */}
        <div className="md:grid md:grid-cols-2 md:gap-4">
        {/* Geographic distribution */}
        <div className="border border-white/[0.07] mt-2 p-3.5">
          <div className="font-[var(--font-mono)] text-[9px] font-semibold text-ss-text/30 tracking-[0.14em] mb-2.5">REPARTITION GEOGRAPHIQUE</div>
          {GEO_DATA.map((g) => (
            <div key={g.region} className="flex items-center gap-2.5 mb-2">
              <div className="w-2 h-2 rounded-full shrink-0" style={{ background: g.color }} />
              <span className="font-[var(--font-mono)] text-[10px] text-ss-text/60 flex-1">{g.region}</span>
              <span className="font-[var(--font-mono)] text-[10px] font-bold" style={{ color: g.color }}>{g.count}</span>
              <span className="font-[var(--font-mono)] text-[9px] text-ss-text/25 w-8 text-right">{g.pct}%</span>
            </div>
          ))}
        </div>

        {/* Contract types */}
        <div className="border border-white/[0.07] mt-2 p-3.5">
          <div className="font-[var(--font-mono)] text-[9px] font-semibold text-ss-text/30 tracking-[0.14em] mb-2.5">CONTRATS PAR TYPE ERP</div>
          {CONTRACT_TYPES.map((t) => (
            <div key={t.type} className="mb-2">
              <div className="flex justify-between items-center mb-1">
                <span className="font-[var(--font-mono)] text-[10px] text-ss-text/60">{t.type}</span>
                <span className="font-[var(--font-mono)] text-[10px] font-bold" style={{ color: t.color }}>{t.count}</span>
              </div>
              <div className="h-px bg-white/[0.06]"><div className="h-full" style={{ width: `${t.pct}%`, background: t.color }} /></div>
            </div>
          ))}
        </div>
        </div>

        {/* System alerts */}
        <div className="border border-ss-red/[0.18] mt-2 p-3.5">
          <div className="flex items-center gap-2 mb-2.5">
            <span className="font-[var(--font-mono)] text-[9px] font-semibold text-ss-text/30 tracking-[0.14em]">ALERTES SYSTEME</span>
            <span className="bg-ss-red/15 text-ss-red font-[var(--font-mono)] text-[8px] font-bold rounded-sm px-1.5 py-px tracking-wider">2 CRITIQUES</span>
          </div>
          {SYS_ALERTS.map((a, i) => (
            <div key={i} className={`flex items-start gap-2 py-2 ${i < SYS_ALERTS.length - 1 ? "border-b border-white/[0.06]" : ""}`}>
              <div className={`w-1.5 h-1.5 rounded-full mt-1 shrink-0 ${a.level === "critical" ? "bg-ss-red" : "bg-ss-gold"}`} />
              <div className="flex-1">
                <div className="font-[var(--font-mono)] text-[10px] text-ss-text/70">{a.msg}</div>
                <div className="font-[var(--font-mono)] text-[8px] text-ss-text/20 mt-0.5">{a.time}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent activity */}
        <div className="border border-white/[0.07] mt-2 p-3.5">
          <div className="font-[var(--font-mono)] text-[9px] font-semibold text-ss-text/30 tracking-[0.14em] mb-2.5">ACTIVITE RECENTE</div>
          {ACTIVITIES.map((a, i) => (
            <div key={i} className={`flex items-start gap-2 py-2 ${i < ACTIVITIES.length - 1 ? "border-b border-white/[0.06]" : ""}`}>
              <span className="text-sm">{a.icon}</span>
              <div className="flex-1">
                <div className="font-[var(--font-mono)] text-[10px] text-ss-text/70">{a.text}</div>
                <div className="font-[var(--font-mono)] text-[8px] text-ss-text/20 mt-0.5">{a.time}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Admin actions */}
        <div className="mt-4">
          <div className="font-[var(--font-mono)] text-[9px] font-semibold text-ss-text/30 tracking-[0.14em] mb-2">ACTIONS</div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-1.5">
            {[
              { title: "EXPORT PDF", sub: "Rapport mensuel", danger: false },
              { title: "NOTIFICATION", sub: "Push tous users", danger: false },
              { title: "AUDIT ERP", sub: "Controle manuel", danger: false },
              { title: "PARTENAIRE", sub: "Ajouter certif.", danger: false },
              { title: "CODE PROMO", sub: "Acces gratuit", danger: false },
              { title: "LOGS SECURITE", sub: "Acces & connexions", danger: true },
            ].map((a) => (
              <button key={a.title} onClick={() => showToast(`${a.title} lance`)}
                className={`border p-3 cursor-pointer text-left ${a.danger ? "border-ss-red/20 bg-ss-red/[0.03]" : "border-white/[0.08] bg-white/[0.02]"}`}>
                <div className={`font-[var(--font-mono)] text-[10px] font-semibold mb-0.5 ${a.danger ? "text-ss-red" : "text-ss-text/60"}`}>{a.title}</div>
                <div className={`font-[var(--font-mono)] text-[8px] ${a.danger ? "text-ss-red/40" : "text-ss-text/20"}`}>{a.sub}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  return (
    <ToastProvider>
      <AdminContent />
    </ToastProvider>
  );
}
