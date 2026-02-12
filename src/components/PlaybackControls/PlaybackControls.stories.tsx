import type { Meta, StoryObj } from '@storybook/react';
import PlaybackControls from './index';

const noop = () => {};

const meta = {
  title: 'Components/PlaybackControls',
  component: PlaybackControls,
  tags: ['autodocs'],
  args: {
    onToggle: noop,
    onNext: noop,
    onPrev: noop,
    onReset: noop,
    onBack: noop,
  },
  argTypes: {
    isPlaying: { control: 'boolean' },
  },
} satisfies Meta<typeof PlaybackControls>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playing: Story = {
  args: {
    isPlaying: true,
    currentAction: {
      action_name: 'StartGame',
      action_time: '2023-10-27T10:00:00',
      seat_index: 0,
      user_id: 'user1',
      user_name: 'Player 1',
      tile: null,
      tiles_after: null,
      series_opened: null,
      merged_tiles: null,
      penalty: null,
      series_open_score: 0,
    } as any,
  },
};

export const Paused: Story = {
  args: {
    isPlaying: false,
    currentAction: {
      action_name: 'DiscardTile',
      action_time: '2023-10-27T10:05:00',
      seat_index: 1,
      user_id: 'user2',
      user_name: 'Player 2',
      tile: { uniqueID: 10, number: 5, color: 2, isJoker: false, isOkey: false },
      tiles_after: [],
      series_opened: null,
      merged_tiles: null,
      penalty: null,
      series_open_score: 0,
    } as any,
  },
};
