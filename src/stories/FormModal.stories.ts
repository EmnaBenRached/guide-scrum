import type { Meta, StoryObj } from '@storybook/vue3';
import FormModal from '../components/FormModal.vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
    title: 'components/FormModal',
    component: FormModal,
    // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
} satisfies Meta<typeof FormModal>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const AjouterUnItem: Story = {
    args: {
        show: true,
        title: 'Ajouter un item',
    },
};

export const ModifierUnItem: Story = {
    args: {
        show: true,
        title: 'Modifier un item',
    },
};
export const PasAfficherLeModal: Story = {
    args: {
        show: false,
        title: 'Modifier un item',
    },
};
