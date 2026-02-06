'use client'

export default function TerminalBanner() {
  return (
    <div className="mb-6 font-mono text-xs">
      {/* Top border with title */}
      <div className="text-gray-500">
        <span>┌─ </span>
        <span className="text-green-500">오늘의 바이브 v1.0.0</span>
        <span> ─────────────────────────────────────────┐</span>
      </div>

      {/* Content */}
      <div className="flex">
        {/* Left border */}
        <div className="text-gray-500">│</div>

        {/* Main content */}
        <div className="flex flex-1 flex-col gap-2 px-4 py-3 md:flex-row md:gap-8">
          {/* Left Section - Welcome + Dog */}
          <div className="flex flex-col items-center">
            <p className="mb-2 text-gray-300">Welcome to the vibe!</p>

            {/* Pixel Art Dog - using block characters */}
            <pre className="leading-tight text-amber-500">
              {`  ▄▀▀▀▄▄▄▄▄
 █▒▒░░░░░░▀▀▀▀▄
█▒▒░░░░░░░░░░░█
█▒░░░▄▄░░░░▄▄░▀▄
 ▀▄░░█░░░░░█░░░▀
   ▀▀ ▀▀▀▀▀ ▀▀`}
            </pre>

            <p className="mt-2 text-gray-600">바이브 코딩 · AI 뉴스</p>
          </div>

          {/* Divider */}
          <div className="hidden text-gray-700 md:block">│</div>

          {/* Right Section - Info */}
          <div className="flex-1">
            <p className="font-bold text-green-500">Latest vibes</p>
            <p className="text-gray-500">AI 에이전트, Claude Code, OpenClaw 이야기</p>
            <p className="mt-3 font-bold text-green-500">Recent activity</p>
            <p className="text-gray-500">슈퍼볼 2026: Opus 4.6 vs GPT-5.3</p>
          </div>
        </div>

        {/* Right border */}
        <div className="text-gray-500">│</div>
      </div>

      {/* Bottom border */}
      <div className="text-gray-500">
        └──────────────────────────────────────────────────────────┘
      </div>
    </div>
  )
}
