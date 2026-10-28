import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  /** Rows above / below the 9:16 content area (status bar, app chrome). */
  top?: ReactNode
  bottom?: ReactNode
  /** Content fills the whole screen (a full phone screenshot) instead of the 9:16 slot. */
  fullScreen?: boolean
  className?: string
}

/**
 * CSS-only modern phone: 9:19.5 screen, dynamic island, side buttons.
 * The content slot is exactly 9:16, so reels and screenshots are never cropped;
 * the leftover height is app chrome (top/bottom), like the real Reels UI.
 */
export function PhoneMockup({ children, top, bottom, fullScreen = false, className = '' }: Props) {
  return (
    <div className={`relative mx-auto w-full max-w-[18.5rem] ${className}`}>
      {/* side buttons */}
      <span aria-hidden className="absolute top-[18%] -left-[3px] h-8 w-[3px] rounded-l bg-plum-600/80" />
      <span aria-hidden className="absolute top-[26%] -left-[3px] h-14 w-[3px] rounded-l bg-plum-600/80" />
      <span aria-hidden className="absolute top-[24%] -right-[3px] h-20 w-[3px] rounded-r bg-plum-600/80" />

      <div className="rounded-phone bg-gradient-to-b from-[#3a1638] via-[#24081f] to-[#3a1638] p-[9px] shadow-phone">
        <div className="relative flex aspect-[9/19.5] flex-col overflow-hidden rounded-[2.45rem] bg-black">
          {/* dynamic island */}
          <span aria-hidden className="absolute top-2.5 left-1/2 z-20 h-[22px] w-[30%] -translate-x-1/2 rounded-full bg-black" />
          {fullScreen ? (
            <div className="absolute inset-0">{children}</div>
          ) : (
            <>
              {/* Leftover height split 2:3 — status bar up top, more room for app chrome below. */}
              <div className="relative flex flex-[2] flex-col justify-end">{top}</div>
              <div className="relative aspect-[9/16] w-full shrink-0">{children}</div>
              <div className="relative flex flex-[3] flex-col justify-center">{bottom}</div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

/** iOS-style status bar for the phone's top area. */
export function StatusBar() {
  return (
    <div aria-hidden className="flex items-center justify-between px-6 pt-3 pb-1.5 text-[11px] font-semibold text-white">
      <span>9:41</span>
      <span className="flex items-center gap-1">
        <svg width="16" height="10" viewBox="0 0 16 10" fill="currentColor">
          <rect x="0" y="6" width="3" height="4" rx="1" />
          <rect x="4.3" y="4" width="3" height="6" rx="1" />
          <rect x="8.6" y="2" width="3" height="8" rx="1" />
          <rect x="12.9" y="0" width="3" height="10" rx="1" />
        </svg>
        <svg width="22" height="11" viewBox="0 0 22 11" fill="none">
          <rect x="0.5" y="0.5" width="18" height="10" rx="3" stroke="currentColor" opacity=".5" />
          <rect x="2" y="2" width="13" height="7" rx="1.6" fill="currentColor" />
          <rect x="19.6" y="3.5" width="1.6" height="4" rx=".8" fill="currentColor" opacity=".5" />
        </svg>
      </span>
    </div>
  )
}
