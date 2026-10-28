import { asset } from './asset'

/** Every outbound link in one place. */
export const INSTAGRAM_PROFILE = 'https://www.instagram.com/i.m.hemant_mahato/'

// TODO: paste the Wingy reel's Instagram URL. Until then the button opens my profile.
export const INSTAGRAM_REEL: string = 'TODO'
export const instagramReelHref = INSTAGRAM_REEL === 'TODO' ? INSTAGRAM_PROFILE : INSTAGRAM_REEL

export const EMAIL = '50hemantmahato@gmail.com'
export const LINKEDIN =
  'https://www.linkedin.com/in/hemant-mahato-7a328a260?utm_source=share_via&utm_content=profile&utm_medium=member_android'
export const GITHUB = 'https://github.com/hemant12345-boop'

export const MARKSHEET_AI_VIDEO = 'https://youtu.be/ivkFEzrzL7g'
export const POSESNAP_PLAY = 'https://play.google.com/store/apps/details?id=com.posesnap.app'
export const SUBCONSCIOUS_PLAY = 'https://play.google.com/store/apps/details?id=com.hemant.subconsciousunlock'

export const media = {
  reel: asset('/media/wingy-reel-720.mp4'),
  reelPoster: asset('/media/reel-poster.webp'),
} as const
