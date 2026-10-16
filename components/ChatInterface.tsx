'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import {
  Send,
  Sparkles,
  RotateCcw,
  Copy,
  Check,
  Type,
  Coffee,
  Heart,
  HelpCircle,
  MessageCircle,
} from 'lucide-react';
import { QuickChips } from '@/components/QuickChips';
import { SITUATION_PROMPTS } from '@/lib/counselor-data';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  situationId?: string;
}

interface ChatInterfaceProps {
  onOpenGuide: () => void;
  onOpenBreathing: () => void;
  onOpenDisburden: () => void;
}

export function ChatInterface({
  onOpenGuide,
  onOpenBreathing,
  onOpenDisburden,
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        '선생님, 오늘 하루도 많은 이들의 불안과 무게를 묵묵히 품어내셨군요.\n\n여기서는 더 이상 상담사로서 무언가를 증명하거나 긴장하지 않으셔도 괜찮습니다.\n그냥 편안히 기대어 쉬어가세요. 온전히 들어드릴게요.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSendMessage = async (textToSend?: string, situationId?: string) => {
    const content = (textToSend || input).trim();
    if (!content || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      situationId,
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          situationId,
        }),
      });

      if (!res.ok) {
        throw new Error('응답을 가져오지 못했습니다.');
      }

      const data = await res.json();
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.text || '그 무게를 다 알지는 못하지만, 지금 여기서 듣고 있을게요.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch {
      // Graceful fallback from presets
      let fallbackText = '남의 마음을 종일 담아내는 일이잖아요. 지치는 게 당연해요.\n그 무게, 오늘 하루 혼자 다 안고 계셨군요.\n잠깐 내려놓아도 괜찮아요. 여기서만큼은요.';
      if (situationId) {
        const found = SITUATION_PROMPTS.find((s) => s.id === situationId);
        if (found) fallbackText = found.sampleResponse;
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: fallbackText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleResetChat = () => {
    if (confirm('대화 내용을 비우고 마음 쉼터를 새로 시작하시겠습니까?')) {
      setMessages([
        {
          id: 'welcome-' + Date.now(),
          role: 'assistant',
          content:
            '선생님, 오늘 하루도 애쓰셨습니다.\n어떤 이야기든, 아니면 그저 침묵이어도 괜찮습니다.\n마음 편히 머물다 가세요.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }
  };

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4.25rem)] max-w-4xl mx-auto w-full px-3 sm:px-6 pb-3 pt-2">
      {/* Top action pill toolbar */}
      <div className="flex items-center justify-between py-2 border-b border-stone-200/80 mb-3 text-xs text-stone-500">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/60 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>동료의 자리에서 듣고 있습니다</span>
          </div>
          <button
            onClick={() => setFontSize(fontSize === 'normal' ? 'large' : 'normal')}
            className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors"
            title="글씨 크기 조정"
          >
            <Type className="w-3.5 h-3.5" />
            <span>{fontSize === 'normal' ? '글씨 크게' : '기본 글씨'}</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenBreathing}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 hover:bg-emerald-200 text-emerald-800 transition-colors"
          >
            <Coffee className="w-3.5 h-3.5 text-emerald-700" />
            <span className="hidden sm:inline">1분 안정화 호흡</span>
            <span className="sm:hidden">호흡</span>
          </button>
          <button
            onClick={onOpenDisburden}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 transition-colors"
          >
            <Heart className="w-3.5 h-3.5 text-amber-700" />
            <span className="hidden sm:inline">비움의 서랍</span>
            <span className="sm:hidden">비움</span>
          </button>
          <button
            onClick={handleResetChat}
            className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
            title="대화 비우기"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 sm:pr-2">
        {messages.map((m) => {
          const isUser = m.role === 'user';
          return (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-center gap-1.5 mb-1 px-1">
                <span className="text-[11px] font-medium text-stone-400">
                  {isUser ? '선생님' : '마음 쉼터'}
                </span>
                <span className="text-[10px] text-stone-400">{m.timestamp}</span>
              </div>

              <div
                className={`group relative max-w-[90%] sm:max-w-[80%] rounded-3xl p-4 sm:p-5 shadow-xs leading-relaxed transition-all ${
                  isUser
                    ? 'bg-emerald-800 text-emerald-50 rounded-tr-sm'
                    : 'bg-white text-stone-800 border border-stone-200/90 rounded-tl-sm shadow-sm'
                } ${fontSize === 'large' ? 'text-base sm:text-lg' : 'text-sm sm:text-base'}`}
              >
                {!isUser ? (
                  <div className="prose prose-stone max-w-none text-inherit leading-relaxed whitespace-pre-wrap">
                    <ReactMarkdown>{m.content}</ReactMarkdown>
                  </div>
                ) : (
                  <div className="whitespace-pre-wrap leading-relaxed">{m.content}</div>
                )}

                {/* Message action: Copy */}
                {!isUser && (
                  <button
                    onClick={() => handleCopyMessage(m.id, m.content)}
                    className="absolute bottom-2 right-2 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition-all"
                    title="답변 복사"
                  >
                    {copiedId === m.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}

        {/* Loading state indicator */}
        {loading && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-start"
          >
            <span className="text-[11px] font-medium text-stone-400 mb-1 px-1">마음 쉼터</span>
            <div className="rounded-3xl rounded-tl-sm bg-white p-4 border border-stone-200/90 shadow-xs flex items-center gap-2.5 text-stone-500 text-xs sm:text-sm">
              <Sparkles className="w-4 h-4 text-emerald-600 animate-spin" />
              <span>선생님의 마음에 귀 기울이며 조용히 머무는 중입니다...</span>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Chips Drawer / Accordion Section */}
      <div className="pt-3 pb-2">
        <QuickChips
          onSelect={(text, situationId) => handleSendMessage(text, situationId)}
          disabled={loading}
        />
      </div>

      {/* Input Area */}
      <div className="pt-2 border-t border-stone-200/80">
        <div className="relative flex items-end gap-2 bg-white rounded-3xl border border-stone-200/90 shadow-sm focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-500/20 p-2 transition-all">
          <textarea
            ref={inputRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="상담을 마치고 마음에 남은 생각이나 감정을 적어보세요..."
            disabled={loading}
            className="flex-1 max-h-32 min-h-[44px] p-2.5 text-sm sm:text-base text-stone-800 placeholder-stone-400 bg-transparent resize-none focus:outline-none"
          />

          <div className="flex items-center gap-1.5 pb-1 pr-1">
            <button
              type="button"
              onClick={onOpenGuide}
              className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full transition-colors"
              title="프롬프트 가이드북 보기"
            >
              <HelpCircle className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleSendMessage()}
              disabled={!input.trim() || loading}
              className="p-2.5 rounded-full bg-emerald-800 hover:bg-emerald-900 disabled:opacity-40 disabled:cursor-not-allowed text-white shadow-xs transition-colors"
              aria-label="보내기"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between px-2 pt-1.5 text-[11px] text-stone-400">
          <span>Enter로 전송 · Shift+Enter로 줄바꿈</span>
          <span className="flex items-center gap-1">
            <MessageCircle className="w-3 h-3 text-stone-400" />
            조언보다 온전한 공감을 전합니다
          </span>
        </div>
      </div>
    </div>
  );
}
