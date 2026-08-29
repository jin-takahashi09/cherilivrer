// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

const site = 'https://cherilivrer-git-290552559575.asia-northeast1.run.app';

// https://astro.build/config
export default defineConfig({
	// 本番URL（canonical・OGP・sitemap）。デプロイ先のドメインに必ず合わせる
	site,
	// 内部リンク・sitemap と揃え、/about/ /collection/ 形式に統一
	trailingSlash: 'always',
	vite: {
		plugins: [tailwindcss()],
	},
});
