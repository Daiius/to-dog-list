import type { Meta, StoryObj } from '@storybook/react';
import Input from '@/components/base/Input';
import { fn } from '@storybook/test';

const meta: Meta<typeof Input> = {
	title: 'Base/Input',
	component: Input,
	tags: ['autodocs'],
	args: {
		placeholder: 'placeholder',
		onChange: fn(),
	}
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Example: Story = {
};

export const ExampleWithValue: Story = {
	args: { value: 'Test value' }
};

