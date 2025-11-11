'use client';

import type { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel, {
	EmblaViewportRefType,
} from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';

/**
 * const { viewportRef, nextBtnEnabled, scrollNext, prevBtnEnabled, scrollPrev, emblaApi } = useCustomEmblaCarousel(
 *    0,
 *    {
 *      dragFree: true,
 *      containScroll: 'trimSnaps'
 *    }
 *  );
 * @param {number} startIndex
 * @param {Partial<>} options
 * @returns {{viewportRef: any, scrollPrev: () => any, scrollNext: () => any, prevBtnEnabled: boolean, nextBtnEnabled: boolean, selectedIndex: number, scrollSnaps: number[], scrollTo: (index: number) => any, emblaApi: any}}
 */
type UseCustomEmblaCarouselOptions = Partial<EmblaOptionsType>;

type UseCustomEmblaCarouselReturn = {
	viewportRef: EmblaViewportRefType;
	scrollPrev: () => void;
	scrollNext: () => void;
	prevBtnEnabled: boolean;
	nextBtnEnabled: boolean;
	selectedIndex: number;
	scrollSnaps: number[];
	scrollTo: (index: number) => void;
	emblaApi: EmblaCarouselType | undefined;
};

export const useCustomEmblaCarousel = (
	startIndex = 0,
	options?: UseCustomEmblaCarouselOptions,
): UseCustomEmblaCarouselReturn => {
	const [viewportRef, emblaApi] = useEmblaCarousel({
		loop: false,
		startIndex,
		...options,
	});

	const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
	const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

	const scrollPrev = useCallback(
		() => emblaApi && emblaApi.scrollPrev(),
		[emblaApi],
	);
	const scrollNext = useCallback(
		() => emblaApi && emblaApi.scrollNext(),
		[emblaApi],
	);
	const scrollTo = useCallback(
		(index: number) => emblaApi && emblaApi.scrollTo(index),
		[emblaApi],
	);

	const onSelect = useCallback(() => {
		if (!emblaApi) return;
		setSelectedIndex(emblaApi.selectedScrollSnap());
		setPrevBtnEnabled(emblaApi.canScrollPrev());
		setNextBtnEnabled(emblaApi.canScrollNext());
	}, [emblaApi, setSelectedIndex]);

	useEffect(() => {
		if (!emblaApi) return;
		onSelect();
		setScrollSnaps(emblaApi.scrollSnapList());
		emblaApi.on('select', onSelect);
		emblaApi.on('reInit', onSelect);
	}, [emblaApi, setScrollSnaps, onSelect]);

	return {
		viewportRef,
		scrollPrev,
		scrollNext,
		prevBtnEnabled,
		nextBtnEnabled,
		selectedIndex,
		scrollSnaps,
		scrollTo,
		emblaApi,
	};
};
