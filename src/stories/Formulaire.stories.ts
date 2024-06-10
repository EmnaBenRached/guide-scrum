import type { Meta, StoryObj } from '@storybook/vue3';
import Formulaire from '../components/Formulaire.vue';
import { actions } from '@storybook/addon-actions';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
    title: 'Example/Formulaire',
    component: Formulaire,
    // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
} satisfies Meta<typeof Formulaire>;

export default meta;
type Story = StoryObj<typeof meta>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
    render: (args) => ({
        components: { Formulaire },
        methods: actions('save'),
        template: `
            <Formulaire  @save="save"/>
        `,
    }),
    args: {},
};
