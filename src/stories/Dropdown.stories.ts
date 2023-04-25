import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from '../components/Dropdown/Dropdown';

const meta = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
    selected: 'Option 1',
    onSelect: (option: string) => console.log(option),
  },
};
