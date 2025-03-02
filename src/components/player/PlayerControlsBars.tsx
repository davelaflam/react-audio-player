import React, { useState, useEffect } from 'react'
import { Howler } from 'howler'
import { Box, IconButton, Slider, Typography } from '@mui/material'
import {
  SkipPrevious,
  SkipNext,
  PlayArrow,
  Pause,
  Stop,
  RepeatOne,
  Shuffle,
  VolumeUp,
  VolumeDown,
  VolumeOff,
} from '@mui/icons-material'

interface PlayerControlsBarsProps {
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

const PlayerControlsBars: React.FC<PlayerControlsBarsProps> = ({
  loop,
  shuffle,
  progress,
  playTrack,
  pauseTrack,
  stopTrack,
  skipTrack,
  toggleLoop,
  toggleShuffle,
  updateSeek,
}) => {
  const [volume, setVolume] = useState<number>(0.2)
  const [muted, setMuted] = useState<boolean>(false)

  useEffect(() => {
    Howler.volume(volume)
    if (volume > 0) {
      setMuted(false)
      Howler.mute(false)
    }
  }, [volume])

  const toggleMute = () => {
    const newMuted = !muted
    setMuted(newMuted)
    Howler.mute(newMuted)
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const mousePos = e.clientX - rect.left
    const percents = (mousePos / rect.width) * 100
    updateSeek(percents)
  }

  return (
    <Box sx={{ backgroundColor: 'background.paper', p: 2, borderRadius: 2 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 2,
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        {/* Volume Controls */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton onClick={toggleMute} color="inherit" aria-label="toggle volume">
            {muted ? (
              <VolumeOff sx={{ fontSize: '1.2rem' }} />
            ) : volume >= 0.5 ? (
              <VolumeUp sx={{ fontSize: '1.2rem' }} />
            ) : (
              <VolumeDown sx={{ fontSize: '1.2rem' }} />
            )}
          </IconButton>
          <Slider
            sx={{ width: 150 }}
            value={volume}
            onChange={(_e, newValue) => setVolume(newValue as number)}
            step={0.01}
            min={0}
            max={1}
            aria-label="Volume"
          />
          <Typography variant="body2">{(volume * 100).toFixed(0)}%</Typography>
        </Box>

        {/* Playback Controls */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton onClick={() => skipTrack('prev')} color="inherit" aria-label="previous">
            <SkipPrevious sx={{ fontSize: '1.2rem' }} />
          </IconButton>
          <IconButton onClick={() => stopTrack()} color="inherit" aria-label="stop">
            <Stop sx={{ fontSize: '1.2rem' }} />
          </IconButton>
          <IconButton onClick={() => playTrack()} color="inherit" aria-label="play">
            <PlayArrow sx={{ fontSize: '1.2rem' }} />
          </IconButton>
          <IconButton onClick={() => pauseTrack()} color="inherit" aria-label="pause">
            <Pause sx={{ fontSize: '1.2rem' }} />
          </IconButton>
          <IconButton onClick={() => skipTrack('next')} color="inherit" aria-label="next">
            <SkipNext sx={{ fontSize: '1.2rem' }} />
          </IconButton>
        </Box>

        {/* Loop and Shuffle Controls */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton onClick={() => toggleLoop(!loop)} color="inherit" aria-label="repeat">
            <RepeatOne sx={{ fontSize: '1.2rem', color: loop ? 'primary.main' : 'grey.500' }} />
          </IconButton>
          <IconButton onClick={() => toggleShuffle(!shuffle)} color="inherit" aria-label="shuffle">
            <Shuffle sx={{ fontSize: '1.2rem', color: shuffle ? 'primary.main' : 'grey.500' }} />
          </IconButton>
        </Box>
      </Box>

      {/* Progress Bar */}
      <Box
        sx={{
          height: 10,
          backgroundColor: 'grey.600',
          width: '100%',
          borderRadius: 1,
          cursor: 'pointer',
          position: 'relative',
        }}
        onClick={handleProgressClick}
      >
        <Box
          sx={{
            height: '100%',
            backgroundColor: 'primary.main',
            width: `${progress}%`,
            borderRadius: 1,
          }}
        />
      </Box>
    </Box>
  )
}

export default PlayerControlsBars
