import { useState } from 'react'
import { Lightbox, type LightboxImage } from './Lightbox'

type Props = {
  images: LightboxImage[]
  label: string
  /** Width of each tile; anything under 100% leaves a peek of the next one to invite a swipe. */
  itemClassName?: string
  /** `sizes` for the thumbnails' srcset: the tile's rendered width. */
  sizes?: string
  className?: string
}

/** Horizontal swipe strip (scroll-snap) of thumbnails; tap one to open the lightbox. */
export function Gallery({ images, label, itemClassName = 'w-[62%]', sizes, className = '' }: Props) {
  const [index, setIndex] = useState<number | null>(null)

  return (
    <>
      <ul
        aria-label={label}
        className={`flex snap-x snap-mandatory scroll-px-3 gap-2 overflow-x-auto overscroll-x-contain p-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${className}`}
      >
        {images.map((img, i) => (
          <li key={img.thumb} className={`shrink-0 snap-start ${itemClassName}`}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Open: ${img.alt}`}
              className="block w-full overflow-hidden rounded-2xl ring-1 ring-hairline transition-transform duration-base ease-out-expo hover:scale-[1.03] active:scale-[0.98]"
            >
              <img
                src={img.thumb}
                srcSet={img.srcset}
                sizes={sizes}
                alt={img.alt}
                width={img.w}
                height={img.h}
                loading="lazy"
                decoding="async"
                className="h-auto w-full"
              />
            </button>
          </li>
        ))}
      </ul>
      <Lightbox images={images} index={index} onIndex={setIndex} />
    </>
  )
}
