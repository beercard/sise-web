import config from 'eslint-config-next/core-web-vitals';

const baseConfig = Array.isArray(config) ? config : [config];

const eslintConfig = [
  ...baseConfig,
  {
    ignores: ['.figma/**']
  },
  {
    files: ['**/*.{js,jsx,mjs,ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['**/.figma/**', '.figma/**'],
              message:
                'No importes desde .figma/: está en .gitignore y el build de CI va a fallar. Mové el asset a public/image/ y usá su ruta, por ejemplo "/image/mi-imagen.webp".'
            }
          ]
        }
      ]
    }
  }
];

export default eslintConfig;
