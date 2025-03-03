import type { Howl } from 'howler'

export interface Track {
  title: string
  artist: string
  howl: Howl | null
  display: boolean
  artWork?: string
  src?: string
}

export interface TrackInfo {
  artist: string
  title: string
  seek: number
  duration: number
}
