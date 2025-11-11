import { useRef } from 'react';

function print(value: any) {
	if (typeof value === 'object') {
		return JSON.stringify(value);
	} else {
		// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
		return `${value}`;
	}
}

export function useLogIfChanged<T>(name: string, value: T) {
	const previous = useRef(value);
	if (!Object.is(previous.current, value)) {
		console.log(
			`${name} changed. Old: ${print(previous.current)}, New: ${print(value)} `,
		);
		previous.current = value;
	} else {
		// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
		console.log(`${name} unchanged: ${previous.current === value}`);
	}
}
