interface ScoreBarProps {
  score: number;
  height?: number;
  showLabel?: boolean;
}

export function ScoreBar({ score, height = 6, showLabel = true }: ScoreBarProps) {
  const isGreen = score >= 80;

  return (
    <div className="flex items-center gap-2.5">
      <div className="flex-1 rounded-full overflow-hidden" style={{ height, background: "rgba(255,255,255,0.06)" }}>
        <div
          className={`h-full rounded-full transition-all duration-800 ${
            isGreen
              ? "bg-gradient-to-r from-ss-green-dark to-ss-green"
              : "bg-gradient-to-r from-[#CC7000] to-ss-orange"
          }`}
          style={{ width: `${score}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-xs text-ss-muted w-8 text-right">{score}%</span>
      )}
    </div>
  );
}
