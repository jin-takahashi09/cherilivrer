/**
 * 同一ページ内クリック時のみ # アンカー（例: /#about）をスムーズスクロール。
 * 別ページからの遷移は Layout で scroll-behavior を付けず、即時ジャンプに任せる。
 * prefers-reduced-motion では auto。
 */
export function initSmoothScrollNav() {
	document.addEventListener('click', (e) => {
		const a = e.target.closest('a');
		if (!a) return;
		const href = a.getAttribute('href');
		if (!href || href === '#') return;

		let path;
		let hash;
		try {
			const url = new URL(href, window.location.href);
			path = url.pathname.replace(/\/$/, '') || '/';
			hash = url.hash;
		} catch {
			return;
		}
		if (!hash) return;

		const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
		if (path !== currentPath) return;

		const id = decodeURIComponent(hash.slice(1));
		if (!id) return;
		const el = document.getElementById(id);
		if (!el) return;

		e.preventDefault();
		const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' });
	});
}
