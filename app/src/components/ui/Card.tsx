import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  accentColor?: "green" | "orange" | "purple" | "gold";
}

export function Card({ children, className = "", onClick, accentColor }: CardProps) {
  const accentBorder = accentColor === "green" ? "border-l-ss-green"
    : accentColor === "orange" ? "border-l-ss-orange"
    : accentColor === "purple" ? "border-l-ss-purple"
    : accentColor === "gold" ? "border-l-ss-gold"
    : "";

  return (
    <div
      onClick={onClick}
      className={`bg-ss-card border border-ss-border rounded-[20px] p-[18px_20px] relative overflow-hidden transition-all duration-200 ${
        accentColor ? `border-l-[3px] ${accentBorder}` : ""
      } ${onClick ? "cursor-pointer active:scale-[0.98]" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
