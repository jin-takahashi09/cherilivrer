/**
 * 同一ページ内クリック時のみ # アンカーをスムーズスクロール。
 * 別ページからの /#shop 等は、レイアウト（画像・products の高さ）確定後に再スクロールする。
 * prefers-reduced-motion では auto。
 */

function getHashTarget(hash) {
	if (!hash || hash === '#') return null;
	const id = decodeURIComponent(hash.slice(1));
	if (!id) return null;
	return document.getElementById(id);
}

function scrollToHash(hash, { smooth = false } = {}) {
	const el = getHashTarget(hash);
	if (!el) return false;
	const useSmooth =
		smooth && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	el.scrollIntoView({ behavior: useSmooth ? 'smooth' : 'auto', block: 'start' });
	return true;
}

/** 画像・レイアウト確定後にハッシュ位置へ確実に合わせる（クロスページ / 直打ち用） */
function scheduleInitialHashScroll() {
	const hash = window.location.hash;
	if (!hash || !getHashTarget(hash)) return;

	// ブラウザの scroll restoration がハッシュスクロールを上書きしないようにする
	const prevRestoration = history.scrollRestoration;
	if ('scrollRestoration' in history) {
		history.scrollRestoration = 'manual';
	}

	const run = () => {
		scrollToHash(hash, { smooth: false });
	};

	run();
	requestAnimationFrame(run);

	const onLoad = () => {
		run();
		// products の min-h / 画像読み込みで位置が変わるため短時間リトライ
		window.setTimeout(run, 50);
		window.setTimeout(run, 200);
		window.setTimeout(run, 500);
	};

	if (document.readyState === 'complete') {
		onLoad();
	} else {
		window.addEventListener('load', onLoad, { once: true });
	}

	// このページ滞在中のみ manual。離脱時に戻す必要は薄いが、戻る操作のため復元を試みる
	window.addEventListener(
		'pagehide',
		() => {
			if ('scrollRestoration' in history && prevRestoration) {
				history.scrollRestoration = prevRestoration;
			}
		},
		{ once: true },
	);
}

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

		const el = getHashTarget(hash);
		if (!el) return;

		e.preventDefault();
		history.pushState(null, '', hash);
		scrollToHash(hash, { smooth: true });
	});

	scheduleInitialHashScroll();
}
