import { render, screen, fireEvent, act } from '@testing-library/react'
import Player from './Player'
import { Track } from './types'
import { Howl } from 'howler'

/**
 * The Howl interface is defined as follows:
 *   - Create a test Howl stub that satisfies the Howl interface.
 *   - Include the methods that our Player component uses.
 */
const testHowl = {
  play: jest.fn(() => 1),
  pause: jest.fn(),
  stop: jest.fn(),
  loop: jest.fn(),
  duration: () => 200,
  seek: jest.fn(() => 0),
  playing: jest.fn(() => false),
  mute: jest.fn(),
  volume: jest.fn(),
  fade: jest.fn(),
  rate: jest.fn(),
} as unknown as Howl

// Create a test playlist using the testHowl instance directly (without the spread operator)
const dummyPlaylist: Track[] = [
  { title: 'Song 1', artist: 'Artist', howl: testHowl, display: true },
  { title: 'Song 2', artist: 'Artist', howl: testHowl, display: true },
]

// mock the store
jest.mock('../../stores/artistsStore', () => ({
  useArtistsStore: () => ({
    artists: [],
    globalSelectedTrack: null,
    setGlobalSelectedTrack: jest.fn(),
  }),
}))

describe('Player Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders and plays a track when play is clicked', () => {
    render(
      <Player
        playlist={dummyPlaylist}
        audioPath="dummy"
        albumCoverPath="dummy-cover.jpg"
        albumTitle="Dummy Album"
        albumYear="2023"
        artist="Dummy Artist"
        bandMembers={['Member 1', 'Member 2']}
      />
    )

    /**
     * The play button is found by its aria-label attribute value "play".
     */
    const playButton = screen.getByRole('button', { name: /play/i })
    act(() => {
      fireEvent.click(playButton)
    })

    /**
     * Expect the play method on the test Howl instance to have been called.
     */
    expect(dummyPlaylist[0].howl?.play).toHaveBeenCalled()
  })
})
