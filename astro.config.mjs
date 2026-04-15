// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
	// 本番URL（canonical・OGP・sitemap）。デプロイ先のドメインに必ず合わせる
	site: 'https://example.com',
	vite: {
		plugins: [tailwindcss()],
	},
});