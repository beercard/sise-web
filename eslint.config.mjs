import config from 'eslint-config-next/core-web-vitals';

const baseConfig = Array.isArray(config) ? config : [config];

const eslintConfig = [
  ...baseConfig,
  {
    ignores: ['.figma/**']
  }
];

export default eslintConfig;
