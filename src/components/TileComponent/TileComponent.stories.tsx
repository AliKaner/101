import type { Meta, StoryObj } from '@storybook/react';
import TileComponent from './index';

const meta = {
  title: 'Components/TileComponent',
  component: TileComponent,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select', options: ['tiny', 'small', 'medium', 'large'] },
    },
    isOkey: { control: 'boolean' },
    showBack: { control: 'boolean' },
    highlighted: { control: 'boolean' },
  },
} satisfies Meta<typeof TileComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tile: {
      uniqueID: 1,
      number: 10,
      color: 2, // Blue
      isJoker: false,
      isOkey: false,
    },
    size: 'medium',
  },
};

export const OkeyTile: Story = {
  args: {
    tile: {
      uniqueID: 2,
      number: 1,
      color: 3, // Red
      isJoker: false,
      isOkey: true,
    },
    isOkey: true,
  },
};

export const JokerTile: Story = {
  args: {
    tile: {
      uniqueID: 3,
      number: 0,
      color: 0,
      isJoker: true,
      isOkey: false,
    },
  },
};

export const BackTile: Story = {
  args: {
    tile: {
      uniqueID: 4,
      number: 5,
      color: 1, // Yellow
      isJoker: false,
      isOkey: true,
    },
    isOkey: true,
    showBack: true,
  },
};

export const Highlighted: Story = {
  args: {
    tile: {
      uniqueID: 5,
      number: 13,
      color: 4, // Black
      isJoker: false,
      isOkey: false,
    },
    highlighted: true,
  },
};
