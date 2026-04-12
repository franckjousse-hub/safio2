"use client";

import { Logo } from "@/components/ui/Logo";
import { ToastProvider } from "@/components/ui/Toast";
import Link from "next/link";

const roles = [
  {
    id: "client",
    href: "/client",
    title: "Je suis un client",
    desc: "Trouvez des bars securises pres de vous — pilote Tours & Paris",
    iconBg: "linear-gradient(135deg,#003d22,#005c34)",
    borderColor: "rgba(0,200,120,0.2)",
    arrowColor: "#00C878",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 3L5 8v5c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V8L14 3z" fill="rgba(0,200,120,.2)" stroke="#00C878" strokeWidth="1.7"/>
        <path d="M10 14l3 3 5-5" stroke="#00C878" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: "barowner",
    href: "/barowner",
    title: "Je gere un etablissement",
    desc: "Gratuit - Score public + badge vitrine certifie",
    iconBg: "linear-gradient(135deg,#3d2e00,#5c4500)",
    borderColor: "rgba(232,184,75,0.2)",
    arrowColor: "#E8B84B",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 3l2.5 5H22l-4.1 3 1.6 5L14 13l-5.5 3 1.6-5L6 8h5.5z" fill="rgba(232,184,75,.25)" stroke="#E8B84B" strokeWidth="1.6"/>
        <rect x="9" y="16" width="10" height="9" rx="2" stroke="#E8B84B" strokeWidth="1.7"/>
        <path d="M11 16v-2.5a3 3 0 016 0V16" stroke="#E8B84B" strokeWidth="1.7" strokeLinecap="round"/>
        <circle cx="14" cy="21" r="1.4" fill="#E8B84B"/>
      </svg>
    ),
  },
  {
    id: "parent",
    href: "/parent",
    title: "Je suis parent",
    desc: "Suivez la position de votre enfant - Sachez s'il est dans un lieu securise",
    iconBg: "linear-gradient(135deg,#1a003d,#2d0060)",
    borderColor: "rgba(160,100,255,0.25)",
    arrowColor: "#A064FF",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="10" cy="9" r="3.8" fill="rgba(160,100,255,.25)" stroke="#A064FF" strokeWidth="1.7"/>
        <path d="M3 23c0-3.8 3-6.8 7-6.8" stroke="#A064FF" strokeWidth="1.7" strokeLinecap="round"/>
        <circle cx="20" cy="11" r="2.8" stroke="#00C878" strokeWidth="1.5"/>
        <path d="M14 23c0-3.2 2.7-5.8 6-5.8S26 19.8 26 23" stroke="#00C878" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
];

export default function SplashPage() {
  return (
    <ToastProvider>
      <div className="min-h-screen bg-ss-bg flex flex-col items-center">
        <div className="w-full max-w-md mx-auto relative">
          {/* Background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full bg-[radial-gradient(ellipse,rgba(0,232,122,0.15),transparent_70%)] pointer-events-none" />

          {/* Floating orb */}
          <div className="absolute top-[60px] left-1/2 -translate-x-1/2 w-[180px] h-[180px] rounded-full bg-[radial-gradient(circle,rgba(0,232,122,0.3),transparent_70%)] animate-float blur-[20px] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center pt-16 px-7 pb-12">
            {/* Logo */}
            <div className="mb-3">
              <Logo size="large" />
            </div>
            <p className="text-ss-muted text-[13px] tracking-wider mb-16">
              Parce que chaque sortie compte
            </p>

            {/* Role cards */}
            <div className="flex flex-col gap-3.5 w-full">
              {roles.map((role) => (
                <Link
                  key={role.id}
                  href={role.href}
                  className="bg-ss-card border border-ss-border rounded-[20px] p-[22px_24px] flex items-center gap-[18px] transition-all duration-250 relative overflow-hidden active:scale-[0.97] hover:border-[var(--hover-border)] group"
                  style={{ borderColor: role.borderColor } as React.CSSProperties}
                >
                  <div
                    className="w-[52px] h-[52px] rounded-2xl flex items-center justify-center shrink-0"
                    style={{ background: role.iconBg }}
                  >
                    {role.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-[var(--font-syne)] text-[17px] font-bold mb-0.5">
                      {role.title}
                    </div>
                    <div className="text-[13px] text-ss-muted leading-snug">
                      {role.desc}
                    </div>
                  </div>
                  <div className="text-lg" style={{ color: role.arrowColor }}>
                    ›
                  </div>
                </Link>
              ))}
            </div>

            {/* Admin button (discreet) */}
            <div className="mt-3 text-center">
              <Link
                href="/admin"
                className="inline-flex items-center gap-1.5 py-1.5 px-3.5 bg-white/[0.03] border border-white/[0.07] rounded-full text-[11px] font-semibold tracking-wider text-ss-text/30 hover:border-ss-red/20 hover:text-ss-red/50 transition-all"
              >
                <svg width="12" height="12" viewBox="0 0 28 28" fill="none" className="opacity-50">
                  <circle cx="10" cy="13" r="5.5" stroke="currentColor" strokeWidth="2.2"/>
                  <circle cx="10" cy="13" r="2" fill="currentColor"/>
                  <path d="M14 15.5L23 20.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
                </svg>
                Administration
              </Link>
            </div>

            {/* Footer */}
            <p className="mt-6 text-xs text-ss-text/25 text-center leading-relaxed">
              Donnees ERP - Certificats de securite<br />
              Gratuit pour les gerants - Transparent pour tous
            </p>
          </div>
        </div>
      </div>
    </ToastProvider>
  );
}
