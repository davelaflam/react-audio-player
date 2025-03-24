import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import { Howl } from 'howler'
import { Box, Paper } from '@mui/material'

import { useArtistsStore } from '../../stores/artistsStore'
import PlayerPlaylistPanel from './PlayerPlaylistPanel'
import PlayerControlsBars from './PlayerControlsBars'
import PlayerInfoPanel from './PlayerInfoPanel'
import PlayerTitleBar from './PlayerTitleBar'
import { PlayerProps, Track, TrackInfo } from '../../types'

let globalActivePlayer: Howl | null = null

const Player: React.FC<PlayerProps> = ({
  playlist,
  audioPath = 'miller-lane',
  albumCoverPath,
  albumTitle,
  albumYear,
  artist,
  bandMembers,
}) => {
  const artistsStore = useArtistsStore()
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null)
  const [index, setIndex] = useState<number>(0)
  const [playing, setPlaying] = useState<boolean>(false)
  const [loop, setLoop] = useState<boolean>(false)
  const [shuffle, setShuffle] = useState<boolean>(false)
  const [seek, setSeek] = useState<number>(0)
  const updateSeekIntervalRef = useRef<number | null>(null)

  const indexRef = useRef(index)
  useEffect(() => {
    indexRef.current = index
  }, [index])
  const loopRef = useRef(loop)
  const shuffleRef = useRef(shuffle)
  useEffect(() => {
    loopRef.current = loop
  }, [loop])
  useEffect(() => {
    shuffleRef.current = shuffle
  }, [shuffle])

  const noTracks = !playlist || playlist.length === 0
  const validIndex = index < playlist.length ? index : 0
  const currentTrack = useMemo(() => playlist[validIndex], [playlist, validIndex])
  const progress = useMemo(() => {
    if (currentTrack?.howl && typeof currentTrack.howl.duration === 'function') {
      return (seek / currentTrack.howl.duration()) * 100
    }
    return 0
  }, [currentTrack, seek])
  const getTrackInfo: TrackInfo = useMemo(
    () => ({
      artist: currentTrack?.artist || '',
      title: currentTrack?.title || '',
      seek,
      duration:
        currentTrack?.howl && typeof currentTrack.howl.duration === 'function' ? currentTrack.howl.duration() : 0,
    }),
    [currentTrack, seek]
  )

  useEffect(() => {
    if (playing && currentTrack?.howl) {
      updateSeekIntervalRef.current = window.setInterval(() => {
        const currentSeek = currentTrack.howl!.seek() as number
        setSeek(currentSeek)
      }, 250)
    } else if (updateSeekIntervalRef.current) {
      clearInterval(updateSeekIntervalRef.current)
      updateSeekIntervalRef.current = null
    }
    return () => {
      if (updateSeekIntervalRef.current) clearInterval(updateSeekIntervalRef.current)
    }
  }, [playing, currentTrack])

  useEffect(() => {
    playlist.forEach((track) => {
      const file = track.title.replace(/\s/g, '_')
      const srcPath = `/music/${audioPath}/${file}.mp3`
      // console.log('Attempting to load:', srcPath)

      if (!track.howl) {
        track.howl = new Howl({
          src: [srcPath],
          html5: true,
          onload: () => console.log(`${file} loaded`),
          onloaderror: (_id, error) => console.error(`Error loading ${file}:`, error),
          onend: () => {
            console.log(`Track "${file}" ended`)

            // Ensure this onend callback only applies if this track is still active.
            if (globalActivePlayer !== track.howl) {
              console.log(`onend: "${file}" is not active; ignoring.`)
              return
            }
            if (loopRef.current) {
              // Repeat the current track.
              play(indexRef.current)
            } else if (shuffleRef.current) {
              // Pick a random track different from current.
              let newIndex = Math.floor(Math.random() * playlist.length)
              if (playlist.length > 1) {
                while (newIndex === indexRef.current) {
                  newIndex = Math.floor(Math.random() * playlist.length)
                }
              }
              play(newIndex)
            } else {
              // Play next track in order.
              skip('next')
            }
          },
        })
      }
    })
  }, [audioPath, playlist])

  function selectTrack(track: Track) {
    console.log('selectTrack:', track.title)
    setSelectedTrack(track)
    const trackIndex = playlist.findIndex((t) => t === track)
    setIndex(trackIndex)
    artistsStore.setGlobalSelectedTrack(track)
    play(trackIndex)
  }

  const play = useCallback(
    (idx?: number) => {
      const newIndex = idx !== undefined ? idx : validIndex

      // If switching to a new track, stop the previous track.
      if (globalActivePlayer && globalActivePlayer !== playlist[newIndex].howl) {
        console.log('Switching tracks: stopping previous track')
        globalActivePlayer.loop(false)
        globalActivePlayer.stop()
        globalActivePlayer = null
      }

      if (!playlist[newIndex]) {
        console.error('Invalid track index:', newIndex, playlist)
        return
      }

      setIndex(newIndex)
      const track = playlist[newIndex]
      console.log('Attempting to play track:', track.title)
      setSelectedTrack(track)
      artistsStore.setGlobalSelectedTrack(track)
      indexRef.current = newIndex

      // Set the track to loop if repeat is enabled.
      if (track.howl) {
        track.howl.loop(loop)
        const playId = track.howl.play()
        console.log(`Playing track "${track.title}" with playId:`, playId)
        globalActivePlayer = track.howl
        setPlaying(true)
      } else {
        console.error(`Track "${track.title}" has no howl instance`)
      }
    },
    [validIndex, playlist, loop, setIndex, setSelectedTrack, setPlaying, artistsStore] // Dependencies
  )

  function pause() {
    console.log('Pausing track')
    currentTrack?.howl?.pause()
    setPlaying(false)
  }

  function stop() {
    console.log('Stopping track')
    currentTrack?.howl?.stop()
    setPlaying(false)
    if (globalActivePlayer === currentTrack?.howl) {
      globalActivePlayer = null
    }
  }

  const skip = useCallback(
    (direction: 'next' | 'prev') => {
      console.log('Skipping track:', direction)
      if (currentTrack?.howl?.playing()) {
        currentTrack.howl.stop()
      }

      let newIndex = validIndex

      if (shuffleRef.current) {
        newIndex = Math.floor(Math.random() * playlist.length)
        if (playlist.length > 1) {
          while (newIndex === indexRef.current) {
            newIndex = Math.floor(Math.random() * playlist.length)
          }
        }
      } else {
        newIndex =
          direction === 'next'
            ? (indexRef.current + 1) % playlist.length
            : (indexRef.current - 1 + playlist.length) % playlist.length
      }

      setIndex(newIndex)
      play(newIndex)
      artistsStore.setGlobalSelectedTrack(playlist[newIndex])
    },
    [currentTrack.howl, validIndex, play, artistsStore, playlist] // Dependencies
  )

  /**
   * Toggle functions: activating one disables the other.
   * @param value
   */
  function toggleLoop(value: boolean) {
    console.log('Toggle loop:', value)
    setLoop(value)
    if (value) {
      setShuffle(false)
      if (currentTrack?.howl) currentTrack.howl.loop(true)
    }
  }

  function toggleShuffle(value: boolean) {
    console.log('Toggle shuffle:', value)
    setShuffle(value)
    if (value) {
      setLoop(false)
      if (currentTrack?.howl) currentTrack.howl.loop(false)
    }
  }

  function setSeekPercents(percents: number) {
    if (currentTrack?.howl && typeof currentTrack.howl.duration === 'function') {
      const newSeek = (currentTrack.howl.duration() * percents) / 100
      console.log('Seeking to:', newSeek)
      currentTrack.howl.seek(newSeek)
    }
  }

  return (
    <Paper
      sx={{
        backgroundColor: 'background.paper',
        borderRadius: 2,
        p: 2,
        color: 'text.primary',
      }}
    >
      {noTracks ? (
        <Box>No tracks available</Box>
      ) : (
        <Box>
          <PlayerTitleBar
            albumCoverPath={albumCoverPath}
            albumArtist={artist}
            albumTitle={albumTitle}
            albumYear={albumYear}
            bandMembers={bandMembers}
          />
          <PlayerInfoPanel trackInfo={getTrackInfo} albumCoverPath={albumCoverPath} />
          <PlayerControlsBars
            loop={loop}
            shuffle={shuffle}
            progress={progress}
            playTrack={play}
            pauseTrack={pause}
            stopTrack={stop}
            skipTrack={skip}
            toggleLoop={toggleLoop}
            toggleShuffle={toggleShuffle}
            updateSeek={setSeekPercents}
          />
          <PlayerPlaylistPanel
            playlist={playlist}
            selectedTrack={selectedTrack}
            selectTrack={selectTrack}
            playTrack={play}
          />
        </Box>
      )}
    </Paper>
  )
}

export default Player
