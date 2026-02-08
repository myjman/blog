'use client'

import { useEffect } from 'react'

interface AdBannerProps {
  slot: string
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical'
  responsive?: boolean
}

declare global {
  interface Window {
    adsbygoogle: unknown[]
  }
}

export default function AdBanner({ slot, format = 'auto', responsive = true }: AdBannerProps) {
  useEffect(() => {
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch {
      // AdSense not loaded
    }
  }, [])

  return (
    <div className="my-8">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  )
}
