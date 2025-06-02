import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  base: process.env.VITE_BASE_PATH ?? '',
  plugins: [tsconfigPaths()],
});

