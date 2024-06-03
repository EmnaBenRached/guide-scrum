import type { Meta, StoryObj } from '@storybook/vue3';
import ListItems from '../components/ListItems.vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
    title: 'Example/ListItems',
    component: ListItems,
    // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
} satisfies Meta<typeof ListItems>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
    args: {
        title: 'To do list',
        items: [
            {
                title: 'Task 1',
                description: 'Description for Task 1',
                participants: [],
                progress: 0,
            },
            {
                title: 'Task 2',
                description: 'Description for Task 2',
                participants: [],
                progress: 0,
            },
            {
                title: 'Task 3',
                description: 'Description for Task 3',
                participants: [
                    {
                        name: 'John Doe',
                        email: 'JohnDoe@gmail.com',
                        avatar: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
                    },
                    {
                        name: 'John Doe',
                        email: 'JohnDoe@gmail.com',
                        avatar: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
                    },
                ],
                progress: 0,
            },
        ],
    },
};
