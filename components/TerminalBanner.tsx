'use client'

export default function TerminalBanner() {
  return (
    <div className="mb-6 overflow-x-auto font-mono text-xs">
      <pre className="text-gray-500">
        <span className="text-gray-600">┌─ </span>
        <span className="text-green-500">오늘의 바이브 v1.0.0</span>
        <span className="text-gray-600">
          {' ───────────────────────────────────────────────────┐'}
        </span>
        {`
│                                                                │
│      `}
        <span className="text-gray-300">Welcome to the vibe!</span>
        {`            `}
        <span className="text-green-500">Latest vibes</span>
        {`                   │
│                                      `}
        <span className="text-gray-500">AI 에이전트, Claude Code,</span>
        {`       │
│  `}
        <span className="text-amber-600">{`    ▄▄▄▄▄▄▄    `}</span>
        {`                `}
        <span className="text-gray-500">OpenClaw 이야기</span>
        {`               │
│  `}
        <span className="text-amber-600">{`   █ ▀ ▀  █   `}</span>
        {`                                               │
│  `}
        <span className="text-amber-600">{`   █  ▼   █   `}</span>
        {`                `}
        <span className="text-green-500">Recent activity</span>
        {`                │
│  `}
        <span className="text-amber-600">{`   █ ─── █    `}</span>
        {`                `}
        <span className="text-gray-500">슈퍼볼 2026: Opus vs GPT</span>
        {`       │
│  `}
        <span className="text-amber-600">{`    █████     `}</span>
        {`                                               │
│  `}
        <span className="text-amber-600">{`    █   █     `}</span>
        {`                                               │
│  `}
        <span className="text-gray-600">바이브 코딩 · AI 뉴스</span>
        {`                                          │
│                                                                │
└────────────────────────────────────────────────────────────────┘`}
      </pre>
    </div>
  )
}
