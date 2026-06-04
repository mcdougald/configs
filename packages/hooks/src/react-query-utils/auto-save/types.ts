/**
 * The current save status of the query
 * - `loading` means the query is loading initial data
 * - `saving` means the query is saving local data to the server
 * - `saved` means the query and server are in sync
 * - `unsaved` means the local data has unsaved changed
 * - `error` means there was an error either saving or loading data
 */
type ReactQueryAutoSyncSaveStatus = 'error' | 'loading' | 'saved' | 'saving' | 'unsaved'

/**
 * Same as AutoSync but does not have a loading state.
 */
type ReactQueryAutoSaveSaveStatus = 'error' | 'saved' | 'saving' | 'unsaved'

type UseReactQueryAutoSyncDraftProvider<TQueryFnData> = {
  /**
   * The current value of the draft
   */
  draft: TQueryFnData | undefined
  /**
   * Function used to update the draft
   */
  setDraft: (data: TQueryFnData | undefined) => void
}

/**
 * Options used to control auto save function debounced with `lodash.debounce`
 */

interface AutoSaveOptions {
  /**
   * Maximum number of milliseconds to delay the debounce function. If undefined
   * there is no maximum delay.
   */
  maxWait?: number
  /**
   * Number of milliseconds to delay the debounce function
   */
  wait: number
}

export type {
  AutoSaveOptions,
  ReactQueryAutoSaveSaveStatus,
  ReactQueryAutoSyncSaveStatus,
  UseReactQueryAutoSyncDraftProvider
}
