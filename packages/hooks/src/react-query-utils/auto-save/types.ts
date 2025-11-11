/**
 * The current save status of the query
 * - `loading` means the query is loading initial data
 * - `saving` means the query is saving local data to the server
 * - `saved` means the query and server are in sync
 * - `unsaved` means the local data has unsaved changed
 * - `error` means there was an error either saving or loading data
 */
type ReactQueryAutoSyncSaveStatus =
	| 'loading'
	| 'saving'
	| 'saved'
	| 'unsaved'
	| 'error';

/**
 * Same as AutoSync but does not have a loading state.
 */
type ReactQueryAutoSaveSaveStatus = 'saving' | 'saved' | 'unsaved' | 'error';

type UseReactQueryAutoSyncDraftProvider<TQueryFnData> = {
	/**
	 * Function used to update the draft
	 */
	setDraft: (data: TQueryFnData | undefined) => void;
	/**
	 * The current value of the draft
	 */
	draft: TQueryFnData | undefined;
};

/**
 * Options used to control auto save function debounced with `lodash.debounce`
 */

interface AutoSaveOptions {
	/**
	 * Number of milliseconds to delay the debounce function
	 */
	wait: number;
	/**
	 * Maximum number of milliseconds to delay the debounce function. If undefined
	 * there is no maximum delay.
	 */
	maxWait?: number;
}

export type {
	AutoSaveOptions,
	ReactQueryAutoSyncSaveStatus,
	ReactQueryAutoSaveSaveStatus,
	UseReactQueryAutoSyncDraftProvider,
};
