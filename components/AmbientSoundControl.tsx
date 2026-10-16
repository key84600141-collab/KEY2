'use client';

import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, CloudRain, Flame, Wind, Bell } from 'lucide-react';
import { ambientSound } from '@/lib/ambient-sound';

export function AmbientSoundControl() {
  const [activeSound, setActiveSound] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    return () => {
      if (ambientSound) {
        ambientSound.stop();
      }
    };
  }, []);

  const handleToggle = (type: 'rain' | 'fire' | 'breeze' | 'bowl') => {
    if (!ambientSound) return;

    if (activeSound === type) {
      ambientSound.stop();
      setActiveSound(null);
    } else {
      ambientSound.play(type);
      setActiveSound(type);
    }
  };

  const handleStop = () => {
    if (!ambientSound) return;
    ambientSound.stop();
    setActiveSound(null);
  };

  const sounds = [
    { id: 'rain', label: '잔잔한 빗소리', icon: CloudRain, color: 'text-sky-600' },
    { id: 'fire', label: '따뜻한 모닥불', icon: Flame, color: 'text-amber-600' },
    { id: 'breeze', label: '초원의 바람', icon: Wind, color: 'text-teal-600' },
    { id: 'bowl', label: '정화 싱잉볼', icon: Bell, color: 'text-purple-600' },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
          activeSound
            ? 'bg-emerald-100 text-emerald-800 border-emerald-300 shadow-xs'
            : 'bg-stone-50 hover:bg-stone-100 text-stone-600 border-stone-200'
        }`}
        title="배경음 / 앰비언트 사운드"
      >
        {activeSound ? (
          <>
            <Volume2 className="w-3.5 h-3.5 text-emerald-700 animate-pulse" />
            <span className="hidden sm:inline">앰비언트 켜짐</span>
          </>
        ) : (
          <>
            <VolumeX className="w-3.5 h-3.5 text-stone-400" />
            <span className="hidden sm:inline">배경음</span>
          </>
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-30"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 z-40 w-48 rounded-2xl bg-white p-2.5 shadow-xl border border-stone-200 space-y-1">
            <div className="flex items-center justify-between px-2 py-1 border-b border-stone-100 mb-1">
              <span className="text-[11px] font-semibold text-stone-400">마음 앰비언트</span>
              {activeSound && (
                <button
                  onClick={handleStop}
                  className="text-[11px] text-rose-600 hover:underline"
                >
                  끄기
                </button>
              )}
            </div>

            {sounds.map((s) => {
              const Icon = s.icon;
              const isCurrent = activeSound === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => handleToggle(s.id as 'rain' | 'fire' | 'breeze' | 'bowl')}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs transition-colors ${
                    isCurrent
                      ? 'bg-emerald-50 text-emerald-900 font-semibold'
                      : 'text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className={`w-3.5 h-3.5 ${s.color}`} />
                    <span>{s.label}</span>
                  </div>
                  {isCurrent && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping" />
                  )}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
