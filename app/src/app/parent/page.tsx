"use client";

import { useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { TabBar } from "@/components/ui/TabBar";
import { BackButton } from "@/components/ui/BackButton";
import { ToastProvider, useToast } from "@/components/ui/Toast";

const TABS = [
  { id: "live", icon: <span className="text-xl">📍</span>, label: "En direct" },
  { id: "history", icon: <span className="text-xl">🕐</span>, label: "Historique" },
  { id: "settings", icon: <span className="text-xl">⚙️</span>, label: "Reglages" },
];

const LOCATIONS = [
  { name: "Le Marais Social Club", addr: "Paris 3e", score: 91, safe: true },
  { name: "Cafe Oberkampf", addr: "Paris 11e", score: 74, safe: false },
  { name: "La Guinguette", addr: "Tours", score: 85, safe: true },
];

function ParentContent() {
  const [activeTab, setActiveTab] = useState("live");
  const [currentLocation, setCurrentLocation] = useState(0);
  const { showToast } = useToast();

  const loc = LOCATIONS[currentLocation];
  const isSafe = loc.safe;

  return (
    <div className="min-h-screen bg-ss-bg pb-24 app-container">
      {/* Header */}
      <div className="px-6 md:px-8 pt-4 pb-2 bg-gradient-to-b from-ss-green/5 to-transparent">
        <div className="flex justify-between items-center mb-5">
          <Logo size="small" />
          <BackButton href="/" />
        </div>
        <div className="flex items-center gap-2.5 mt-1">
          <h1 className="font-[var(--font-syne)] text-[22px] font-extrabold">Je suis parent</h1>
          <span className="bg-ss-purple/15 border border-ss-purple/35 text-ss-purple text-[9px] font-bold py-0.5 px-2 rounded-full tracking-wide">🔒 CONSENTEMENT REQUIS</span>
        </div>
        <p className="text-xs text-ss-muted mt-0.5">Suivi active uniquement avec l&apos;accord de votre enfant</p>
      </div>

      {/* Tab headers */}
      <div className="flex border-b border-ss-border mx-6 md:mx-8">
        {TABS.map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 py-2.5 text-center text-xs font-bold cursor-pointer border-b-2 transition-all ${
            activeTab === tab.id ? "text-ss-purple border-ss-purple" : "text-ss-muted border-transparent"
          }`}>
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* LIVE TAB */}
      {activeTab === "live" && (
        <div className="px-6 md:px-8 pt-4">
          {/* Child profile */}
          <div className="flex items-center gap-3.5 bg-ss-card border border-ss-border rounded-[14px] p-3.5 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-ss-purple/25 to-ss-purple/5 border-2 border-ss-purple/40 flex items-center justify-center text-[22px]">🧑</div>
            <div className="flex-1">
              <div className="text-sm font-bold">Lea</div>
              <div className="text-[11px] text-ss-muted mt-0.5">Mis a jour il y a 2 min</div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1.5 justify-end">
                <div className="w-[7px] h-[7px] rounded-full bg-ss-green animate-pulse" />
                <span className="text-[11px] text-ss-green font-bold">En ligne</span>
              </div>
              <div className="text-[10px] text-ss-muted mt-0.5">Batterie 78%</div>
            </div>
          </div>

          {/* Safety status */}
          <div className={`rounded-2xl p-[18px] mb-4 ${isSafe ? "bg-gradient-to-br from-ss-green/12 to-ss-green/[0.04] border border-ss-green/35" : "bg-gradient-to-br from-ss-orange/12 to-ss-orange/[0.04] border border-ss-orange/35"}`}>
            <div className="flex items-center gap-3 mb-2.5">
              <span className="text-[32px]">{isSafe ? "✅" : "⚠️"}</span>
              <div>
                <div className={`text-[13px] font-extrabold ${isSafe ? "text-ss-green" : "text-ss-orange"}`}>
                  {isSafe ? "LIEU SECURISE" : "LIEU NON CERTIFIE"}
                </div>
                <div className="text-[11px] text-ss-muted mt-0.5">
                  Score Spotysafe {isSafe ? "≥" : "<"} 85/100 {isSafe ? "- Verifie" : ""}
                </div>
              </div>
              <div className="ml-auto text-center">
                <div className={`text-[26px] font-black ${isSafe ? "text-ss-green" : "text-ss-orange"}`}>{loc.score}</div>
                <div className="text-[8px] text-ss-muted">/100</div>
              </div>
            </div>
            <div className="bg-black/20 rounded-lg p-2.5">
              <div className="text-xs font-bold">📍 {loc.name}</div>
              <div className="text-[10px] text-ss-muted mt-0.5">{loc.addr}</div>
              {isSafe && (
                <div className="flex gap-3 mt-2">
                  <span className="text-[10px] text-ss-green">✓ Extincteurs OK</span>
                  <span className="text-[10px] text-ss-green">✓ Issues OK</span>
                  <span className="text-[10px] text-ss-green">✓ Detecteurs OK</span>
                </div>
              )}
            </div>
          </div>

          {/* Mini map placeholder */}
          <div className="bg-ss-card border border-ss-border rounded-[14px] overflow-hidden mb-4">
            <div className="w-full h-[140px] flex items-center justify-center text-ss-muted">
              <div className="text-center">
                <div className="text-2xl mb-1">🗺️</div>
                <div className="text-[11px]">{loc.addr}</div>
              </div>
            </div>
            <div className="px-3.5 py-2.5 flex justify-between items-center">
              <span className="text-[11px] text-ss-muted">{loc.addr}</span>
              <button onClick={() => showToast("🗺️ Navigation lancee")} className="bg-ss-purple/15 border border-ss-purple/30 text-ss-purple text-[10px] font-bold py-1 px-3 rounded-full cursor-pointer">Y aller ›</button>
            </div>
          </div>

          {/* Quick actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-4">
            <button onClick={() => showToast("📱 Message envoye a Lea")} className="bg-ss-card border border-ss-border rounded-xl p-3.5 text-center cursor-pointer">
              <div className="text-[22px] mb-1.5">💬</div>
              <div className="text-[11px] font-bold">Envoyer message</div>
            </button>
            <button onClick={() => showToast("📞 Appel lance vers Lea")} className="bg-ss-card border border-ss-border rounded-xl p-3.5 text-center cursor-pointer">
              <div className="text-[22px] mb-1.5">📞</div>
              <div className="text-[11px] font-bold">Appeler</div>
            </button>
          </div>

          {/* Location simulator */}
          <p className="text-[11px] text-ss-muted font-bold tracking-wider mb-2.5">SIMULER UN DEPLACEMENT</p>
          <div className="flex flex-col gap-2">
            {LOCATIONS.map((l, i) => (
              <button key={l.name} onClick={() => { setCurrentLocation(i); showToast(`📍 Simulation: ${l.name}`); }}
                className={`bg-ss-card border rounded-xl p-3 flex justify-between items-center cursor-pointer text-left ${
                  l.safe ? "border-ss-green/30" : "border-ss-orange/30"
                }`}>
                <div>
                  <div className="text-xs font-bold">{l.name} - {l.addr}</div>
                  <div className={`text-[10px] mt-0.5 ${l.safe ? "text-ss-green" : "text-ss-orange"}`}>
                    Score {l.score}/100 {l.safe ? "✅ Securise" : "⚠️ Non certifie"}
                  </div>
                </div>
                <span className="text-base">›</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* HISTORY TAB */}
      {activeTab === "history" && (
        <div className="px-6 md:px-8 pt-4">
          <p className="text-[11px] text-ss-muted font-bold tracking-wider mb-3">LIEUX VISITES — 7 DERNIERS JOURS</p>

          <p className="text-[10px] text-ss-muted font-bold py-2 tracking-wide">AUJOURD&apos;HUI</p>
          <div className="bg-ss-card border border-ss-border rounded-xl p-3.5 flex gap-3 items-center mb-0.5">
            <div className="w-9 h-9 rounded-[10px] bg-ss-green/12 border border-ss-green/30 flex items-center justify-center text-base">✅</div>
            <div className="flex-1">
              <div className="text-xs font-bold">Le Marais Social Club</div>
              <div className="text-[10px] text-ss-muted mt-0.5">Paris 3e - 22h14 → En cours - Score 91</div>
            </div>
            <span className="text-[13px] font-black text-ss-green">91</span>
          </div>

          <p className="text-[10px] text-ss-muted font-bold py-3 tracking-wide">HIER</p>
          <div className="md:grid md:grid-cols-2 md:gap-2">
          <div className="bg-ss-card border border-ss-border rounded-xl p-3.5 flex gap-3 items-center mb-0.5">
            <div className="w-9 h-9 rounded-[10px] bg-ss-orange/10 border border-ss-orange/30 flex items-center justify-center text-base">⚠️</div>
            <div className="flex-1">
              <div className="text-xs font-bold">Cafe Oberkampf</div>
              <div className="text-[10px] text-ss-orange mt-0.5">Paris 11e - 21h02→23h45 - Score 74 ⚠️</div>
            </div>
            <span className="text-[13px] font-black text-ss-orange">74</span>
          </div>
          <div className="bg-ss-card border border-ss-border rounded-xl p-3.5 flex gap-3 items-center mt-0.5 md:mt-0">
            <div className="w-9 h-9 rounded-[10px] bg-ss-green/12 border border-ss-green/30 flex items-center justify-center text-base">✅</div>
            <div className="flex-1">
              <div className="text-xs font-bold">Bar Republique</div>
              <div className="text-[10px] text-ss-muted mt-0.5">Paris 3e - 18h30→20h15 - Score 88</div>
            </div>
            <span className="text-[13px] font-black text-ss-green">88</span>
          </div>
          </div>

          <p className="text-[10px] text-ss-muted font-bold py-3 tracking-wide">VENDREDI 14 FEV.</p>
          <div className="bg-ss-card border border-ss-border rounded-xl p-3.5 flex gap-3 items-center">
            <div className="w-9 h-9 rounded-[10px] bg-ss-green/12 border border-ss-green/30 flex items-center justify-center text-base">✅</div>
            <div className="flex-1">
              <div className="text-xs font-bold">Le Vieux Murier</div>
              <div className="text-[10px] text-ss-muted mt-0.5">Tours - 20h00→01h30 - Score 82</div>
            </div>
            <span className="text-[13px] font-black text-ss-green">82</span>
          </div>

          {/* Weekly summary */}
          <div className="mt-4 bg-ss-purple/8 border border-ss-purple/20 rounded-xl p-3.5">
            <div className="text-[11px] text-ss-purple font-bold mb-2">📊 RESUME DE LA SEMAINE</div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="text-xl font-black text-ss-green">3</div>
                <div className="text-[9px] text-ss-muted">Lieux securises</div>
              </div>
              <div>
                <div className="text-xl font-black text-ss-orange">1</div>
                <div className="text-[9px] text-ss-muted">A surveiller</div>
              </div>
              <div>
                <div className="text-xl font-black">84</div>
                <div className="text-[9px] text-ss-muted">Score moyen</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SETTINGS TAB */}
      {activeTab === "settings" && (
        <div className="px-6 md:px-8 pt-4">
          <p className="text-[11px] text-ss-muted font-bold tracking-wider mb-3">PROFIL SUIVI</p>
          <div className="bg-ss-card border border-ss-border rounded-[14px] overflow-hidden mb-4">
            <div className="px-4 py-3.5 border-b border-ss-border flex justify-between items-center">
              <div>
                <div className="text-[13px] font-bold">Lea</div>
                <div className="text-[10px] text-ss-muted">Consentement donne le 12/02/2026</div>
              </div>
              <span className="bg-ss-green/12 border border-ss-green/30 text-ss-green text-[9px] font-bold py-1 px-2 rounded-full">✓ Actif</span>
            </div>
            <div onClick={() => showToast("📱 Lien envoye a Lea")} className="px-4 py-3.5 flex justify-between items-center cursor-pointer">
              <span className="text-[13px]">Ajouter un autre enfant</span>
              <span className="text-base text-ss-muted">+</span>
            </div>
          </div>

          <p className="text-[11px] text-ss-muted font-bold tracking-wider mb-3">ALERTES</p>
          <div className="bg-ss-card border border-ss-border rounded-[14px] overflow-hidden mb-4">
            <div onClick={() => showToast("⚙️ Seuil mis a jour")} className="px-4 py-3.5 border-b border-ss-border flex justify-between items-center cursor-pointer">
              <div>
                <div className="text-[13px]">Alerte si lieu non certifie</div>
                <div className="text-[10px] text-ss-muted mt-0.5">Score &lt; 85/100</div>
              </div>
              <span className="bg-ss-green/12 border border-ss-green/30 text-ss-green text-[9px] font-bold py-1 px-2 rounded-full">Activee</span>
            </div>
            <div onClick={() => showToast("⚙️ Parametre mis a jour")} className="px-4 py-3.5 border-b border-ss-border flex justify-between items-center cursor-pointer">
              <div>
                <div className="text-[13px]">Notification d&apos;arrivee</div>
                <div className="text-[10px] text-ss-muted mt-0.5">Quand l&apos;enfant entre dans un ERP</div>
              </div>
              <span className="bg-ss-green/12 border border-ss-green/30 text-ss-green text-[9px] font-bold py-1 px-2 rounded-full">Activee</span>
            </div>
            <div onClick={() => showToast("⚙️ Heure de retour mise a jour")} className="px-4 py-3.5 flex justify-between items-center cursor-pointer">
              <div>
                <div className="text-[13px]">Heure de retour attendue</div>
                <div className="text-[10px] text-ss-muted mt-0.5">Alerte si depassee</div>
              </div>
              <span className="text-xs text-ss-muted">01h00 ›</span>
            </div>
          </div>

          {/* Privacy info */}
          <div className="bg-ss-purple/8 border border-ss-purple/20 rounded-xl p-3.5">
            <div className="text-[11px] text-ss-purple font-bold mb-1.5">🔒 RESPECT DE LA VIE PRIVEE</div>
            <div className="text-[11px] text-ss-muted leading-relaxed">
              Le suivi est <strong className="text-ss-text">toujours soumis au consentement explicite</strong> de l&apos;enfant. Il peut le desactiver a tout moment. La localisation n&apos;est partagee qu&apos;avec le parent autorise.
            </div>
          </div>
        </div>
      )}

      <TabBar tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

export default function ParentPage() {
  return (
    <ToastProvider>
      <ParentContent />
    </ToastProvider>
  );
}
