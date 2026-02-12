import type { Meta, StoryObj } from '@storybook/react';
import WinnerOverlay from './index';

const meta = {
  title: 'Components/WinnerOverlay',
  component: WinnerOverlay,
  tags: ['autodocs'],
  argTypes: {
    winnerName: { control: 'text' },
  },
} satisfies Meta<typeof WinnerOverlay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    winnerName: 'Player 1',
  },
};

export const LongName: Story = {
  args: {
    winnerName: 'Super Long Player Name 123456789',
  },
};
