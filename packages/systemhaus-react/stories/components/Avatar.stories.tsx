import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor, within } from 'storybook/test';

import { Avatar } from '../../src/components/Avatar';

const avatarArgTypes = {
  size: {
    control: 'select',
    options: ['default', 'sm', 'lg'],
    description: 'Avatar size variant.',
    table: {
      category: 'Appearance',
      type: { summary: "'default' | 'sm' | 'lg'" },
      defaultValue: { summary: 'default' },
    },
  },
  src: {
    control: 'text',
    description: 'Image source URL. Omit to render fallback only.',
    table: {
      category: 'Content',
      type: { summary: 'string | undefined' },
    },
  },
  alt: {
    control: 'text',
    description: 'Alternative text for the avatar image.',
    table: {
      category: 'Accessibility',
      type: { summary: 'string | undefined' },
    },
  },
  fallback: {
    control: 'text',
    description: 'Text rendered when the image is unavailable.',
    table: {
      category: 'Content',
      type: { summary: 'string | undefined' },
    },
  },
  imageProps: {
    control: 'object',
    description: 'Additional props forwarded to the image element.',
    table: {
      category: 'Image',
      type: { summary: 'object | undefined' },
    },
  },
  initial: {
    control: 'object',
    description: 'Initial motion state for the avatar root.',
    table: {
      category: 'Motion',
      type: { summary: '{ opacity?: number; x?: number; y?: number }' },
    },
  },
  animate: {
    control: 'object',
    description: 'Target motion state for the avatar root.',
    table: {
      category: 'Motion',
      type: { summary: '{ opacity?: number; x?: number; y?: number }' },
    },
  },
  exit: {
    control: 'object',
    description: 'Exit motion state for the avatar root.',
    table: {
      category: 'Motion',
      type: { summary: '{ opacity?: number; x?: number; y?: number }' },
    },
  },
} as const;

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'High-level Avatar component with built-in image/fallback rendering and root-level motion props.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: avatarArgTypes,
  args: {
    size: 'default',
    src: 'https://github.com/shadcn.png',
    alt: 'shadcn',
    fallback: 'CN',
  },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-end' }}>
      <Avatar {...args} size='sm' fallback='SM' />
      <Avatar {...args} size='default' fallback='MD' />
      <Avatar {...args} size='lg' fallback='LG' />
    </div>
  ),
  args: {
    src: 'https://github.com/shadcn.png',
    alt: 'shadcn',
  },
};

export const FallbackOnly: Story = {
  args: {
    src: undefined,
    alt: undefined,
    fallback: 'AB',
  },
};

export const BrokenImage: Story = {
  args: {
    src: 'https://example.com/404.png',
    alt: 'Missing',
    fallback: 'ER',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('ER')).toBeVisible();
  },
};

export const WithMotionProps: Story = {
  args: {
    src: 'https://example.com/404.png',
    alt: 'Missing',
    fallback: 'ER',
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(() => {
      const avatar = canvasElement.querySelector('[data-slot="avatar"]');
      expect(avatar).toHaveStyle({ opacity: '1' });
    });

    await expect(canvas.getByText('ER')).toBeVisible();
  },
};
