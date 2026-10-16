'use client';

import React, { useState } from 'react';
import { PhoneCall, Heart, X, ChevronRight } from 'lucide-react';
import { HELPLINE_INFO } from '@/lib/counselor-data';

export function CrisisBanner() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      {!isOpen ? (
        <div className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-stone-100/90 text-stone-600 text-xs border border-stone-200/80">
          <div className="flex items-center gap-2 truncate">
            <Heart className="w-3.5 h-3.5 text-rose-500 shrink-0" />
            <span className="truncate">
              지친 마음에 전문적인 도움이 필요할 때도 괜찮습니다.
            </span>
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className="shrink-0 flex items-center text-xs font-medium text-emerald-800 hover:text-emerald-900 ml-2 hover:underline"
          >
            24시간 위기 상담 안내
            <ChevronRight className="w-3 h-3 ml-0.5" />
          </button>
        </div>
      ) : (
        <div className="p-3.5 rounded-2xl bg-amber-50/90 border border-amber-200 text-xs text-amber-950 space-y-2 relative">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2.5 right-2.5 p-1 text-amber-700 hover:text-amber-900"
            aria-label="닫기"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-1.5 font-semibold text-amber-900">
            <PhoneCall className="w-4 h-4 text-amber-700" />
            <span>상담사 본인도 전문가의 도움을 받을 자격이 있습니다 (24시간 무료)</span>
          </div>

          <p className="text-amber-800 text-[11px] leading-relaxed">
            {HELPLINE_INFO.disclaimer}
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            <a
              href={`tel:${HELPLINE_INFO.suicidePrevention.number}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-amber-200 text-amber-900 font-semibold hover:bg-amber-100 transition-colors"
            >
              <span>{HELPLINE_INFO.suicidePrevention.name}</span>
              <strong className="text-rose-600">{HELPLINE_INFO.suicidePrevention.number}</strong>
            </a>
            <a
              href={`tel:${HELPLINE_INFO.mentalCrisis.number}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-amber-200 text-amber-900 font-semibold hover:bg-amber-100 transition-colors"
            >
              <span>{HELPLINE_INFO.mentalCrisis.name}</span>
              <strong className="text-rose-600">{HELPLINE_INFO.mentalCrisis.number}</strong>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
