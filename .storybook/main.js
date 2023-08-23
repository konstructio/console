module.exports = {
  stories: ['./**/**/*.stories.mdx', '../**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-mdx-gfm'
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {}
  },
  features: {
    previewMdx2: true,
  },
  typescript: {
    reactDocgen: 'react-docgen',
  },
};
