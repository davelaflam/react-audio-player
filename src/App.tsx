import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Layout from './Layout'
import Player from './components/player/Player'
import { useArtistsStore } from './stores/artistsStore'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#2196f3' },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: { primary: '#fff', secondary: '#aaa' },
  },
})

const App: React.FC = () => {
  const artistsStore = useArtistsStore()
  const artistData = artistsStore.artists[0]
  if (!artistData) return <div>No artist data available</div>
  const album = artistData.albums[0]

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Player
                  playlist={album.tracks}
                  audioPath={artistData.audioPath}
                  albumCoverPath={album.cover}
                  albumTitle={album.title}
                  albumYear={album.year}
                  artist={artistData.artist}
                  bandMembers={artistData.bandMembers}
                />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
