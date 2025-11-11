type GtagEventArgs = [event: 'event', action: string, params?: Record<string, unknown>];

declare global {
	interface Window {
		gtag?: (...args: ['config' | 'event' | 'set', ...unknown[]]) => void;
	}
}

export const gtagEvent = (...args: GtagEventArgs) => {
	if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
		return;
	}

	window.gtag(...args);
};
