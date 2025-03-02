import { render } from '@testing-library/react'
import PlayerTitleBar from './PlayerTitleBar'

test('PlayerTitleBar matches snapshot', () => {
  const { container } = render(
    <PlayerTitleBar
      albumCoverPath="dummy-cover.jpg"
      albumArtist="Dummy Artist"
      albumTitle="Dummy Album"
      albumYear="2023"
      bandMembers={[
        'Stephan Roy - Vocals',
        'Brian Gunter - Guitar, Cello',
        'Dave LaFlam - Electric/Upright Bass',
        'James Beasley - Drums',
      ]}
    />
  )
  expect(container).toMatchSnapshot()
})
