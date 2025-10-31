// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    base: "solarSystemThreejs", // Replace YOUR_REPOSITORY_NAME
    plugins: [react()],
});