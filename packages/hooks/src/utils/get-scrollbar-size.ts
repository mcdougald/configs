// A change of the browser zoom change the scrollbar size.
// Credit https://github.com/twbs/bootstrap/blob/488fd8afc535ca3a6ad4dc581f5e89217b6a36ac/js/src/util/scrollbar.js#L14-L18
export const getScrollbarSize = (doc: Document): number => {
	// https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth#usage_notes
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const documentWidth = doc.documentElement.clientWidth;
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	return Math.abs(window.innerWidth - documentWidth);
};
