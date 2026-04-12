"use client";

interface FilterPillsProps {
  filters: { id: string; label: string }[];
  active: string;
  onChange: (id: string) => void;
}

export function FilterPills({ filters, active, onChange }: FilterPillsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onChange(filter.id)}
          className={`rounded-full px-3.5 py-1.5 text-xs whitespace-nowrap transition-all active:scale-95 border ${
            filter.id === active
              ? "bg-ss-green/12 border-ss-green/35 text-ss-green"
              : "bg-ss-card border-ss-border text-ss-muted"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
