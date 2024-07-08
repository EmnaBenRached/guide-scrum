import type { Meta, StoryObj } from '@storybook/vue3';
import GroupItems from '../components/GroupItems.vue';
import { groupMocks } from '../domain/mocks';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
    title: 'Components/GroupItems',
    component: GroupItems,
    // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
} satisfies Meta<typeof GroupItems>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
    args: {
        group: groupMocks[0],
    },
};
