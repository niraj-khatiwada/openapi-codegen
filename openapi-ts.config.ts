import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  client: '@hey-api/client-fetch',
  input:
    'https://raw.githubusercontent.com/swagger-api/swagger-petstore/master/src/main/resources/openapi.yaml',
  output: {
    format: 'prettier',
    path: './src/@api/gen',
  },
  types: {
    dates: 'types+transform',
    enums: 'javascript',
  },
  plugins: ['@tanstack/react-query'],
});
