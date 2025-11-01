import { defineConfig } from 'vite';

// Pure Vite config for plain JS + Three.js project
export default defineConfig({
    base: '/',
    build: {
        outDir: 'dist',
    },
});
