'use client';

import React from 'react';
import { BookOpen, Wind, Feather, Phone } from 'lucide-react';
import { AmbientSoundControl } from '@/components/AmbientSoundControl';

interface NavbarProps {
  onOpenGuide: () => void;
  onOpenBreathing: () => void;
  onOpenDisburden: () => void;
}

export function Navbar({ onOpenGuide, onOpenBreathing, onOpenDisburden }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <span className="text-2xl" role="img" aria-label="나뭇잎">
            🌿
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold text-stone-900 tracking-tight">
                마음 쉼터
              </h1>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                진로상담사 전용
              </span>
            </div>
            <p className="text-[11px] text-stone-500 hidden sm:block">
              감정 소진 · 공감 피로 · 자기 회의를 따뜻하게 안아주는 AI
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Ambient sound toggle */}
          <AmbientSoundControl />

          {/* Breathing */}
          <button
            onClick={onOpenBreathing}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-stone-700 bg-stone-100 hover:bg-emerald-50 hover:text-emerald-800 border border-stone-200 transition-colors"
            title="4-7-8 안정화 호흡"
          >
            <Wind className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden md:inline">안정화 호흡</span>
          </button>

          {/* Disburden */}
          <button
            onClick={onOpenDisburden}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-stone-700 bg-stone-100 hover:bg-amber-50 hover:text-amber-800 border border-stone-200 transition-colors"
            title="비움의 서랍"
          >
            <Feather className="w-3.5 h-3.5 text-amber-700" />
            <span className="hidden md:inline">비움의 서랍</span>
          </button>

          {/* Prompt guide book */}
          <button
            onClick={onOpenGuide}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium text-white bg-emerald-800 hover:bg-emerald-900 shadow-xs transition-colors"
            title="프롬프트 가이드북 및 설계 원칙"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>가이드북</span>
          </button>

          {/* Emergency phone quick link */}
          <a
            href="tel:1393"
            className="p-1.5 rounded-full text-rose-500 hover:bg-rose-50 border border-rose-200 transition-colors"
            title="24시간 위기 상담 전화: 1393"
          >
            <Phone className="w-4 h-4" />
          </a>
        </div>
      </div>
    </header>
  );
}
