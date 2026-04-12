"use client";

import { ReactNode } from "react";

interface TabItem {
  id: string;
  icon: ReactNode;
  label: string;
  color?: string;
  badge?: number;
}

interface TabBarProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function TabBar({ tabs, activeTab, onTabChange }: TabBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-[84px] bg-ss-bg/97 backdrop-blur-xl border-t border-ss-border flex items-start pt-3 z-[200] safe-bottom">
      <div className="flex w-full app-container">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="flex-1 flex flex-col items-center gap-1 cursor-pointer py-1 relative sm:flex-row sm:justify-center sm:gap-2"
            >
              <div className={`text-[22px] flex items-center justify-center w-7 h-7 transition-opacity ${isActive ? "opacity-100" : "opacity-40"}`}>
                {tab.icon}
              </div>
              <span className={`text-[10px] sm:text-xs ${isActive ? `text-${tab.color || "ss-green"}` : "text-ss-muted"}`}>
                {tab.label}
              </span>
              {tab.badge && tab.badge > 0 && (
                <span className="absolute top-1.5 right-3.5 sm:top-0 sm:right-auto sm:relative bg-ss-gold text-[#07080F] rounded-full text-[9px] font-black px-1.5 py-px">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
