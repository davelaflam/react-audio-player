import type { Track } from './Track'

export interface Album {
  title: string
  year: string
  cover: string
  tracks: Track[]
}

export interface Artist {
  id: number
  artist: string
  imageUrl: string
  isActive: boolean
  createdAt: string
  createdBy: string
  deletedAt: string | null
  deletedBy: string | null
  updatedAt: string
  updatedBy: string | null
  albums: Album[]
  bandMembers: string[]
  audioPath: string
}

export interface ArtistState {
  artists: Artist[]
  artist?: Artist
  errors: Record<string, string | null>
  loading: Record<string, boolean>
  globalSelectedTrack: Track | null
  setGlobalSelectedTrack: (track: Track) => void
}
