import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '마음 쉼터 - 진로상담사를 위한 심리 지지 챗봇',
  description: '감정 소진, 공감 피로, 자기 회의를 겪는 진로상담사를 따뜻하게 안아주는 전용 심리 지지 AI 챗봇',
  openGraph: {
    title: '마음 쉼터 - 진로상담사를 위한 심리 지지 챗봇',
    description: '감정 소진, 공감 피로, 자기 회의를 겪는 진로상담사를 따뜻하게 안아주는 전용 심리 지지 AI 챗봇',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '마음 쉼터 - 진로상담사를 위한 심리 지지 챗봇',
    description: '감정 소진, 공감 피로, 자기 회의를 겪는 진로상담사를 따뜻하게 안아주는 전용 심리 지지 AI 챗봇',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="ko">
      <body suppressHydrationWarning className="bg-[#FAF8F5] text-stone-800 antialiased selection:bg-emerald-100 selection:text-emerald-900">
        {children}
      </body>
    </html>
  );
}
