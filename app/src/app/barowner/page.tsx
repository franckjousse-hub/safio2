"use client";

import { useState, useEffect, useRef } from "react";
import { Logo } from "@/components/ui/Logo";
import { ScoreBar } from "@/components/ui/ScoreBar";
import { TabBar } from "@/components/ui/TabBar";
import { BackButton } from "@/components/ui/BackButton";
import { ToastProvider, useToast } from "@/components/ui/Toast";

const TABS = [
  { id: "home", icon: <span className="text-xl">🏠</span>, label: "Accueil" },
  { id: "analytics", icon: <span className="text-xl">📊</span>, label: "Stats" },
  { id: "partners", icon: <span className="text-xl">🤝</span>, label: "Partenaires" },
  { id: "docs", icon: <span className="text-xl">📋</span>, label: "Documents" },
  { id: "settings", icon: <span className="text-xl">⚙️</span>, label: "Reglages" },
];

const CRITERIA = [
  { name: "Extincteurs & systemes anti-incendie", icon: "🔥", pct: 95, status: "ok" },
  { name: "Issues de secours", icon: "🚪", pct: 70, status: "warn" },
  { name: "Eclairage de securite", icon: "💡", pct: 65, status: "warn" },
  { name: "Affichages reglementaires", icon: "📋", pct: 90, status: "ok" },
  { name: "Structure & materiaux", icon: "🏗️", pct: 85, status: "ok" },
  { name: "Detecteurs de fumee", icon: "🔔", pct: 40, status: "bad" },
];

function BarOwnerContent() {
  const [activeTab, setActiveTab] = useState("home");
  const [animatedScore, setAnimatedScore] = useState(0);
  const { showToast } = useToast();
  const animRef = useRef(false);

  useEffect(() => {
    if (animRef.current) return;
    animRef.current = true;
    const target = 78;
    const duration = 1200;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      setAnimatedScore(Math.round(current));
      if (current >= target) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-ss-bg pb-24 max-w-md mx-auto">
      {/* HOME TAB */}
      {activeTab === "home" && (
        <>
          {/* Header */}
          <div className="px-6 pt-4 pb-6 bg-gradient-to-b from-ss-orange/[0.06] to-transparent">
            <div className="flex justify-between items-center mb-5">
              <Logo size="small" />
              <BackButton href="/" />
            </div>
            <h1 className="font-[var(--font-syne)] text-2xl font-extrabold mb-1">Bar du Centre</h1>
            <p className="text-[13px] text-ss-muted">5 Rue Colbert - Tours - ERP Type N - 3e categorie</p>
          </div>

          {/* Big Score Card */}
          <div className="mx-6 mb-5 bg-ss-card border border-ss-border rounded-3xl p-7 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[radial-gradient(circle,rgba(255,140,0,0.12),transparent_70%)]" />
            <div className="flex items-center justify-between mb-5 relative">
              <div>
                <div className="text-[13px] text-ss-muted mb-1.5">Score global de securite</div>
                <div className="flex items-baseline gap-1">
                  <span className="font-[var(--font-syne)] text-7xl font-extrabold text-ss-orange leading-none">{animatedScore}</span>
                  <span className="font-[var(--font-syne)] text-[28px] font-semibold text-ss-muted self-end pb-2.5">/100</span>
                </div>
                <div className="inline-flex items-center gap-1 bg-ss-green/10 border border-ss-green/20 rounded-[10px] px-2.5 py-1 text-xs text-ss-green font-semibold mt-2">
                  ↑ +3 pts ce trimestre
                </div>
              </div>
              {/* Ring */}
              <div className="w-[90px] h-[90px] relative">
                <svg width="90" height="90" viewBox="0 0 90 90" className="-rotate-90">
                  <circle cx="45" cy="45" r="36" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
                  <circle cx="45" cy="45" r="36" fill="none" stroke="#FF8C00" strokeWidth="8" strokeLinecap="round"
                    strokeDasharray="226" strokeDashoffset={226 - (226 * 78) / 100} className="transition-all duration-1000" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center font-[var(--font-syne)] text-lg font-extrabold text-ss-orange">78</div>
              </div>
            </div>
            <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-[#CC7000] to-ss-orange transition-all duration-800" style={{ width: "78%" }} />
            </div>
          </div>

          {/* Criteria */}
          <div className="px-6 mb-5">
            <h2 className="font-[var(--font-syne)] text-base font-bold mb-3.5">Detail par critere</h2>
            <div className="flex flex-col gap-2.5">
              {CRITERIA.map((c) => (
                <div key={c.name} className="bg-ss-card border border-ss-border rounded-2xl p-3.5 flex items-center gap-3.5 active:scale-[0.98] transition-all cursor-pointer">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 ${
                    c.status === "ok" ? "bg-ss-green/10" : c.status === "warn" ? "bg-ss-orange/10" : "bg-ss-red/10"
                  }`}>{c.icon}</div>
                  <div className="flex-1">
                    <div className="text-sm font-medium mb-1">{c.name}</div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1 bg-white/[0.06] rounded-sm overflow-hidden">
                        <div className={`h-full rounded-sm ${
                          c.status === "ok" ? "bg-ss-green" : c.status === "warn" ? "bg-ss-orange" : "bg-ss-red"
                        }`} style={{ width: `${c.pct}%` }} />
                      </div>
                      <span className="text-xs text-ss-muted">{c.pct}%</span>
                    </div>
                  </div>
                  <span className={`text-[11px] px-2.5 py-0.5 rounded-lg font-semibold ${
                    c.status === "ok" ? "bg-ss-green/10 text-ss-green" : c.status === "warn" ? "bg-ss-orange/10 text-ss-orange" : "bg-ss-red/10 text-ss-red"
                  }`}>
                    {c.status === "ok" ? "✓ OK" : c.status === "warn" ? "⚠ Action" : "✗ Urgent"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="px-6 pb-6">
            <h2 className="font-[var(--font-syne)] text-base font-bold mb-3.5">Actions recommandees</h2>
            {[
              { icon: "📅", title: "Planifier une inspection", sub: "Prochaine visite recommandee : mars 2026", accent: false },
              { icon: "📤", title: "Envoyer mon dossier", sub: "Commission de securite d'Indre-et-Loire", accent: true },
              { icon: "📜", title: "Telecharger mon certificat", sub: "Valide jusqu'au 12 septembre 2026", accent: false },
              { icon: "👁️", title: "Voir ma fiche publique", sub: "Ce que voient vos clients sur Spotysafe", accent: false },
            ].map((a) => (
              <button key={a.title} onClick={() => showToast(`${a.icon} ${a.title}`)} className="w-full bg-ss-card border border-ss-border rounded-2xl p-4 flex items-center gap-3.5 cursor-pointer mb-2.5 active:scale-[0.98] active:opacity-80 transition-all text-left">
                <div className={`w-11 h-11 rounded-[14px] flex items-center justify-center text-xl shrink-0 ${a.accent ? "bg-ss-orange/10" : "bg-ss-green/10"}`}>{a.icon}</div>
                <div className="flex-1">
                  <div className="text-[15px] font-medium">{a.title}</div>
                  <div className="text-xs text-ss-muted mt-0.5">{a.sub}</div>
                </div>
                <span className="text-ss-muted">›</span>
              </button>
            ))}
          </div>
        </>
      )}

      {/* ANALYTICS TAB */}
      {activeTab === "analytics" && (
        <div className="px-6 pt-4 pb-6">
          <div className="flex justify-between items-center mb-1">
            <h2 className="font-[var(--font-syne)] text-[22px] font-extrabold">Statistiques</h2>
            <button onClick={() => setActiveTab("home")} className="text-[13px] text-ss-muted">&larr; Retour</button>
          </div>
          <p className="text-xs text-ss-muted mb-4">Bar du Centre - Tours — 30 derniers jours</p>

          <div className="grid grid-cols-2 gap-2.5 mb-4">
            <div className="bg-gradient-to-br from-ss-green/12 to-ss-green/[0.04] border border-ss-green/25 rounded-[14px] p-3.5">
              <div className="text-[10px] text-ss-green font-bold tracking-wider mb-1.5">VUES FICHE</div>
              <div className="text-[28px] font-black leading-none">847</div>
              <div className="text-[10px] text-ss-green mt-1">↑ +23% vs mois prec.</div>
            </div>
            <div className="bg-gradient-to-br from-ss-gold/12 to-ss-gold/[0.04] border border-ss-gold/25 rounded-[14px] p-3.5">
              <div className="text-[10px] text-ss-gold font-bold tracking-wider mb-1.5">SCANS QR</div>
              <div className="text-[28px] font-black leading-none">134</div>
              <div className="text-[10px] text-ss-gold mt-1">↑ +41% vs mois prec.</div>
            </div>
            <div className="bg-ss-card border border-ss-border rounded-[14px] p-3.5">
              <div className="text-[10px] text-ss-muted font-bold tracking-wider mb-1.5">SCORE MOYEN VU</div>
              <div className="text-[28px] font-black leading-none">82<span className="text-sm text-ss-muted">/100</span></div>
              <div className="text-[10px] text-ss-muted mt-1">Stable ce mois</div>
            </div>
            <div className="bg-ss-card border border-ss-border rounded-[14px] p-3.5">
              <div className="text-[10px] text-ss-muted font-bold tracking-wider mb-1.5">CLASSEMENT LOCAL</div>
              <div className="text-[28px] font-black leading-none">#2<span className="text-sm text-ss-muted">/7</span></div>
              <div className="text-[10px] text-ss-muted mt-1">Bars du centre-ville</div>
            </div>
          </div>

          {/* Sources */}
          <p className="text-[11px] text-ss-muted font-bold tracking-wider mb-2.5">SOURCES DE CONSULTATION</p>
          <div className="bg-ss-card border border-ss-border rounded-[14px] overflow-hidden mb-4">
            {[
              { icon: "📱", name: "Application Spotysafe", pct: 58, color: "bg-ss-green", textColor: "text-ss-green" },
              { icon: "🔷", name: "Scan QR badge vitrine", pct: 16, color: "bg-ss-gold", textColor: "text-ss-gold" },
              { icon: "🗺️", name: "Google Maps", pct: 18, color: "bg-ss-blue", textColor: "text-ss-blue" },
              { icon: "🌐", name: "Recherche web directe", pct: 8, color: "bg-ss-muted", textColor: "text-ss-muted" },
            ].map((s, i, arr) => (
              <div key={s.name} className={`px-4 py-3 flex items-center gap-3 ${i < arr.length - 1 ? "border-b border-ss-border" : ""}`}>
                <span className="text-lg">{s.icon}</span>
                <div className="flex-1">
                  <div className="flex justify-between mb-1.5">
                    <span className="text-xs font-semibold">{s.name}</span>
                    <span className={`text-xs font-bold ${s.textColor}`}>{s.pct}%</span>
                  </div>
                  <div className="bg-ss-border rounded h-1"><div className={`h-full rounded ${s.color}`} style={{ width: `${s.pct}%` }} /></div>
                </div>
              </div>
            ))}
          </div>

          {/* Competitors */}
          <p className="text-[11px] text-ss-muted font-bold tracking-wider mb-2.5">COMPARATIF CONCURRENTS</p>
          <div className="bg-ss-card border border-ss-border rounded-[14px] overflow-hidden mb-4">
            {[
              { name: "Vous — Bar du Centre", score: 82, isYou: true },
              { name: "Le Vieux Murier", score: 82, dist: "170m" },
              { name: "La Guinguette", score: 85, dist: "330m", up: true },
              { name: "Le Petit Zinc", score: 71, dist: "420m" },
            ].map((c, i, arr) => (
              <div key={c.name} className={`px-4 py-3 ${c.isYou ? "bg-ss-green/5" : ""} ${i < arr.length - 1 ? "border-b border-ss-border" : ""}`}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className={`text-xs font-semibold ${c.isYou ? "text-ss-green font-bold" : ""}`}>
                    {c.isYou ? "📍 " : ""}{c.name} {!c.isYou && c.dist ? <span className="text-ss-muted text-[10px]">- {c.dist}</span> : ""}
                  </span>
                  <span className={`text-sm font-black ${c.score >= 80 ? (c.isYou ? "text-ss-green" : "") : "text-ss-orange"}`}>
                    {c.score}{c.up ? " ↑" : ""}
                  </span>
                </div>
                <div className="bg-ss-border rounded h-[5px]">
                  <div className={`h-full rounded ${c.isYou ? "bg-ss-green" : c.score >= 80 ? "bg-white/30" : "bg-ss-orange"}`} style={{ width: `${c.score}%` }} />
                </div>
              </div>
            ))}
          </div>

          {/* Conseil */}
          <div className="bg-ss-green/[0.06] border border-ss-green/20 rounded-xl p-3.5">
            <div className="text-[11px] text-ss-green font-bold mb-1.5">💡 CONSEIL SPOTYSAFE</div>
            <div className="text-[11px] text-ss-muted leading-relaxed">
              Votre score de 82/100 vous place dans le <strong className="text-ss-text">top 30%</strong> des bars de Tours. Corriger le point &quot;Detecteurs fumee&quot; vous ferait gagner <strong className="text-ss-green">+8 points</strong>.
            </div>
          </div>
        </div>
      )}

      {/* PARTNERS TAB */}
      {activeTab === "partners" && (
        <div className="px-6 pt-4 pb-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="font-[var(--font-syne)] text-[22px] font-extrabold">Partenaires agrees</h2>
              <p className="text-xs text-ss-muted mt-1">3 organismes - Tours & France</p>
            </div>
            <button onClick={() => setActiveTab("home")} className="text-[13px] text-ss-muted">&larr; Retour</button>
          </div>
          {[
            { name: "Apave Centre-Val de Loire", type: "Bureau de controle agree", logo: "🏢", badges: ["Agree Prefecture", "Tours", "ERP certifie"], delay: "Sous 5 jours", price: "A partir de 380€", services: ["Visite de securite ERP", "Rapport commission", "Suivi annuel"] },
            { name: "Bureau Veritas Centre", type: "Bureau de controle & certification", logo: "✅", badges: ["Agree Prefecture", "ERP certifie"], delay: "Sous 10 jours", price: "A partir de 450€", services: ["Controle reglementaire ERP", "Audit complet", "Rapport officiel"] },
            { name: "UMIH — Union des Metiers", type: "Federation professionnelle CHR", logo: "🏛", badges: ["Partenaire officiel", "30 000 gerants", "CHR France"], delay: "Contact immediat", price: "Partenaire officiel", services: ["Reseau 30 000 gerants", "Accompagnement reglementaire"] },
          ].map((p) => (
            <div key={p.name} className="bg-ss-card border border-ss-border rounded-[20px] p-[18px_20px] mb-3 cursor-pointer active:scale-[0.98] transition-all">
              <div className="flex items-start gap-3.5 mb-3">
                <div className="w-[52px] h-[52px] rounded-[14px] flex items-center justify-center text-2xl shrink-0 border border-ss-border bg-ss-bg3">{p.logo}</div>
                <div className="flex-1">
                  <div className="font-[var(--font-syne)] text-base font-bold mb-0.5">{p.name}</div>
                  <div className="text-xs text-ss-muted mb-1.5">{p.type}</div>
                  <div className="flex gap-1.5 flex-wrap">
                    {p.badges.map((b) => (
                      <span key={b} className="text-[10px] px-2 py-px rounded-md font-semibold bg-ss-green/10 text-ss-green border border-ss-green/20">{b}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="h-px bg-ss-border mb-3" />
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs text-ss-muted">⏱ {p.delay}</span>
                <span className="font-[var(--font-syne)] text-base font-bold">{p.price}</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-3.5">
                {p.services.map((s) => (
                  <span key={s} className="bg-ss-bg3 rounded-lg px-2.5 py-1 text-[11px] text-ss-muted">{s}</span>
                ))}
              </div>
              <div className="flex gap-2">
                <button onClick={() => showToast(`📞 Contact ${p.name}`)} className="flex-1 py-2.5 rounded-xl text-[13px] font-semibold bg-ss-green text-black cursor-pointer active:scale-[0.97] transition-all">Contacter</button>
                <button onClick={() => showToast(`📋 Devis demande`)} className="flex-1 py-2.5 rounded-xl text-[13px] font-semibold bg-ss-card border border-ss-border text-ss-text cursor-pointer active:scale-[0.97] transition-all">Devis</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* DOCUMENTS TAB */}
      {activeTab === "docs" && (
        <div className="px-6 pt-4 pb-6">
          <div className="flex justify-between items-center mb-1">
            <h2 className="font-[var(--font-syne)] text-[22px] font-extrabold">Certification</h2>
            <button onClick={() => setActiveTab("home")} className="text-[13px] text-ss-muted">&larr; Retour</button>
          </div>
          <p className="text-xs text-ss-muted mb-5">Bar du Centre - Tours</p>

          {/* Silver Badge */}
          <div className="bg-gradient-to-br from-[rgba(192,192,192,0.12)] to-[rgba(192,192,192,0.04)] border border-[rgba(192,192,192,0.35)] rounded-2xl p-[18px] mb-4">
            <div className="flex items-center gap-3.5 mb-3.5">
              <span className="text-5xl">🥈</span>
              <div className="flex-1">
                <div className="text-[11px] text-[#A8A8A8] font-bold tracking-wider mb-1">✓ BADGE ACTIF</div>
                <div className="text-base font-extrabold">SpotySAFE Silver</div>
                <div className="text-[11px] text-ss-muted mt-0.5">Auto-declaration - Visible sur votre fiche</div>
              </div>
            </div>
            <div className="bg-black/15 rounded-[10px] p-3 mb-3.5">
              <div className="text-[11px] text-ss-muted mb-1.5 leading-relaxed">Le badge <strong className="text-ss-text">Silver</strong> atteste que vous avez declare posseder les equipements de securite obligatoires.</div>
              <div className="text-[10px] text-ss-muted italic mt-2">💡 Passez au badge <strong className="text-ss-gold">Gold</strong> en telechargeant vos certificats d&apos;organismes agrees.</div>
            </div>
            <button onClick={() => showToast("🏆 Demarrez le processus Gold")} className="w-full bg-gradient-to-r from-ss-gold to-[#D4A030] text-black border-none rounded-[10px] py-3 text-[13px] font-bold cursor-pointer">🏆 Passer au badge Gold</button>
          </div>

          {/* IA Extraction demo */}
          <div className="bg-gradient-to-br from-ss-purple/12 to-ss-purple/[0.04] border border-ss-purple/30 rounded-xl p-4">
            <div className="flex items-start gap-3 mb-3">
              <span className="text-[32px]">✨</span>
              <div className="flex-1">
                <div className="text-xs font-bold text-ss-purple mb-1.5">EXTRACTION AUTOMATIQUE PAR IA</div>
                <div className="text-[11px] text-ss-muted leading-relaxed">
                  Telechargez simplement vos documents — notre IA analyse automatiquement les certificats et extrait les donnees cles.
                </div>
              </div>
            </div>
            <button onClick={() => showToast("📤 Demo IA - extraction en cours...")} className="w-full bg-ss-purple/20 text-ss-purple border border-ss-purple/40 rounded-lg py-2.5 text-[11px] font-bold cursor-pointer">📤 Tester l&apos;extraction IA</button>
          </div>
        </div>
      )}

      {/* SETTINGS TAB */}
      {activeTab === "settings" && (
        <div className="px-6 pt-4 pb-6">
          <div className="flex justify-between items-center mb-5">
            <h2 className="font-[var(--font-syne)] text-[22px] font-extrabold">Reglages</h2>
            <button onClick={() => setActiveTab("home")} className="text-[13px] text-ss-muted">&larr; Retour</button>
          </div>
          <div className="text-center py-10 text-ss-muted">
            <span className="text-5xl block mb-4">⚙️</span>
            <p className="text-[13px]">Gerez votre profil et vos preferences</p>
          </div>
        </div>
      )}

      <TabBar tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

export default function BarOwnerPage() {
  return (
    <ToastProvider>
      <BarOwnerContent />
    </ToastProvider>
  );
}
