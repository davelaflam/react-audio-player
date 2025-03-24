import React from 'react'
import { Card, CardContent, Box, Typography, Avatar, List, ListItem } from '@mui/material'

import { PlayerTitleBarProps } from '../../types'

const PlayerTitleBar: React.FC<PlayerTitleBarProps> = ({
  albumCoverPath,
  albumArtist,
  albumTitle,
  albumYear,
  bandMembers,
}) => {
  return (
    <Card sx={{ width: '100%', mb: 2, borderRadius: 2 }}>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'center', md: 'flex-start' },
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Avatar
            variant="rounded"
            src={albumCoverPath}
            alt="Album Cover"
            sx={{
              width: { xs: 100, md: 150 },
              height: { xs: 100, md: 150 },
              mr: { md: 2 },
              mb: { xs: 2, md: 0 },
            }}
          />
          <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: { xs: 'center', md: 'flex-start' },
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  color: 'primary.main',
                  fontSize: { xs: '13px', md: '1.5rem' },
                }}
              >
                {albumArtist}
              </Typography>
              {albumTitle && (
                <>
                  <Typography
                    variant="h6"
                    sx={{
                      mx: 1,
                      color: 'grey.500',
                      fontSize: { xs: '13px', md: '1.25rem' },
                    }}
                  >
                    -
                  </Typography>
                  <Typography variant="h6" sx={{ fontSize: { xs: '13px', md: '1.25rem' } }}>
                    {albumTitle}
                  </Typography>
                </>
              )}
            </Box>
            <List
              dense
              sx={{
                pt: 1,
                display: 'flex',
                flexDirection: { xs: 'row', md: 'column' },
                flexWrap: { xs: 'wrap', md: 'nowrap' },
                gap: { xs: 1, md: 0.5 },
                justifyContent: { xs: 'center', md: 'flex-start' },
                p: 0,
              }}
            >
              {bandMembers.map((member, idx) => (
                <ListItem key={idx} sx={{ width: 'auto', p: 0 }}>
                  <Typography variant="body2" sx={{ fontSize: { xs: '12px', md: '14px' } }}>
                    {member}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>

        <Box sx={{ display: { xs: 'none', md: 'block' }, alignSelf: 'center' }}>
          <Typography variant="subtitle1" sx={{ color: 'grey.500', whiteSpace: 'nowrap', fontSize: { md: '1rem' } }}>
            {albumYear}
          </Typography>
        </Box>
      </CardContent>

      <Box sx={{ display: { xs: 'block', md: 'none' }, textAlign: 'center', mt: 1 }}>
        <Typography variant="subtitle2" sx={{ color: 'grey.500', fontSize: '12px' }}>
          {albumYear}
        </Typography>
      </Box>
    </Card>
  )
}

export default PlayerTitleBar
