import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'gold'
type Size = 'sm' | 'md' | 'lg'

const variants: Record<Variant, string> = {
  primary: 'bg-sent text-white shadow-sent hover:brightness-110',
  secondary: 'bg-bubble-strong text-ink ring-1 ring-hairline-strong ring-inset hover:bg-white/20',
  gold: 'bg-gold text-plum-800 shadow-[0_10px_28px_-10px_rgb(247_183_51/0.6)] hover:brightness-105',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm gap-1.5',
  md: 'h-12 px-6 text-base gap-2',
  lg: 'h-14 px-7 text-lg gap-2.5',
}

type Props = {
  children: ReactNode
  variant?: Variant
  size?: Size
  className?: string
  icon?: ReactNode
} & (
  | ({ href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children'>)
  | ({ href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'>)
)

/** Wingy-style pill button. Renders an <a> when given href. External links open in a new tab. */
export function Button({ children, variant = 'primary', size = 'md', className = '', icon, ...rest }: Props) {
  const cls = `inline-flex shrink-0 items-center justify-center rounded-full font-semibold tracking-tighter whitespace-nowrap select-none transition-[transform,filter,background-color] duration-press ease-out-expo active:scale-[0.97] ${variants[variant]} ${sizes[size]} ${className}`
  const content = (
    <>
      {icon && <span aria-hidden>{icon}</span>}
      {children}
    </>
  )

  if (rest.href !== undefined) {
    const external = /^https?:/.test(rest.href)
    return (
      <a
        className={cls}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    )
  }
  return (
    <button type="button" className={cls} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  )
}
