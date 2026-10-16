'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Wind, HeartHandshake } from 'lucide-react';

interface BreathingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BreathingModal({ isOpen, onClose }: BreathingModalProps) {
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [seconds, setSeconds] = useState(4);
  const [cycleCount, setCycleCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev > 1) return prev - 1;

        if (phase === 'inhale') {
          setPhase('hold');
          return 7;
        } else if (phase === 'hold') {
          setPhase('exhale');
          return 8;
        } else {
          setPhase('inhale');
          setCycleCount((c) => c + 1);
          return 4;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [phase]);

  if (!isOpen) return null;

  const phaseDetails = {
    inhale: {
      text: '코로 천천히 숨을 들이마십니다',
      sub: '가슴과 배가 편안히 부풀어 오르는 것을 느껴보세요',
      scale: 1.35,
      color: 'bg-emerald-100/90 text-emerald-800 border-emerald-300',
      tag: '들이쉬기',
    },
    hold: {
      text: '숨을 부드럽게 멈춥니다',
      sub: '어깨의 긴장을 풀고 잠시 머물러 봅니다',
      scale: 1.35,
      color: 'bg-amber-100/90 text-amber-900 border-amber-300',
      tag: '머물기',
    },
    exhale: {
      text: '입으로 가만히 내쉽니다',
      sub: '오늘 하루 담아두었던 모든 무게를 내보냅니다',
      scale: 0.9,
      color: 'bg-teal-100/90 text-teal-800 border-teal-300',
      tag: '내쉬기',
    },
  };

  const current = phaseDetails[phase];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-[#FAF8F5] p-6 sm:p-8 shadow-2xl border border-stone-200"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-stone-200">
            <div className="flex items-center gap-2 text-stone-700">
              <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
                <Wind className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-stone-900">상담사를 위한 4-7-8 안정화 호흡</h3>
                <p className="text-xs text-stone-500">지친 교감신경을 가라앉히고 편안한 호흡을 되찾습니다</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-stone-600 rounded-full hover:bg-stone-100 transition-colors"
              aria-label="닫기"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Breathing Circle Area */}
          <div className="py-12 flex flex-col items-center justify-center">
            <div className="relative flex items-center justify-center w-64 h-64">
              {/* Outer pulsing ring */}
              <motion.div
                animate={{
                  scale: phase === 'inhale' ? 1.4 : phase === 'hold' ? 1.4 : 0.9,
                  opacity: phase === 'hold' ? 0.35 : 0.2,
                }}
                transition={{
                  duration: phase === 'inhale' ? 4 : phase === 'hold' ? 0.5 : 8,
                  ease: 'easeInOut',
                }}
                className="absolute inset-0 rounded-full bg-emerald-300 blur-xl"
              />

              {/* Main circle */}
              <motion.div
                animate={{
                  scale: current.scale,
                }}
                transition={{
                  duration: phase === 'inhale' ? 4 : phase === 'hold' ? 0.5 : 8,
                  ease: 'easeInOut',
                }}
                className={`w-44 h-44 rounded-full flex flex-col items-center justify-center border shadow-lg transition-colors duration-700 ${current.color}`}
              >
                <span className="text-xs font-semibold tracking-wider uppercase mb-1 opacity-80">
                  {current.tag}
                </span>
                <span className="text-4xl font-light tabular-nums">{seconds}</span>
                <span className="text-xs text-stone-500 mt-1">초</span>
              </motion.div>
            </div>

            {/* Instruction texts */}
            <div className="text-center mt-6 h-16">
              <p className="text-base font-medium text-stone-800 transition-all duration-300">
                {current.text}
              </p>
              <p className="text-sm text-stone-500 mt-1 transition-all duration-300">
                {current.sub}
              </p>
            </div>
          </div>

          {/* Footer note */}
          <div className="pt-4 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
            <span className="flex items-center gap-1.5">
              <HeartHandshake className="w-4 h-4 text-emerald-600" />
              진행한 호흡 세트: <strong className="text-stone-700">{cycleCount}회</strong>
            </span>
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors"
            >
              호흡 마치기
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
