// import type { StorybookConfig } from '@storybook/vue3-vite';
// import { mergeConfig } from 'vite';

// const config: StorybookConfig = {
//     stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
//     addons: [
//         '@storybook/addon-links',
//         '@storybook/addon-essentials',
//         '@chromatic-com/storybook',
//         '@storybook/addon-interactions',
//     ],
//     framework: {
//         name: '@storybook/vue3-vite',
//         options: {},
//     },
//     // core: {
//     //     builder: 'storybook-builder-vite',
//     // },
//     viteFinal: async (config) => {
//         config.plugins?.push(require('vite-svg-loader')());
//         return config;
//     },
// };
// export default config;

import { StorybookConfig } from '@storybook/vue3-vite';
import { mergeConfig } from 'vite';
import svgLoader from 'vite-svg-loader';

const config: StorybookConfig = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@chromatic-com/storybook',
        '@storybook/addon-interactions',
    ],
    framework: {
        name: '@storybook/vue3-vite',
        options: {},
    },
    viteFinal: async (config) => {
        return mergeConfig(config, {
            plugins: [svgLoader()],
        });
    },
};

export default config;
