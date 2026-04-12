export function Logo({ size = "large" }: { size?: "large" | "small" }) {
  if (size === "small") {
    return (
      <div className="font-[var(--font-syne)] text-[22px] font-black tracking-tight">
        <span className="text-ss-text/65 font-light">Spoty</span>
        <span className="text-ss-green font-extrabold uppercase tracking-wide">SAFE</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <svg width="208" height="52" viewBox="0 0 310 76" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="Lgo" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#F5D07A"/><stop offset="50%" stopColor="#E8B84B"/><stop offset="100%" stopColor="#C9962A"/></linearGradient>
          <linearGradient id="Lgf" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#00C878" stopOpacity=".18"/><stop offset="100%" stopColor="#00C878" stopOpacity=".04"/></linearGradient>
          <filter id="Lgg"><feGaussianBlur stdDeviation="5"/></filter>
        </defs>
        <ellipse cx="35" cy="40" rx="28" ry="22" fill="#C9962A" opacity=".12" filter="url(#Lgg)"/>
        <path d="M35 5 L62 38 L35 71 L8 38 Z" fill="url(#Lgf)"/>
        <path d="M35 5 L62 38 L35 71 L8 38 Z" fill="none" stroke="url(#Lgo)" strokeWidth="2.2"/>
        <path d="M35 5 L35 38 M8 38 L62 38 M35 38 L35 71" stroke="url(#Lgo)" strokeWidth=".6" opacity=".4"/>
        <path d="M25 28 C25 24.7 27.7 22 31 22 L39 22 C42.3 22 45 24.7 45 28 C45 31.3 42.3 34 39 34 L31 34 C27.7 34 25 36.7 25 40 C25 43.3 27.7 46 31 46 L39 46 C42.3 46 45 43.3 45 40" stroke="#00C878" strokeWidth="2.8" strokeLinecap="round" fill="none"/>
        <circle cx="35" cy="7" r="2.4" fill="url(#Lgo)"/>
        <circle cx="35" cy="69" r="2" fill="url(#Lgo)" opacity=".8"/>
        <circle cx="10" cy="38" r="1.5" fill="url(#Lgo)" opacity=".6"/>
        <circle cx="60" cy="38" r="1.5" fill="url(#Lgo)" opacity=".6"/>
        <text x="77" y="44" fontFamily="Syne,sans-serif" fontWeight="900" fontSize="34" letterSpacing="-1">
          <tspan fill="rgba(240,240,248,0.65)" fontWeight="300">Spoty</tspan><tspan fill="#00C878" fontWeight="900">SAFE</tspan>
        </text>
        <circle cx="170" cy="14" r="4.2" fill="url(#Lgo)"/>
      </svg>
    </div>
  );
}
