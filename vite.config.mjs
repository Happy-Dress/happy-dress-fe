import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

/// reference types=”vitest” />

export default defineConfig({
    plugins: [react(), svgr({ include: ['**/*.svg?react', '**/*.svg'] })],
    base: './',
    build: {
        outDir: 'dist',
        assetsDir: 'assets'
    },
    server: {
        host: '127.0.0.1',
        port: 3000,
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/setupTests.js',
        coverage: {
            provider: 'istanbul',
            reporter: ['text', 'json', 'html'],
        },
    }
});