"use client";

import { useState, useEffect, useCallback } from "react";
import { Logo } from "@/components/ui/Logo";
import { ScoreBadge } from "@/components/ui/ScoreBadge";
import { ScoreBar } from "@/components/ui/ScoreBar";
import { Card } from "@/components/ui/Card";
import { FilterPills } from "@/components/ui/FilterPills";
import { TabBar } from "@/components/ui/TabBar";
import { BackButton } from "@/components/ui/BackButton";
import { ToastProvider, useToast } from "@/components/ui/Toast";
import Link from "next/link";

interface BarDetail {
  label: string;
  value: string;
  status: string;
}

interface Bar {
  id: string;
  name: string;
  address: string;
  city: string;
  type: string;
  score: number;
  lat: number;
  lng: number;
  isOpen: boolean;
  distance: string;
  capacity: number;
  certifications: string;
  details: string;
}

const MAP_ICON = (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M11 2C7.7 2 5 4.7 5 8c0 4.5 6 12 6 12s6-7.5 6-12c0-3.3-2.7-6-6-6z" stroke="#00C878" strokeWidth="1.7" fill="rgba(0,200,120,.18)"/><circle cx="11" cy="8" r="2" fill="#00C878"/></svg>
);
const FAV_ICON = (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M11 18s-8-5.3-8-10a5 5 0 0110 0 5 5 0 0110 0c0 4.7-8 10-8 10z" stroke="#FF6B8A" strokeWidth="1.7" strokeLinejoin="round" fill="rgba(255,107,138,.12)"/></svg>
);
const SEARCH_ICON = (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="10" cy="10" r="5.5" stroke="#3B82F6" strokeWidth="1.7" fill="rgba(59,130,246,.12)"/><path d="M14.5 14.5l4 4" stroke="#3B82F6" strokeWidth="1.9" strokeLinecap="round"/></svg>
);
const ALERT_ICON = (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M11 3a6 6 0 016 6v4l2 2H3l2-2V9a6 6 0 016-6z" stroke="#E8B84B" strokeWidth="1.7" strokeLinejoin="round" fill="rgba(232,184,75,.12)"/><path d="M9 17a2 2 0 004 0" stroke="#E8B84B" strokeWidth="1.6"/></svg>
);
const PROFILE_ICON = (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="8" r="3.8" stroke="#A064FF" strokeWidth="1.7" fill="rgba(160,100,255,.12)"/><path d="M3 21c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="#A064FF" strokeWidth="1.7" strokeLinecap="round"/></svg>
);

const TABS = [
  { id: "map", icon: MAP_ICON, label: "Carte", color: "ss-green" },
  { id: "favorites", icon: FAV_ICON, label: "Favoris" },
  { id: "search", icon: SEARCH_ICON, label: "Chercher" },
  { id: "alerts", icon: ALERT_ICON, label: "Alertes", badge: 3 },
  { id: "profile", icon: PROFILE_ICON, label: "Profil" },
];

const FILTERS = [
  { id: "tous", label: "Tous" },
  { id: "top", label: "Score > 85" },
  { id: "warning", label: "Risque" },
  { id: "tours", label: "Tours" },
  { id: "paris", label: "Paris" },
  { id: "open", label: "Ouvert" },
];

function ClientContent() {
  const [activeTab, setActiveTab] = useState("map");
  const [bars, setBars] = useState<Bar[]>([]);
  const [filter, setFilter] = useState("tous");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBar, setSelectedBar] = useState<Bar | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    fetch("/api/bars")
      .then((r) => r.json())
      .then(setBars)
      .catch(() => {});
  }, []);

  const filteredBars = bars.filter((bar) => {
    if (filter === "top") return bar.score >= 85;
    if (filter === "warning") return bar.score < 80;
    if (filter === "tours") return bar.city === "Tours";
    if (filter === "paris") return bar.city === "Paris";
    if (filter === "open") return bar.isOpen;
    return true;
  });

  const searchResults = bars.filter((bar) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return bar.name.toLowerCase().includes(q) || bar.address.toLowerCase().includes(q) || bar.city.toLowerCase().includes(q);
  });

  const toggleFavorite = useCallback((barId: string) => {
    setFavorites((prev) => {
      if (prev.includes(barId)) {
        showToast("Retire des favoris");
        return prev.filter((id) => id !== barId);
      } else {
        showToast("Ajoute aux favoris !");
        return [...prev, barId];
      }
    });
  }, [showToast]);

  const toursBars = filteredBars.filter((b) => b.city === "Tours");
  const parisBars = filteredBars.filter((b) => b.city === "Paris");

  const parseCertifications = (certStr: string): string[] => {
    try { return JSON.parse(certStr); } catch { return []; }
  };

  const parseDetails = (detStr: string): BarDetail[] => {
    try { return JSON.parse(detStr); } catch { return []; }
  };

  return (
    <div className="min-h-screen bg-ss-bg pb-24 max-w-md mx-auto">
      {/* Header */}
      <div className="px-6 pt-4 pb-5 bg-gradient-to-b from-ss-green/5 to-transparent">
        <div className="flex justify-between items-center mb-5">
          <Logo size="small" />
          <BackButton href="/" />
        </div>

        {activeTab === "map" && (
          <>
            <div className="inline-flex items-center gap-1.5 bg-ss-green/10 border border-ss-green/25 rounded-full px-3.5 py-2 text-[13px] text-ss-green mb-4">
              <div className="w-[7px] h-[7px] bg-ss-green rounded-full animate-blink" />
              Tours — Pilote beta
            </div>
            <h1 className="font-[var(--font-syne)] text-[22px] font-extrabold mb-1">Bars pres de vous</h1>
            <div className="flex items-center justify-between gap-2">
              <span className="text-[13px] text-ss-muted">{bars.length} etablissements - Tours & Paris</span>
              <Link href="/soiree" className="flex items-center gap-1 bg-gradient-to-r from-[#6030CC] to-ss-purple text-white rounded-full py-1 px-3 text-[11px] font-bold shadow-[0_2px_12px_rgba(160,100,255,.3)] shrink-0">
                Soiree
              </Link>
            </div>
            <div className="mt-3">
              <FilterPills filters={FILTERS} active={filter} onChange={setFilter} />
            </div>
          </>
        )}
      </div>

      {/* MAP TAB */}
      {activeTab === "map" && (
        <>
          {/* Map placeholder */}
          <div className="mx-6 mb-5 rounded-[20px] overflow-hidden h-[180px] bg-ss-card border border-ss-border relative">
            <div className="w-full h-full flex items-center justify-center text-ss-muted text-sm">
              <div className="text-center">
                <div className="text-3xl mb-2">🗺️</div>
                <div>Carte interactive</div>
                <div className="text-[10px] mt-1">Tours & Paris</div>
              </div>
            </div>
          </div>

          {/* Tours bars */}
          {toursBars.length > 0 && (
            <div className="px-6 flex flex-col gap-3.5 mb-6">
              {toursBars.map((bar, i) => (
                <div key={bar.id} className="animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
                  <Card accentColor={bar.score >= 80 ? "green" : "orange"} onClick={() => setSelectedBar(bar)}>
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="font-[var(--font-syne)] text-[17px] font-bold">{bar.name}</div>
                        <div className="text-xs text-ss-muted mt-0.5">{bar.type} — {bar.address}</div>
                      </div>
                      <ScoreBadge score={bar.score} />
                    </div>
                    <ScoreBar score={bar.score} />
                    <div className="flex gap-4 text-xs text-ss-muted mt-2.5">
                      <span>📍 {bar.distance}</span>
                      <span>{bar.isOpen ? "🕐 Ouvert" : "🕐 Ferme"}</span>
                      <span>👥 ~{bar.capacity} pers.</span>
                    </div>
                    <div className="flex gap-1.5 flex-wrap mt-2.5">
                      {parseCertifications(bar.certifications).map((c, j) => (
                        <span key={j} className="bg-ss-green/8 border border-ss-green/15 rounded-lg px-2 py-0.5 text-[11px] text-ss-green">
                          ✓ {c}
                        </span>
                      ))}
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          )}

          {/* Paris section */}
          {parisBars.length > 0 && (
            <>
              <div className="px-6 mb-2">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <h2 className="font-[var(--font-syne)] text-[22px] font-extrabold">Paris — Beta</h2>
                  <span className="bg-ss-gold/12 border border-ss-gold/30 text-ss-gold text-[9px] font-bold py-0.5 px-2 rounded-full tracking-wide">PILOTE PARIS</span>
                </div>
                <p className="text-[13px] text-ss-muted">{parisBars.length} etablissements - Marais & Oberkampf</p>
              </div>
              <div className="px-6 flex flex-col gap-3.5 pb-6">
                {parisBars.map((bar) => (
                  <Card key={bar.id} accentColor={bar.score >= 80 ? "green" : "orange"} onClick={() => setSelectedBar(bar)}>
                    <div className="absolute top-2.5 right-2.5 bg-ss-gold/12 border border-ss-gold/30 text-ss-gold text-[8px] font-bold py-0.5 px-2 rounded-full">Paris</div>
                    <div className="flex justify-between items-start mb-3 pr-16">
                      <div>
                        <div className="font-[var(--font-syne)] text-[17px] font-bold">{bar.name}</div>
                        <div className="text-xs text-ss-muted mt-0.5">{bar.type} — {bar.address}</div>
                      </div>
                      <ScoreBadge score={bar.score} />
                    </div>
                    <ScoreBar score={bar.score} />
                    <div className="flex gap-4 text-xs text-ss-muted mt-2.5">
                      <span>📍 {bar.distance}</span>
                      <span>{bar.isOpen ? "🕐 Ouvert" : "🕐 Ferme"}</span>
                      <span>👥 ~{bar.capacity} pers.</span>
                    </div>
                    <div className="flex gap-1.5 flex-wrap mt-2.5">
                      {parseCertifications(bar.certifications).map((c, j) => (
                        <span key={j} className="bg-ss-green/8 border border-ss-green/15 rounded-lg px-2 py-0.5 text-[11px] text-ss-green">
                          ✓ {c}
                        </span>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </>
          )}
        </>
      )}

      {/* FAVORITES TAB */}
      {activeTab === "favorites" && (
        <div className="px-6">
          <div className="flex justify-between items-center py-4">
            <h2 className="font-[var(--font-syne)] text-[22px] font-extrabold">Mes favoris</h2>
            <span className="text-[11px] text-ss-muted">{favorites.length} bar{favorites.length !== 1 ? "s" : ""}</span>
          </div>
          {favorites.length === 0 ? (
            <div className="text-center py-16 text-ss-muted">
              <div className="text-5xl mb-3">⭐</div>
              <div className="text-sm font-semibold text-ss-text mb-1.5">Aucun favori</div>
              <div className="text-xs">Appuyez sur un bar pour le sauvegarder</div>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {bars.filter((b) => favorites.includes(b.id)).map((bar) => (
                <Card key={bar.id} onClick={() => setSelectedBar(bar)}>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-[10px] flex items-center justify-center font-black text-[15px] ${bar.score >= 80 ? "bg-ss-green/15 text-ss-green" : "bg-ss-orange/15 text-ss-orange"}`}>
                      {bar.score}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-bold">{bar.name}</div>
                      <div className="text-[11px] text-ss-muted">{bar.city} - {bar.address}</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SEARCH TAB */}
      {activeTab === "search" && (
        <div className="px-6">
          <h2 className="font-[var(--font-syne)] text-[22px] font-extrabold mb-3 pt-4">Rechercher</h2>
          <div className="flex items-center gap-2.5 bg-ss-card border border-ss-border rounded-2xl px-4 py-3 mb-4">
            <span className="text-lg">🔍</span>
            <input
              type="text"
              placeholder="Nom, adresse, ville..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-[15px] text-ss-text placeholder:text-ss-muted font-[var(--font-dm)]"
            />
          </div>
          <div className="flex flex-col gap-3">
            {searchResults.map((bar) => (
              <Card key={bar.id} onClick={() => setSelectedBar(bar)}>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-[10px] flex items-center justify-center font-black text-[15px] ${bar.score >= 80 ? "bg-ss-green/15 text-ss-green" : "bg-ss-orange/15 text-ss-orange"}`}>
                    {bar.score}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-bold">{bar.name}</div>
                    <div className="text-[11px] text-ss-muted">{bar.type} - {bar.address}, {bar.city}</div>
                  </div>
                </div>
              </Card>
            ))}
            {searchResults.length === 0 && searchQuery && (
              <div className="text-center py-10 text-ss-muted">
                <div className="text-4xl mb-2.5">🔍</div>
                <div className="text-[13px]">Aucun resultat</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ALERTS TAB */}
      {activeTab === "alerts" && (
        <div className="px-5">
          <div className="py-5">
            <h2 className="font-[var(--font-syne)] text-lg font-extrabold">Mes alertes score</h2>
            <p className="text-xs text-ss-muted mt-0.5">Soyez notifie des qu&apos;un score change</p>
          </div>
          {/* Toggle */}
          <div className="bg-ss-card border border-ss-border rounded-2xl p-4 mb-4 flex items-center justify-between">
            <div>
              <div className="text-sm font-bold">Alertes activees</div>
              <div className="text-[11px] text-ss-muted mt-0.5">Notifications push en temps reel</div>
            </div>
            <div className="w-11 h-6 bg-ss-green rounded-full relative cursor-pointer">
              <div className="absolute top-[3px] right-[3px] w-[18px] h-[18px] bg-white rounded-full" />
            </div>
          </div>
          {/* Demo alerts */}
          <p className="text-xs font-bold text-ss-muted tracking-wider uppercase mb-2.5">Alertes recentes</p>
          <div className="bg-ss-card rounded-[14px] p-3.5 mb-2.5 flex items-start gap-3 border-l-[3px] border-l-[#FF6B6B]">
            <span className="text-[22px] pt-0.5">📉</span>
            <div className="flex-1">
              <div className="text-[13px] font-bold">Le Vieux Murier <span className="bg-[rgba(255,107,107,0.15)] text-[#FF6B6B] rounded-md px-1.5 py-px text-[10px] font-extrabold ml-1.5">-9 pts</span></div>
              <div className="text-xs text-ss-muted">Score passe de 91 → 82 apres controle</div>
              <div className="text-[10px] text-ss-muted mt-1 opacity-70">Il y a 2h - Tours</div>
            </div>
          </div>
          <div className="bg-ss-card rounded-[14px] p-3.5 mb-2.5 flex items-start gap-3 border-l-[3px] border-l-ss-green">
            <span className="text-[22px] pt-0.5">📈</span>
            <div className="flex-1">
              <div className="text-[13px] font-bold">Cafe Promenade <span className="bg-ss-green/12 text-ss-green rounded-md px-1.5 py-px text-[10px] font-extrabold ml-1.5">+12 pts</span></div>
              <div className="text-xs text-ss-muted">Score passe de 71 → 83 apres audit</div>
              <div className="text-[10px] text-ss-muted mt-1 opacity-70">Hier - Tours</div>
            </div>
          </div>
          <div className="bg-ss-card rounded-[14px] p-3.5 mb-2.5 flex items-start gap-3 border-l-[3px] border-l-[#FF3B3B] bg-[rgba(255,59,59,0.05)]">
            <span className="text-[22px] pt-0.5">🚨</span>
            <div className="flex-1">
              <div className="text-[13px] font-bold">Chez Marcel <span className="bg-[rgba(255,59,59,0.15)] text-[#FF3B3B] rounded-md px-1.5 py-px text-[10px] font-extrabold ml-1.5">Score critique</span></div>
              <div className="text-xs text-ss-muted">Score tombe a 48 — certification suspendue</div>
              <div className="text-[10px] text-ss-muted mt-1 opacity-70">Il y a 3j - Paris</div>
            </div>
          </div>
        </div>
      )}

      {/* PROFILE TAB */}
      {activeTab === "profile" && (
        <div className="px-6">
          <div className="py-4">
            <h2 className="font-[var(--font-syne)] text-[22px] font-extrabold mb-1">Mon profil</h2>
            <p className="text-xs text-ss-muted">Utilisateur Spotysafe</p>
          </div>
          <div className="text-center mb-6">
            <div className="w-[72px] h-[72px] rounded-full bg-gradient-to-br from-ss-green/20 to-ss-green/5 border-2 border-ss-green/30 flex items-center justify-center text-[32px] mx-auto mb-2.5">👤</div>
            <div className="text-[15px] font-bold">Utilisateur</div>
            <div className="text-[11px] text-ss-muted mt-0.5">Membre depuis fev. 2026</div>
          </div>
          <div className="grid grid-cols-3 gap-2.5 mb-5">
            <div className="bg-ss-card border border-ss-border rounded-xl p-3 text-center">
              <div className="text-[22px] font-black text-ss-green">{favorites.length}</div>
              <div className="text-[9px] text-ss-muted mt-0.5">Favoris</div>
            </div>
            <div className="bg-ss-card border border-ss-border rounded-xl p-3 text-center">
              <div className="text-[22px] font-black">{bars.length}</div>
              <div className="text-[9px] text-ss-muted mt-0.5">Fiches vues</div>
            </div>
            <div className="bg-ss-card border border-ss-border rounded-xl p-3 text-center">
              <div className="text-[22px] font-black text-ss-gold">84</div>
              <div className="text-[9px] text-ss-muted mt-0.5">Score moy.</div>
            </div>
          </div>
          <p className="text-[11px] text-ss-muted font-bold tracking-wider mb-2.5">PARAMETRES</p>
          <div className="bg-ss-card border border-ss-border rounded-[14px] overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3.5 border-b border-ss-border cursor-pointer" onClick={() => showToast("Notifications activees")}>
              <span className="text-[13px]">Notifications de score</span>
              <span className="text-[11px] text-ss-green font-bold">Activees</span>
            </div>
            <div className="flex items-center justify-between px-4 py-3.5 cursor-pointer" onClick={() => showToast("Rayon mis a jour")}>
              <span className="text-[13px]">Rayon d&apos;alerte</span>
              <span className="text-[11px] text-ss-muted">500m ›</span>
            </div>
          </div>
        </div>
      )}

      {/* DETAIL MODAL */}
      {selectedBar && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[200] flex items-end max-w-md mx-auto" onClick={() => setSelectedBar(null)}>
          <div className="w-full bg-ss-bg2 rounded-t-[28px] border-t border-ss-border p-6 pb-10 max-h-[80vh] overflow-y-auto no-scrollbar" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-9 h-1 bg-white/15 rounded-full" />
              <button onClick={() => setSelectedBar(null)} className="bg-white/8 border-none text-ss-text text-[13px] px-3.5 py-1.5 rounded-[10px] cursor-pointer">✕ Fermer</button>
            </div>
            <h3 className="font-[var(--font-syne)] text-2xl font-extrabold mb-1">{selectedBar.name}</h3>
            <p className="text-[13px] text-ss-muted mb-5">{selectedBar.address} - {selectedBar.type}</p>

            <div className="flex items-center gap-4 mb-6 bg-ss-card rounded-[18px] p-4 border border-ss-border">
              <ScoreBadge score={selectedBar.score} size="lg" />
              <div className="flex-1">
                <div className="text-[13px] text-ss-muted mb-1.5">Score de securite ERP</div>
                <ScoreBar score={selectedBar.score} height={8} />
              </div>
            </div>

            <h4 className="font-[var(--font-syne)] text-sm font-bold text-ss-muted uppercase tracking-wider mb-3">Details du certificat</h4>
            <div className="grid grid-cols-2 gap-2.5 mb-5">
              {parseDetails(selectedBar.details).map((d, i) => (
                <div key={i} className="bg-ss-card border border-ss-border rounded-[14px] px-3.5 py-3">
                  <div className="text-[11px] text-ss-muted mb-1">{d.label}</div>
                  <div className={`text-sm font-semibold ${d.status === "green" ? "text-ss-green" : d.status === "orange" ? "text-ss-orange" : d.status === "red" ? "text-ss-red" : ""}`}>
                    {d.status === "green" ? "✓ " : d.status === "orange" ? "⚠ " : d.status === "red" ? "✗ " : ""}{d.value}
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full bg-ss-green text-black font-[var(--font-syne)] text-base font-bold border-none rounded-2xl py-4 cursor-pointer flex items-center justify-center gap-2 active:scale-[0.97] active:bg-ss-green-dark transition-all mb-2.5">
              🗺️ Y aller
            </button>
            <button onClick={() => { toggleFavorite(selectedBar.id); }} className="w-full bg-ss-card text-ss-text border border-ss-border rounded-2xl py-4 cursor-pointer text-sm font-semibold active:scale-[0.97] transition-all">
              ⭐ Sauvegarder
            </button>
          </div>
        </div>
      )}

      <TabBar tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

export default function ClientPage() {
  return (
    <ToastProvider>
      <ClientContent />
    </ToastProvider>
  );
}
