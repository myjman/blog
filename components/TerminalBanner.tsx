'use client'

export default function TerminalBanner() {
  return (
    <div className="mb-6 font-mono text-sm">
      {/* Terminal Box */}
      <div className="rounded border border-gray-700 bg-gray-950 p-4">
        {/* Title Bar */}
        <div className="-mt-4 -mr-4 mb-4 -ml-4 border-b border-gray-700 px-4 py-2">
          <span className="text-gray-500">{'─ '}</span>
          <span className="text-green-500">오늘의 바이브</span>
          <span className="text-gray-500">{' ─'}</span>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:gap-8">
          {/* Left Section - Welcome + Dog */}
          <div className="flex flex-col items-center text-center">
            <p className="mb-2 text-gray-300">Welcome to the vibe!</p>

            {/* Pixel Art Dog */}
            <pre className="text-xs leading-none text-amber-400">
              {`    ╱▔▔╲
   ╱ •  • ╲
   ▏  ▼   ▕
   ╲  ──  ╱
    ╲────╱
   ╱▔▔▔▔▔▔╲
  ▕ ▋    ▋ ▏
   ╲▂▂▂▂▂▂╱`}
            </pre>

            <p className="mt-2 text-xs text-gray-500">바이브 코딩 · AI 뉴스</p>
          </div>

          {/* Right Section - Info */}
          <div className="flex-1 border-l border-gray-700 pl-4">
            <div className="mb-3">
              <p className="font-bold text-green-400">Latest vibes</p>
              <p className="text-gray-500">AI 에이전트, Claude Code, OpenClaw 이야기</p>
            </div>
            <div>
              <p className="font-bold text-green-400">Stack</p>
              <p className="text-gray-500">Next.js · Tailwind · Vercel</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
