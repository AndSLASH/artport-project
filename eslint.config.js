import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import prettierPlugin from 'eslint-plugin-prettier';

const config = [
  ...nextCoreWebVitals,
  {
    ignores: [
      'node_modules/',
      '.next/',
      'out/',
      'dist/',
      'src/generated/',
      'pnpm-lock.yaml',
      '*.js',
    ],
    plugins: { prettier: prettierPlugin },
    rules: {
      'prettier/prettier': 'warn',
    },
  },
];

export default config;
