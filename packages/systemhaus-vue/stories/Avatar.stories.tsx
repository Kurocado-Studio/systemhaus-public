import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { expect, waitFor, within } from 'storybook/test';



import Avatar from '@/components/Avatar.vue';





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
  render: (args) => ({
    components: { Avatar },
    setup() {
      return { args };
    },
    template: `
      <Avatar
        :size="args.size"
        :src="args.src"
        :alt="args.alt"
        :fallback="args.fallback"
        :initial="args.initial"
        :animate="args.animate"
        :exit="args.exit"
      />
    `,
  }),
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: (args) => ({
    components: { Avatar },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; gap: 24px; align-items: flex-end;">
        <Avatar :size="'sm'" :src="args.src" :alt="args.alt" fallback="SM" />
        <Avatar :size="'default'" :src="args.src" :alt="args.alt" fallback="MD" />
        <Avatar :size="'lg'" :src="args.src" :alt="args.alt" fallback="LG" />
      </div>
    `,
  }),
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
