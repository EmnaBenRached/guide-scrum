// import type { Meta, StoryObj } from '@storybook/vue3';
// import ConfirmModal from '../components/ConfirmModal.vue';
// import { actions } from '@storybook/addon-actions';

// // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
// const meta = {
//     title: 'components/ConfirmModal',
//     component: ConfirmModal,
//     // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
//     tags: ['autodocs'],
// } satisfies Meta<typeof ConfirmModal>;

// export default meta;
// type Story = StoryObj<typeof meta>;

// /*
//  *👇 Render functions are a framework specific feature to allow you control on how the component renders.
//  * See https://storybook.js.org/docs/api/csf
//  * to learn how to use render functions.
//  */
// export const Default: Story = {
//     // render: (args) => ({
//     //     components: { ConfirmModal },
//     //     methods: actions('save'),
//     //     template: `
//     //         <ConfirmModal  @save="save"/>
//     //     `,
//     // }),
//     args: {
//         open: true,
//         message: 'Êtes-vous sûr?',
//         title: 'Supprimer',
//     },
// };
