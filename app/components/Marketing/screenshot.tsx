import { clsx } from 'clsx'
import React from 'react'

interface ScreenshotProps {
  desktopSrc: string
  mobileSrc: string
  width: number
  height: number
  mobileWidth?: number
  mobileHeight?: number
  className?: string
}

export function Screenshot({
  desktopSrc,
  mobileSrc,
  width,
  height,
  mobileWidth = width,
  mobileHeight = height,
  className,
}: ScreenshotProps) {
  return (
    <div
      style={
        {
          '--width': width,
          '--height': height,
          '--mobile-width': mobileWidth,
          '--mobile-height': mobileHeight,
        } as React.CSSProperties
      }
      className={clsx(
        className,
        'relative sm:aspect-[var(--width)/var(--height)] aspect-[var(--mobile-width)/var(--mobile-height)] [--radius:theme(borderRadius.xl)] mx-auto'
      )}
    >
      <div className="absolute -inset-[var(--padding)] rounded-[calc(var(--radius)+var(--padding))] shadow-sm ring-1 ring-black/5 [--padding:theme(spacing.2)]" />

      {/* Desktop Image */}
      <img
        alt=""
        src={desktopSrc}
        className="hidden sm:block h-full w-full rounded-[var(--radius)] shadow-2xl ring-1 ring-black/10"
      />

      {/* Mobile Image */}
      <img
        alt=""
        src={mobileSrc}
        className="sm:hidden h-full w-auto max-w-full rounded-[var(--radius)] shadow-2xl ring-1 ring-black/10"
      />
    </div>
  )
}
