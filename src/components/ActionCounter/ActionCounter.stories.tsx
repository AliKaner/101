import type { Meta, StoryObj } from '@storybook/react';
import ActionCounter from './index';

const meta = {
  title: 'Components/ActionCounter',
  component: ActionCounter,
  tags: ['autodocs'],
  argTypes: {
    currentIndex: { control: 'number' },
    totalActions: { control: 'number' },
  },
} satisfies Meta<typeof ActionCounter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentIndex: 15,
    totalActions: 100,
  },
};

export const Start: Story = {
  args: {
    currentIndex: 0,
    totalActions: 50,
  },
};

export const End: Story = {
  args: {
    currentIndex: 50,
    totalActions: 50,
  },
};
