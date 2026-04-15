// SP 横スクロール: ブレークポイントは global.css の 767px と揃える
export function initProductsScroll() {
	const root = document.querySelector('[data-products-scroll-root]');
	const track = document.querySelector('[data-products-track]');
	if (!(root instanceof HTMLElement) || !(track instanceof HTMLElement)) return;

	const mq = window.matchMedia('(max-width: 767px)');

	const getPanels = () =>
		Array.from(document.querySelectorAll('[data-product-panel]'));

	const clearMobileStyles = () => {
		track.style.transform = '';
		track.style.removeProperty('width');
		for (const el of getPanels()) {
			el.classList.remove('is-near');
		}
	};

	const applyMobileLayout = () => {
		const n = getPanels().length;
		if (n < 1) return;
		track.style.width = `${n * 100}vw`;
	};

	const onScroll = () => {
		if (!mq.matches) return;
		const rect = root.getBoundingClientRect();
		const wh = window.innerHeight;
		const scrollable = Math.max(1, rect.height - wh);
		let progress = -rect.top / scrollable;
		progress = Math.max(0, Math.min(1, progress));

		const n = getPanels().length;
		const maxTranslate = Math.max(0, (n - 1) * 100);
		const translateX = progress * maxTranslate;

		track.style.transform = `translate3d(-${translateX}vw, 0, 0)`;

		for (let idx = 0; idx < n; idx++) {
			const panel = getPanels()[idx];
			if (!(panel instanceof HTMLElement)) continue;
			const dist = Math.abs(translateX - idx * 100);
			panel.classList.toggle('is-near', dist < 60);
		}
	};

	let raf = 0;
	const onScrollRaf = () => {
		cancelAnimationFrame(raf);
		raf = requestAnimationFrame(onScroll);
	};

	const bindMobile = () => {
		unbindMobile();
		applyMobileLayout();
		window.addEventListener('scroll', onScrollRaf, { passive: true });
		window.addEventListener('resize', onScrollRaf, { passive: true });
		onScroll();
	};

	const unbindMobile = () => {
		window.removeEventListener('scroll', onScrollRaf);
		window.removeEventListener('resize', onScrollRaf);
		cancelAnimationFrame(raf);
		raf = 0;
		clearMobileStyles();
	};

	const onMq = () => {
		if (mq.matches) {
			bindMobile();
		} else {
			unbindMobile();
		}
	};

	onMq();
	if (typeof mq.addEventListener === 'function') {
		mq.addEventListener('change', onMq);
	} else {
		mq.addListener(onMq);
	}

	window.addEventListener('load', onScrollRaf, { passive: true });
}
