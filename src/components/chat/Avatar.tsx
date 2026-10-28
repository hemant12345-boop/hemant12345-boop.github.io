/** Swap to '/assets/avatar.webp' once the crop from zero1-photo.jpg exists. */
export const AVATAR_SRC: string | null = null

type Props = {
  size?: number
  online?: boolean
  className?: string
}

export function Avatar({ size = 28, online = false, className = '' }: Props) {
  return (
    <span
      className={`relative inline-block shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      {AVATAR_SRC ? (
        <img
          src={AVATAR_SRC}
          alt="Hemant"
          width={size}
          height={size}
          decoding="async"
          className="size-full rounded-full object-cover ring-1 ring-hairline-strong"
        />
      ) : (
        <span
          aria-label="Hemant"
          role="img"
          className="grid size-full place-items-center rounded-full bg-sent font-display font-extrabold tracking-tightest text-white ring-1 ring-hairline-strong"
          style={{ fontSize: size * 0.46 }}
        >
          H
        </span>
      )}
      {online && (
        <span
          className="absolute right-0 bottom-0 block rounded-full bg-online ring-2 ring-plum-900"
          style={{ width: size * 0.3, height: size * 0.3 }}
        />
      )}
    </span>
  )
}
