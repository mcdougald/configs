'use client';
import { useEffect, useState } from 'react';
export { useMediaQuery } from 'react-responsive';
function getDevice(): 'mobile' | 'tablet' | 'desktop' | null {
	if (typeof window === 'undefined') return null;

	return window.matchMedia('(max-width: 640px)').matches
		? 'mobile'
		: window.matchMedia('(min-width: 641px) and (max-width: 1024px)').matches
			? 'tablet'
			: 'desktop';
}

function getDimensions() {
	if (typeof window === 'undefined') return null;

	return { width: window.innerWidth, height: window.innerHeight };
}


/**
 * Place to use Media Query for Responsive design
 */
export function useDeviceMediaQuery() {
	const [device, setDevice] = useState<'mobile' | 'tablet' | 'desktop' | null>(
		getDevice(),
	);
	const [dimensions, setDimensions] = useState<{
		width: number;
		height: number;
	} | null>(getDimensions());

	useEffect(() => {
		const checkDevice = () => {
			setDevice(getDevice());
			setDimensions(getDimensions());
		};

		// Initial detection
		checkDevice();

		// Listener for windows resize
		window.addEventListener('resize', checkDevice);

		// Cleanup listener
		return () => {
			window.removeEventListener('resize', checkDevice);
		};
	}, []);

	return {
		device,
		width: dimensions?.width,
		height: dimensions?.height,
		isMobile: device === 'mobile',
		isTablet: device === 'tablet',
		isDesktop: device === 'desktop',
	};
}

export function useMediaQueryString(query: string) {
	const [value, setValue] = useState(false);

	useEffect(() => {
		function onChange(event: MediaQueryListEvent) {
			setValue(event.matches);
		}

		const result = matchMedia(query);
		result.addEventListener('change', onChange);
		setValue(result.matches);

		return () => result.removeEventListener('change', onChange);
	}, [query]);

	return value;
}
