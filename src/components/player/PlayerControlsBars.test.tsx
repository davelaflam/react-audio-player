import { render, screen, fireEvent } from '@testing-library/react'
import PlayerControlsBars from './PlayerControlsBars'
import { Howler } from 'howler'

describe('PlayerControlsBars', () => {
  const playTrack = jest.fn()
  const pauseTrack = jest.fn()
  const stopTrack = jest.fn()
  const skipTrack = jest.fn()
  const toggleLoop = jest.fn()
  const toggleShuffle = jest.fn()
  const updateSeek = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('updates volume on slider change', () => {
    render(
      <PlayerControlsBars
        loop={false}
        shuffle={false}
        progress={50}
        playTrack={jest.fn()}
        pauseTrack={jest.fn()}
        stopTrack={jest.fn()}
        skipTrack={jest.fn()}
        toggleLoop={jest.fn()}
        toggleShuffle={jest.fn()}
        updateSeek={updateSeek}
      />
    )

    // Query the slider using its aria-label ("Volume")
    const volumeSlider = screen.getByRole('slider', { name: /volume/i }) as HTMLInputElement
    fireEvent.change(volumeSlider, { target: { value: '0.5' } })
    expect(volumeSlider.value).toBe('0.5')
  })

  test('renders play button and calls playTrack on click', () => {
    render(
      <PlayerControlsBars
        loop={false}
        shuffle={false}
        progress={50}
        playTrack={playTrack}
        pauseTrack={pauseTrack}
        stopTrack={stopTrack}
        skipTrack={skipTrack}
        toggleLoop={toggleLoop}
        toggleShuffle={toggleShuffle}
        updateSeek={updateSeek}
      />
    )
    const playButton = screen.getByRole('button', { name: /play/i })
    fireEvent.click(playButton)
    expect(playTrack).toHaveBeenCalled()
  })

  test('renders pause button and calls pauseTrack on click', () => {
    render(
      <PlayerControlsBars
        loop={false}
        shuffle={false}
        progress={50}
        playTrack={playTrack}
        pauseTrack={pauseTrack}
        stopTrack={stopTrack}
        skipTrack={skipTrack}
        toggleLoop={toggleLoop}
        toggleShuffle={toggleShuffle}
        updateSeek={updateSeek}
      />
    )
    const pauseButton = screen.getByRole('button', { name: /pause/i })
    fireEvent.click(pauseButton)
    expect(pauseTrack).toHaveBeenCalled()
  })

  test('toggles mute state on click', () => {
    // Spy on Howler.mute with a mock implementation that uses _muted to avoid ESLint errors.
    const muteSpy = jest.spyOn(Howler, 'mute').mockImplementation((_muted: boolean) => Howler)

    render(
      <PlayerControlsBars
        loop={false}
        shuffle={false}
        progress={50}
        playTrack={playTrack}
        pauseTrack={pauseTrack}
        stopTrack={stopTrack}
        skipTrack={skipTrack}
        toggleLoop={toggleLoop}
        toggleShuffle={toggleShuffle}
        updateSeek={updateSeek}
      />
    )

    const volumeButton = screen.getByRole('button', { name: /toggle volume/i })

    // Click to mute.
    fireEvent.click(volumeButton)
    expect(muteSpy).toHaveBeenCalledWith(true)

    // Click again to unmute.
    fireEvent.click(volumeButton)
    expect(muteSpy).toHaveBeenCalledWith(false)

    muteSpy.mockRestore()
  })

  test('renders previous and next buttons and calls skipTrack on click', () => {
    render(
      <PlayerControlsBars
        loop={false}
        shuffle={false}
        progress={50}
        playTrack={playTrack}
        pauseTrack={pauseTrack}
        stopTrack={stopTrack}
        skipTrack={skipTrack}
        toggleLoop={toggleLoop}
        toggleShuffle={toggleShuffle}
        updateSeek={updateSeek}
      />
    )
    const prevButton = screen.getByRole('button', { name: /previous/i })
    const nextButton = screen.getByRole('button', { name: /next/i })
    fireEvent.click(prevButton)
    expect(skipTrack).toHaveBeenCalledWith('prev')
    fireEvent.click(nextButton)
    expect(skipTrack).toHaveBeenCalledWith('next')
  })

  test('renders toggle loop button and calls toggleLoop on click', () => {
    render(
      <PlayerControlsBars
        loop={false}
        shuffle={false}
        progress={50}
        playTrack={playTrack}
        pauseTrack={pauseTrack}
        stopTrack={stopTrack}
        skipTrack={skipTrack}
        toggleLoop={toggleLoop}
        toggleShuffle={toggleShuffle}
        updateSeek={updateSeek}
      />
    )
    const loopButton = screen.getByRole('button', { name: /repeat/i })
    fireEvent.click(loopButton)
    expect(toggleLoop).toHaveBeenCalledWith(true)
  })

  test('renders toggle shuffle button and calls toggleShuffle on click', () => {
    render(
      <PlayerControlsBars
        loop={false}
        shuffle={false}
        progress={50}
        playTrack={playTrack}
        pauseTrack={pauseTrack}
        stopTrack={stopTrack}
        skipTrack={skipTrack}
        toggleLoop={toggleLoop}
        toggleShuffle={toggleShuffle}
        updateSeek={updateSeek}
      />
    )
    const shuffleButton = screen.getByRole('button', { name: /shuffle/i })
    fireEvent.click(shuffleButton)
    expect(toggleShuffle).toHaveBeenCalledWith(true)
  })
})
