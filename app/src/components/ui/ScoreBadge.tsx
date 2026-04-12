interface ScoreBadgeProps {
  score: number;
  size?: "sm" | "md" | "lg";
}

export function ScoreBadge({ score, size = "md" }: ScoreBadgeProps) {
  const isGreen = score >= 80;
  const color = isGreen ? "ss-green" : "ss-orange";

  const sizeClasses = {
    sm: "px-2 py-1 text-sm",
    md: "px-3.5 py-2 min-w-[62px]",
    lg: "px-5 py-3 min-w-[80px]",
  };

  return (
    <div className={`flex flex-col items-center rounded-[14px] border ${sizeClasses[size]} ${
      isGreen
        ? "bg-ss-green/10 border-ss-green/25"
        : "bg-ss-orange/10 border-ss-orange/25"
    }`}>
      <div className={`font-[var(--font-syne)] font-extrabold leading-none ${
        size === "lg" ? "text-5xl" : size === "md" ? "text-[22px]" : "text-base"
      } text-${color}`}>
        {score}
      </div>
      <div className="text-[10px] text-ss-muted mt-0.5">/100</div>
    </div>
  );
}
