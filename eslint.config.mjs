import config from 'eslint-config-next/core-web-vitals';

const baseConfig = Array.isArray(config) ? config : [config];

const eslintConfig = [
  ...baseConfig,
  {
    ignores: ['.figma/**']
  },
  {
    /*
     * `.figma/` es una carpeta de trabajo y está en .gitignore: los archivos
     * existen en local pero nunca llegan al repo, así que un import que apunte
     * ahí compila en la máquina de uno y rompe el build de CI con
     * "Module not found". Los assets van a /public/image y se referencian con
     * su ruta ('/image/loquesea.webp').
     */
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
