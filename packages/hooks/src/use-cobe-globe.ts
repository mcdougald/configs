import createGlobe from 'cobe';
import type { COBEOptions } from 'cobe';
import { type RefObject, useEffect } from 'react';

const GLOBE_CONFIG: Omit<COBEOptions, 'onRender'> = {
	devicePixelRatio: 1,
	width: 1200,
	height: 1200,
	phi: 0,
	theta: -0.3,
	dark: 1,
	diffuse: 1.2,
	mapSamples: 5000,
	mapBrightness: 13,
	mapBaseBrightness: 0.05,
	baseColor: [0.3, 0.3, 0.3],
	glowColor: [0.15, 0.15, 0.15],
	markerColor: [100, 100, 100],
	markers: [],
};

/**
 * EX:
 * export default function Earth() {
 *   const canvasRef = React.useRef<HTMLCanvasElement>(null);
 *   useGlobe(canvasRef);
 *
 *   return (
 *     <canvas
 *       className="absolute top-[7.1rem] z-20 aspect-square size-full max-w-fit md:top-[12rem]"
 *       ref={canvasRef}
 *       style={{ width: 1200, height: 1200 }}
 *     />
 *   );
 * }
 * @param {React.RefObject<HTMLCanvasElement>} canvasRef
 */
export const useGlobe = (canvasRef: RefObject<HTMLCanvasElement>) => {
	useEffect(() => {
		let phi = 4.7;

		const globe = createGlobe(canvasRef.current!, {
			...GLOBE_CONFIG,
			onRender: (state: { phi?: number }) => {
				state.phi = phi;
				phi += 0.0002;
			},
		});

		return () => globe.destroy();
	}, [canvasRef]);
};
