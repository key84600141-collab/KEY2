'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  BookOpen,
  Copy,
  Check,
  ShieldCheck,
  AlertTriangle,
  Heart,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import {
  SYSTEM_META_PROMPT,
  SITUATION_PROMPTS,
  FORBIDDEN_VS_RECOMMENDED,
  CORE_PRINCIPLES,
  RESPONSE_STEPS,
  HELPLINE_INFO,
} from '@/lib/counselor-data';

interface PromptGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPrompt?: (text: string, situationId?: string) => void;
}

export function PromptGuideModal({ isOpen, onClose, onSelectPrompt }: PromptGuideModalProps) {
  const [activeTab, setActiveTab] = useState<'system' | 'situations' | 'comparison' | 'principles'>('system');
  const [copied, setCopied] = useState(false);
  const [copiedSituationId, setCopiedSituationId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopySystemPrompt = () => {
    navigator.clipboard.writeText(SYSTEM_META_PROMPT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopySituation = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSituationId(id);
    setTimeout(() => setCopiedSituationId(null), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-900/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          className="relative w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden rounded-3xl bg-[#FAF8F5] shadow-2xl border border-stone-200"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-stone-200 flex items-center justify-between bg-white/70">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-emerald-100 text-emerald-800">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-medium text-stone-900">
                  마음 쉼터 · 프롬프트 세트 & 가이드북
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  진로상담사의 감정 소진과 공감 피로를 위한 설계 원칙 및 8개 시나리오
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition-colors"
              aria-label="닫기"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-stone-200 px-6 bg-stone-50/50 gap-2 overflow-x-auto py-2 text-sm">
            <button
              onClick={() => setActiveTab('system')}
              className={`px-4 py-2 rounded-xl font-medium transition-colors whitespace-nowrap ${
                activeTab === 'system'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              🔧 시스템 메타프롬프트
            </button>
            <button
              onClick={() => setActiveTab('situations')}
              className={`px-4 py-2 rounded-xl font-medium transition-colors whitespace-nowrap ${
                activeTab === 'situations'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              💬 상황별 8개 시나리오
            </button>
            <button
              onClick={() => setActiveTab('comparison')}
              className={`px-4 py-2 rounded-xl font-medium transition-colors whitespace-nowrap ${
                activeTab === 'comparison'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              🚫 금지 vs 권장 표현
            </button>
            <button
              onClick={() => setActiveTab('principles')}
              className={`px-4 py-2 rounded-xl font-medium transition-colors whitespace-nowrap ${
                activeTab === 'principles'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              💡 핵심 설계 원칙 & 위기 대응
            </button>
          </div>

          {/* Content Body */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
            {/* Tab 1: System Meta Prompt */}
            {activeTab === 'system' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-stone-900">
                      시스템 프롬프트 — 메타프롬프트 전문
                    </h3>
                    <p className="text-xs text-stone-500">
                      챗봇의 인격, 금지어, 어조, 3단계 응답 구조를 관장하는 메타 지침입니다.
                    </p>
                  </div>
                  <button
                    onClick={handleCopySystemPrompt}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? '복사 완료' : '전문 복사'}
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-inner font-mono text-xs sm:text-sm text-stone-700 whitespace-pre-wrap leading-relaxed max-h-[50vh] overflow-y-auto">
                  {SYSTEM_META_PROMPT}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80">
                    <span className="text-xs font-semibold text-amber-900 block">🛑 절대 금지 표현</span>
                    <p className="text-xs text-amber-800/90 mt-1">
                      &quot;힘내세요&quot;, &quot;그래도 잘 하고 계시잖아요&quot;, &quot;이건 ~해야 해요&quot;, &quot;저도 비슷한 경험이...&quot;
                    </p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80">
                    <span className="text-xs font-semibold text-emerald-900 block">🌱 응답 3단계</span>
                    <p className="text-xs text-emerald-800/90 mt-1">
                      1) 감정 반영 → 2) 정상화 → 3) (선택) 조심스러운 탐색 (1개만)
                    </p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-teal-50/70 border border-teal-200/80">
                    <span className="text-xs font-semibold text-teal-900 block">⏳ 호흡과 여백</span>
                    <p className="text-xs text-teal-800/90 mt-1">
                      3~5문장 이하 짧은 호흡. 문장 끝마다 기계적으로 질문 던지지 않음.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Situations */}
            {activeTab === 'situations' && (
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-stone-900">상황별 프롬프트 세트 — 8가지 장면</h3>
                    <p className="text-xs text-stone-500">
                      진로상담사가 겪는 대표적인 고비마다 준비된 온기 어린 응답 세트입니다.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {SITUATION_PROMPTS.map((sit) => (
                    <div
                      key={sit.id}
                      className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-sm hover:border-emerald-300 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3 mb-2.5">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{sit.icon}</span>
                          <div>
                            <h4 className="font-semibold text-stone-900 text-sm sm:text-base">
                              {sit.situationTitle}
                            </h4>
                            <span className="inline-block text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md mt-0.5">
                              버튼: {sit.buttonText}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5">
                          {onSelectPrompt && (
                            <button
                              onClick={() => {
                                onSelectPrompt(sit.buttonText, sit.id);
                                onClose();
                              }}
                              className="px-2.5 py-1.5 rounded-xl text-xs font-medium bg-stone-100 hover:bg-emerald-100 hover:text-emerald-800 text-stone-700 transition-colors flex items-center gap-1"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                              대화하기
                            </button>
                          )}
                          <button
                            onClick={() => handleCopySituation(sit.id, sit.sampleResponse)}
                            className="p-1.5 rounded-xl text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors"
                            title="응답 예시 복사"
                          >
                            {copiedSituationId === sit.id ? (
                              <Check className="w-4 h-4 text-emerald-600" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="text-xs text-stone-500 mb-3 bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                        <strong className="text-stone-700">언제 사용하나요?</strong> {sit.userExpression}
                      </div>

                      <div className="text-xs text-stone-700 mb-3">
                        <span className="font-medium text-emerald-800">응답 방향: </span>
                        {sit.responseGuideline}
                      </div>

                      <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-stone-200 text-xs sm:text-sm text-stone-800 whitespace-pre-wrap leading-relaxed">
                        <span className="text-[11px] font-semibold text-stone-400 block mb-1">기본 응답 예시</span>
                        {sit.sampleResponse}
                      </div>

                      {sit.followUpExample && (
                        <div className="mt-2.5 p-3 rounded-xl bg-emerald-50/50 border border-emerald-100 text-xs text-emerald-900 whitespace-pre-wrap leading-relaxed">
                          <span className="text-[11px] font-semibold text-emerald-700 block mb-1">후속 / 심화 응답</span>
                          {sit.followUpExample}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Comparison */}
            {activeTab === 'comparison' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-semibold text-stone-900">🚫 금지 표현 vs ✅ 권장 표현 비교표</h3>
                  <p className="text-xs text-stone-500">
                    상담사에게 상처가 되거나 공허하게 들리는 흔한 위로를 배제하고, 진정한 온기를 전하는 언어입니다.
                  </p>
                </div>

                <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
                  <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-stone-200">
                    <div className="bg-rose-50/50 p-3.5 text-xs font-bold text-rose-800 flex items-center gap-1.5 border-b border-stone-200">
                      <AlertTriangle className="w-4 h-4 text-rose-600" />
                      사용 금지 표현 (왜 피해야 하는가?)
                    </div>
                    <div className="bg-emerald-50/50 p-3.5 text-xs font-bold text-emerald-800 flex items-center gap-1.5 border-b border-stone-200">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      권장 표현 (마음 쉼터의 화법)
                    </div>
                  </div>

                  <div className="divide-y divide-stone-200 text-xs sm:text-sm">
                    {FORBIDDEN_VS_RECOMMENDED.map((item, idx) => (
                      <div key={idx} className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-stone-200">
                        <div className="p-4 bg-rose-50/20">
                          <div className="font-semibold text-rose-900 flex items-center gap-1.5">
                            <span className="text-rose-500">✕</span> &ldquo;{item.forbidden}&rdquo;
                          </div>
                          <div className="text-xs text-rose-600/80 mt-1 pl-4">
                            → {item.forbiddenReason}
                          </div>
                        </div>
                        <div className="p-4 bg-emerald-50/20">
                          <div className="font-medium text-emerald-950 flex items-start gap-1.5">
                            <span className="text-emerald-600 font-bold">✓</span>
                            <span>&ldquo;{item.recommended}&rdquo;</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 4: Principles & Crisis */}
            {activeTab === 'principles' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-semibold text-stone-900">💡 챗봇 설계 5대 원칙</h3>
                  <p className="text-xs text-stone-500">
                    &quot;감정 먼저, 해결 나중&quot; — 상담사는 하루 종일 내담자의 감정을 받아내는 사람입니다.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {CORE_PRINCIPLES.map((cp) => (
                    <div key={cp.num} className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center">
                          {cp.num}
                        </span>
                        <h4 className="font-semibold text-stone-900 text-sm">{cp.title}</h4>
                      </div>
                      <p className="text-xs text-stone-600 leading-relaxed pl-8">{cp.desc}</p>
                    </div>
                  ))}
                </div>

                {/* 3 Step Structure */}
                <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200">
                  <h4 className="text-sm font-semibold text-stone-900 mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-700" />
                    응답 3단계 구조
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {RESPONSE_STEPS.map((rs, i) => (
                      <div key={i} className="p-3 rounded-xl bg-white border border-stone-200">
                        <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wide">
                          {rs.step}
                        </span>
                        <h5 className="font-medium text-stone-900 text-xs mt-0.5">{rs.name}</h5>
                        <p className="text-xs text-stone-500 mt-1 leading-snug">{rs.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Crisis response */}
                <div className="p-5 rounded-2xl bg-rose-50/80 border border-rose-200">
                  <div className="flex items-start gap-3">
                    <Heart className="w-5 h-5 text-rose-600 mt-0.5 shrink-0" />
                    <div>
                      <h4 className="text-sm font-semibold text-rose-900">
                        위기 상황 대응 지침 (Crisis Protocol)
                      </h4>
                      <p className="text-xs text-rose-800 mt-1 leading-relaxed">
                        자해·자살에 관한 표현이 나타나면 대화를 일방적으로 중단하지 않고 부드럽게 전문 도움 번호를 안내합니다.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-3">
                        <div className="p-3 rounded-xl bg-white border border-rose-200 text-xs">
                          <span className="font-semibold text-rose-900 block">
                            {HELPLINE_INFO.suicidePrevention.name}
                          </span>
                          <span className="text-lg font-bold text-rose-600">
                            {HELPLINE_INFO.suicidePrevention.number}
                          </span>
                          <span className="text-rose-500 ml-2">({HELPLINE_INFO.suicidePrevention.available})</span>
                        </div>
                        <div className="p-3 rounded-xl bg-white border border-rose-200 text-xs">
                          <span className="font-semibold text-rose-900 block">
                            {HELPLINE_INFO.mentalCrisis.name}
                          </span>
                          <span className="text-lg font-bold text-rose-600">
                            {HELPLINE_INFO.mentalCrisis.number}
                          </span>
                          <span className="text-rose-500 ml-2">({HELPLINE_INFO.mentalCrisis.available})</span>
                        </div>
                      </div>
                      <p className="text-xs text-rose-700/90 mt-3 italic">
                        &ldquo;{HELPLINE_INFO.disclaimer}&rdquo;
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-stone-200 bg-stone-50/80 flex items-center justify-between text-xs text-stone-500">
            <span>출처: 진로상담가를 위한 마음 위로 챗봇 프롬프트 세트</span>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 font-medium transition-colors"
            >
              닫기
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
