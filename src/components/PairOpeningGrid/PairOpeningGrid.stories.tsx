import type { Meta, StoryObj } from '@storybook/react';
import PairOpeningGrid from './index';
import type { OpenedTile } from '../../types';

const meta = {
  title: 'Components/PairOpeningGrid',
  component: PairOpeningGrid,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
  },
} satisfies Meta<typeof PairOpeningGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockTile = (n: number, c: number): OpenedTile => ({
  uniqueID: n*10+c,
  number: n,
  color: c,
  isJoker: false,
  isOkey: false,
  group_id: 0,
});

const mockCells = [
  { tile: mockTile(1,1), row: 0, col: 0 },
  { tile: mockTile(1,2), row: 0, col: 1 },
  { tile: mockTile(8,3), row: 1, col: 0 },
  { tile: mockTile(8,4), row: 1, col: 1 },
];

export const Default: Story = {
  args: {
    label: 'Player 1 Pairs',
    cells: mockCells,
  },
};

export const Empty: Story = {
  args: {
    label: 'Empty Grid',
    cells: [],
  },
};
