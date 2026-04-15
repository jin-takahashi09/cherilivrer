// SP メニュー: ブレークポイントは global.css の 767px と揃える
export function initMobileMenu() {
	const toggle = document.querySelector('[data-menu-toggle]');
	const nav = document.querySelector('[data-mobile-nav]');
	if (!(toggle instanceof HTMLButtonElement) || !(nav instanceof HTMLElement)) return;

	const mq = window.matchMedia('(max-width: 767px)');

	const setOpen = (open) => {
		toggle.setAttribute('aria-expanded', String(open));
		toggle.classList.toggle('is-open', open);
		nav.classList.toggle('is-open', open);
		toggle.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
		document.body.style.overflow = open && mq.matches ? 'hidden' : '';
	};

	toggle.addEventListener('click', () => {
		setOpen(!nav.classList.contains('is-open'));
	});

	nav.querySelectorAll('a[href]').forEach((a) => {
		a.addEventListener('click', () => setOpen(false));
	});

	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape' && nav.classList.contains('is-open')) {
			setOpen(false);
		}
	});

	const onMq = () => {
		if (!mq.matches) setOpen(false);
	};
	if (typeof mq.addEventListener === 'function') {
		mq.addEventListener('change', onMq);
	} else {
		mq.addListener(onMq);
	}
}
