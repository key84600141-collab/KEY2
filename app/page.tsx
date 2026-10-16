'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { ChatInterface } from '@/components/ChatInterface';
import { BreathingModal } from '@/components/BreathingModal';
import { PromptGuideModal } from '@/components/PromptGuideModal';
import { DisburdenDrawer } from '@/components/DisburdenDrawer';
import { CrisisBanner } from '@/components/CrisisBanner';

export default function Home() {
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isBreathingOpen, setIsBreathingOpen] = useState(false);
  const [isDisburdenOpen, setIsDisburdenOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-800 flex flex-col font-sans">
      {/* Header */}
      <Navbar
        onOpenGuide={() => setIsGuideOpen(true)}
        onOpenBreathing={() => setIsBreathingOpen(true)}
        onOpenDisburden={() => setIsDisburdenOpen(true)}
      />

      {/* Top subtle emergency / crisis support ribbon */}
      <div className="max-w-4xl mx-auto w-full px-3 sm:px-6 pt-2">
        <CrisisBanner />
      </div>

      {/* Main chat experience */}
      <main className="flex-1 flex flex-col items-center justify-center">
        <ChatInterface
          onOpenGuide={() => setIsGuideOpen(true)}
          onOpenBreathing={() => setIsBreathingOpen(true)}
          onOpenDisburden={() => setIsDisburdenOpen(true)}
        />
      </main>

      {/* Modals & Drawers */}
      <BreathingModal
        isOpen={isBreathingOpen}
        onClose={() => setIsBreathingOpen(false)}
      />

      <PromptGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />

      <DisburdenDrawer
        isOpen={isDisburdenOpen}
        onClose={() => setIsDisburdenOpen(false)}
      />
    </div>
  );
}
