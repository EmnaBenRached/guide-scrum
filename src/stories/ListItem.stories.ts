import type { Meta, StoryObj } from '@storybook/vue3';
import ListItem from '../components/ListItem.vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
    title: 'components/ListItem',
    component: ListItem,
    // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
} satisfies Meta<typeof ListItem>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
    args: {
        item: {
            id: '1',
            title: 'Item 1',
            description: 'Description for item 1',
            participants: [],
            progress: 0,
        },
    },
};

export const WithVeryLongTitle: Story = {
    args: {
        item: {
            id: '2',
            title: 'Very long title for an item that should be truncated',
            description: 'Description for item 1',
            participants: [],
            progress: 0,
        },
    },
};
