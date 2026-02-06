'use client'

interface TerminalBannerProps {
  latestPost?: {
    title: string
    slug: string
  }
}

export default function TerminalBanner({ latestPost }: TerminalBannerProps) {
  return (
    <div className="mb-6 font-mono text-xs">
      {/* Terminal Box */}
      <div className="relative border border-gray-600">
        {/* Title */}
        <div className="absolute -top-2 left-3 bg-gray-950 px-2 text-green-500 dark:bg-gray-950">
          오늘의 바이브 v1.0.0
        </div>

        {/* Content */}
        <div className="flex flex-col gap-4 p-4 pt-5 md:flex-row md:gap-8">
          {/* Left - Dog */}
          <div className="flex flex-col items-center">
            <p className="mb-2 text-gray-400">Welcome to the vibe!</p>
            <pre className="text-amber-500">
              {`  ∩▂∩
 (･ω･)
  |  |
 ◢█◣█◢█◣`}
            </pre>
            <p className="mt-2 text-gray-600">바이브 코딩 · AI 뉴스</p>
          </div>

          {/* Divider */}
          <div className="hidden border-l border-gray-700 md:block" />

          {/* Right - Info */}
          <div className="flex-1">
            <p className="font-bold text-green-500">Latest vibes</p>
            <p className="text-gray-500">AI 에이전트, Claude Code, OpenClaw 이야기</p>
            <p className="mt-3 font-bold text-green-500">Recent activity</p>
            <p className="text-gray-500">{latestPost ? latestPost.title : 'No posts yet'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
