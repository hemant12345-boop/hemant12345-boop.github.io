/**
 * Two pages share one app:
 * - `main` (/): the general portfolio for anyone.
 * - `wingy` (/wingy/): the original Wingy application version, kept as-is for links already sent.
 * The page picks its variant via `data-variant` on #root (see wingy/index.html).
 */
export type Variant = 'main' | 'wingy'

export const variantOf = (el: HTMLElement): Variant => (el.dataset.variant === 'wingy' ? 'wingy' : 'main')
