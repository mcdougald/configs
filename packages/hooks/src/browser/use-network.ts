import { useEffect, useState } from 'react';

type ConnectionType =
	| 'bluetooth'
	| 'cellular'
	| 'ethernet'
	| 'mixed'
	| 'none'
	| 'other'
	| 'unknown'
	| 'wifi'
	| 'wimax';

// http://wicg.github.io/netinfo/#dom-megabit
type Megabit = number;
// http://wicg.github.io/netinfo/#dom-millisecond
type Millisecond = number;

// http://wicg.github.io/netinfo/#effectiveconnectiontype-enum
type EffectiveConnectionType = '2g' | '3g' | '4g' | 'slow-2g';

// http://wicg.github.io/netinfo/#networkinformation-interface
interface NetworkInformation extends EventTarget {
	// http://wicg.github.io/netinfo/#type-attribute
	readonly type?: ConnectionType;
	// http://wicg.github.io/netinfo/#effectivetype-attribute
	readonly effectiveType?: EffectiveConnectionType;
	// http://wicg.github.io/netinfo/#downlinkmax-attribute
	readonly downlinkMax?: Megabit;
	// http://wicg.github.io/netinfo/#downlink-attribute
	readonly downlink?: Megabit;
	// http://wicg.github.io/netinfo/#rtt-attribute
	readonly rtt?: Millisecond;
	// http://wicg.github.io/netinfo/#savedata-attribute
	readonly saveData?: boolean;
	// http://wicg.github.io/netinfo/#handling-changes-to-the-underlying-connection
	onchange?: EventListener;
}

interface NetworkState {
	since?: Date;
	online: boolean;
	rtt?: number;
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	type?: ConnectionType;
	saveData?: boolean;
	downlink?: number;
	downlinkMax?: number;
	effectiveType?: EffectiveConnectionType;
}

export const useNetwork = (): NetworkState => {
	const getNetworkConnection = (): NetworkInformation | undefined => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return navigator.connection ?? undefined;
	};

	const getNetworkConnectionInfo = (): Pick<
		NetworkInformation,
		'rtt' | 'type' | 'saveData' | 'downlink' | 'downlinkMax' | 'effectiveType'
	> => {
		const connection: NetworkInformation | undefined = getNetworkConnection();

		return {
			rtt: connection?.rtt,
			type: connection?.type,
			saveData: connection?.saveData,
			downlink: connection?.downlink,
			downlinkMax: connection?.downlinkMax,
			effectiveType: connection?.effectiveType,
		};
	};

	const [state, setState] = useState<NetworkState>(() => {
		return {
			since: undefined,
			online: navigator.onLine,
			...getNetworkConnectionInfo(),
		};
	});

	useEffect(() => {
		const handleOnline = (): void => {
			setState((previousState) => ({
				...previousState,
				online: true,
				since: new Date(),
			}));
		};

		const handleOffline = (): void => {
			setState((previousState) => ({
				...previousState,
				online: false,
				since: new Date(),
			}));
		};

		const handleConnectionChange = (): void => {
			setState((previousState) => ({
				...previousState,
				...getNetworkConnectionInfo(),
			}));
		};

		window.addEventListener('online', handleOnline);
		window.addEventListener('offline', handleOffline);

		const connection = getNetworkConnection();

		connection?.addEventListener('change', handleConnectionChange);

		return () => {
			window.removeEventListener('online', handleOnline);
			window.removeEventListener('offline', handleOffline);

			connection?.removeEventListener('change', handleConnectionChange);
		};
	}, []);

	return state;
};
