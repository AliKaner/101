import type { Meta, StoryObj } from '@storybook/react';
import PlayerRack from './index';

const meta = {
  title: 'Components/PlayerRack',
  component: PlayerRack,
  tags: ['autodocs'],
  argTypes: {
    playerName: { control: 'text' },
    position: {
      control: { type: 'select', options: ['top', 'bottom', 'left', 'right'] },
    },
    isActive: { control: 'boolean' },
    seatIndex: { control: 'number' },
    okeyTileId: { control: 'number' },
  },
} satisfies Meta<typeof PlayerRack>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockTiles = [
  { uniqueID: 1, number: 1, color: 1, isJoker: false, isOkey: false },
  { uniqueID: 2, number: 2, color: 1, isJoker: false, isOkey: false },
  { uniqueID: 3, number: 3, color: 1, isJoker: false, isOkey: false },
  { uniqueID: 4, number: 10, color: 2, isJoker: false, isOkey: false },
  { uniqueID: 5, number: 12, color: 3, isJoker: false, isOkey: true , x: 300},
];

export const Default: Story = {
  args: {
    playerName: 'Player 1',
    tiles: mockTiles,
    position: 'bottom',
    isActive: true,
    seatIndex: 0,
    okeyTileId: 5,
  },
};

export const Empty: Story = {
  args: {
    playerName: 'Player 2',
    tiles: [],
    position: 'top',
    isActive: false,
    seatIndex: 1,
  },
};
