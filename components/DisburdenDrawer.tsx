'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Feather, Trash2, Heart } from 'lucide-react';

interface DisburdenDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DisburdenDrawer({ isOpen, onClose }: DisburdenDrawerProps) {
  const [burdenText, setBurdenText] = useState('');
  const [isReleasing, setIsReleasing] = useState(false);
  const [released, setReleased] = useState(false);

  if (!isOpen) return null;

  const handleRelease = () => {
    if (!burdenText.trim()) return;
    setIsReleasing(true);
    setTimeout(() => {
      setBurdenText('');
      setIsReleasing(false);
      setReleased(true);
    }, 1400);
  };

  const handleReset = () => {
    setReleased(false);
    setBurdenText('');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-lg rounded-3xl bg-[#FAF8F5] p-6 sm:p-7 shadow-2xl border border-stone-200 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-stone-200">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-100 text-amber-800">
                <Feather className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-stone-900">비움의 서랍</h3>
                <p className="text-xs text-stone-500">오늘 상담실에 남겨두고 갈 무거운 마음을 비워냅니다</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-stone-600 rounded-full hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="py-6">
            {!released ? (
              <div className="space-y-4">
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  내담자의 고통, 나에 대한 자책, 퇴근길까지 따라오는 생각들...
                  <br />
                  여기에 적어두고 온전히 날려보내세요. 이 글은 어디에도 저장되지 않습니다.
                </p>

                <div className="relative">
                  <motion.textarea
                    animate={
                      isReleasing
                        ? {
                            opacity: [1, 0.4, 0],
                            scale: [1, 0.95, 0.85],
                            filter: ['blur(0px)', 'blur(4px)', 'blur(10px)'],
                          }
                        : {}
                    }
                    transition={{ duration: 1.2 }}
                    value={burdenText}
                    onChange={(e) => setBurdenText(e.target.value)}
                    placeholder="오늘 나를 무겁게 짓누른 생각이나 감정을 자유롭게 적어보세요..."
                    rows={5}
                    disabled={isReleasing}
                    className="w-full rounded-2xl border border-stone-200 bg-white p-4 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none shadow-inner"
                  />

                  {isReleasing && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 flex flex-col items-center justify-center bg-white/70 backdrop-blur-xs rounded-2xl"
                    >
                      <Sparkles className="w-8 h-8 text-emerald-600 animate-spin" />
                      <p className="text-xs font-medium text-stone-700 mt-2">
                        마음의 짐을 가만히 내려놓는 중입니다...
                      </p>
                    </motion.div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-stone-400">
                    {burdenText.length > 0 ? `${burdenText.length}자 작성됨` : '비공개·즉시 소멸'}
                  </span>
                  <button
                    onClick={handleRelease}
                    disabled={!burdenText.trim() || isReleasing}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium bg-stone-800 hover:bg-stone-900 disabled:opacity-40 disabled:cursor-not-allowed text-white shadow-sm transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                    마음 비워내기
                  </button>
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 text-center space-y-4"
              >
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Heart className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-semibold text-stone-800">
                    마음의 짐을 모두 흘려보냈습니다
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-sm mx-auto">
                    남의 아픔을 품느라 애쓴 오늘 하루,
                    <br />
                    선생님의 마음에 깊고 평온한 쉼이 깃들기를 바랍니다.
                  </p>
                </div>

                <div className="pt-4 flex justify-center gap-3">
                  <button
                    onClick={handleReset}
                    className="px-4 py-2 rounded-xl text-xs font-medium bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
                  >
                    다른 생각 더 적기
                  </button>
                  <button
                    onClick={onClose}
                    className="px-4 py-2 rounded-xl text-xs font-medium bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm transition-colors"
                  >
                    서랍 닫기
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
