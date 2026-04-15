/**
 * Collection ページ: スクロールで .data-collection-fade を表示
 */
export function initCollectionPage() {
	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				entry.target.classList.add('translate-y-0', 'opacity-100');
				entry.target.classList.remove('translate-y-10', 'opacity-0');
				observer.unobserve(entry.target);
			}
		},
		{ root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
	);

	for (const el of document.querySelectorAll('[data-collection-fade]')) {
		observer.observe(el);
	}
}
