import React from 'react'
import { Card, CardContent, Typography, Box } from '@mui/material'

interface TrackInfo {
  artist: string
  title: string
  seek: number
  duration: number
}

interface PlayerInfoPanelProps {
  trackInfo: TrackInfo
  albumCoverPath: string
}

const PlayerInfoPanel: React.FC<PlayerInfoPanelProps> = ({ trackInfo }) => {
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
      .toString()
      .padStart(2, '0')
    return `${minutes}:${remainingSeconds}`
  }

  return (
    <Card sx={{ backgroundColor: 'background.paper', mb: 2, borderRadius: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">{trackInfo.title}</Typography>
          <Typography variant="subtitle1">
            {formatTime(trackInfo.seek)} / {formatTime(trackInfo.duration)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default PlayerInfoPanel
