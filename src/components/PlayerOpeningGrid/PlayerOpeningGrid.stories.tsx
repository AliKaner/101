import type { Meta, StoryObj } from '@storybook/react';
import PlayerOpeningGrid from './index';
import type { OpenedTile } from '../../types';

const meta = {
  title: 'Components/PlayerOpeningGrid',
  component: PlayerOpeningGrid,
  tags: ['autodocs'],
} satisfies Meta<typeof PlayerOpeningGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockTile = (n: number, c: number): OpenedTile => ({
  uniqueID: n*10+c,
  number: n,
  color: c,
  isJoker: false,
  isOkey: false,
  group_id: 1,
});

const mockGroups: OpenedTile[][] = [
  [mockTile(1,1), mockTile(2,1), mockTile(3,1)], // Run 1-2-3 Yellow
  [mockTile(10,2), mockTile(10,3), mockTile(10,4)], // Set 10s
];

export const Default: Story = {
  args: {
    groups: mockGroups,
  },
};

export const Empty: Story = {
  args: {
    groups: [],
  },
};
