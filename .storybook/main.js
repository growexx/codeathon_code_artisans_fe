const path = require('path');
const fs = require('fs');
const lessToJs = require('less-vars-to-js');
const themeVariables = lessToJs(
  fs.readFileSync(
    path.join(__dirname, '../app/styles/antDefaultVars.less'),
    'utf8',
  ),
);
module.exports = {
  stories: [
    "../app/**/stories/**/*.stories.mdx",
    "../app/**/stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
  ],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    config.resolve.modules.push(path.resolve(__dirname, "../app"));
    config.module.rules.push(
      {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
              modifyVars: themeVariables,
            },
          },
        ],
        include: path.resolve(__dirname, '../'),
      },
  );

    // Return the altered config
    return config;
  },
};
