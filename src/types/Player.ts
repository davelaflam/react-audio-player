import { Track } from './Track.ts'

export interface PlayerProps {
  playlist: Track[]
  audioPath?: string
  albumCoverPath: string
  albumTitle: string
  albumYear: string
  artist: string
  bandMembers: string[]
}

export interface PlayerControlsBarsProps {
  loop: boolean
  shuffle: boolean
  progress: number
  playTrack: () => void
  pauseTrack: () => void
  stopTrack: () => void
  skipTrack: (direction: 'next' | 'prev') => void
  toggleLoop: (value: boolean) => void
  toggleShuffle: (value: boolean) => void
  updateSeek: (percents: number) => void
}

export interface PlayerPlaylistPanelProps {
  playlist: Track[]
  selectedTrack: Track | null
  selectTrack: (track: Track) => void
  playTrack: (idx?: number) => void
}

export interface PlayerTitleBarProps {
  albumCoverPath: string
  albumArtist: string
  albumTitle: string
  albumYear: string
  bandMembers: string[]
}
