import type { Meta, StoryObj } from '@storybook/vue3';
import FormItem from '../components/FormItem.vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
    title: 'Components/FormItem',
    component: FormItem,
    // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
} satisfies Meta<typeof FormItem>;

export default meta;
type Story = StoryObj<typeof meta>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */

export const TextAreaWithoutTitle: Story = {
    args: {
        initialData: {
            id: '1',
            title: '',
            description: '',
            participants: [],
            progress: 0,
        },
    },
};

export const TextAreaWithTitle: Story = {
    args: {
        initialData: {
            id: '1',
            title: 'Item 1',
            description: 'Description of item 1',
            participants: [],
            progress: 0,
        },
    },
};
