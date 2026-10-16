'use client';

import React from 'react';
import { SITUATION_PROMPTS, SituationPrompt } from '@/lib/counselor-data';

interface QuickChipsProps {
  onSelect: (promptText: string, situationId: string) => void;
  disabled?: boolean;
}

export function QuickChips({ onSelect, disabled }: QuickChipsProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2 px-1">
        <span className="text-xs font-semibold text-stone-500 tracking-wide flex items-center gap-1.5">
          <span>⚡</span>
          <span>지금 내 마음에 와닿는 문장을 골라보세요</span>
        </span>
        <span className="text-[11px] text-stone-400">8가지 상황 지원</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {SITUATION_PROMPTS.map((item: SituationPrompt) => (
          <button
            key={item.id}
            onClick={() => onSelect(item.buttonText, item.id)}
            disabled={disabled}
            className="group relative flex flex-col items-start p-3 rounded-2xl bg-white/80 hover:bg-white border border-stone-200/80 hover:border-emerald-300 shadow-xs hover:shadow-md transition-all text-left disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <div className="flex items-center gap-2 mb-1 w-full">
              <span className="text-lg shrink-0 group-hover:scale-110 transition-transform">
                {item.icon}
              </span>
              <span className="text-xs font-medium text-stone-800 group-hover:text-emerald-900 line-clamp-1">
                {item.buttonText}
              </span>
            </div>
            <span className="text-[11px] text-stone-400 group-hover:text-stone-500 line-clamp-1">
              {item.situationTitle.split('·')[1]?.trim() || item.situationTitle}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
