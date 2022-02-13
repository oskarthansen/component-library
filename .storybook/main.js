module.exports = {
  stories: [
    '../packages/**/*.stories.mdx',
    '../packages/**/*.stories.@(js|jsx|ts|tsx)',
    '../docs/**/*.stories.@(js|jsx|ts|tsx)',
    '../docs/**/*.stories.mdx'
  ],
  addons: ['@storybook/addon-docs', '@storybook/addon-links', '@storybook/addon-essentials']
};
