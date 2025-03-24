import React from 'react'
import { List, ListItemButton, Typography, Paper } from '@mui/material'

import { useArtistsStore } from '../../stores/artistsStore'
import { PlayerPlaylistPanelProps, Track } from '../../types'

const PlayerPlaylistPanel: React.FC<PlayerPlaylistPanelProps> = ({ playlist, selectTrack }) => {
  const artistsStore = useArtistsStore()

  const handleSelectTrack = (track: Track, _index: number) => {
    if (artistsStore.globalSelectedTrack !== track) {
      artistsStore.setGlobalSelectedTrack(track)
      selectTrack(track)
    }
  }

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
      .toString()
      .padStart(2, '0')
    return `${minutes}:${remainingSeconds}`
  }

  return (
    <Paper
      sx={{
        backgroundColor: 'background.paper',
        borderRadius: 2,
        height: 330,
        p: 1,
        color: 'text.primary',
      }}
    >
      <List sx={{ maxHeight: '100%', overflowY: 'auto' }}>
        {playlist.map((track, index) => {
          if (!track.display) return null
          const isSelected = track === artistsStore.globalSelectedTrack
          return (
            <ListItemButton
              key={track.title}
              onClick={() => handleSelectTrack(track, index)}
              onDoubleClick={(e) => e.preventDefault()}
              sx={{
                bgcolor: isSelected ? 'primary.main' : index % 2 === 0 ? 'grey.800' : 'grey.900',
                '&:hover': { bgcolor: 'grey.700' },
                py: 1,
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Typography variant="body1" color="text.primary">
                {index + 1}. {track.title}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {formatTime(track.howl?.duration() ?? 0)}
              </Typography>
            </ListItemButton>
          )
        })}
      </List>
    </Paper>
  )
}

export default PlayerPlaylistPanel
