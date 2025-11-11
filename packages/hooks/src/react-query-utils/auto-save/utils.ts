// import { useQueryClient } from 'react-query';
//
// import { getAllAnswersByDocumentId } from '../../features/radar/api/radar-api';
// import { useReactQueryAutoSync } from './useReactQueryAutoSync';
//
// /**
//  * Empty function used to avoid the overhead of `lodash.debounce` if autoSaveOptions are not used.
//  */
// // eslint-disable-next-line @typescript-eslint/no-empty-function
// export const EmptyDebounceFunc = Object.assign(() => {}, {
//   // eslint-disable-next-line @typescript-eslint/no-empty-function
//   flush: () => {},
//   // eslint-disable-next-line @typescript-eslint/no-empty-function
//   cancel: () => {},
// });
//
// /**
//  * Function used to merge server data with local modification of server data
//  */
// export type MergeFunc<TQueryData> = (remote: TQueryData, local: TQueryData) => TQueryData;
//
// /**
//  * Options used to control auto save function debounced with `lodash.debounce`
//  */
// export interface AutoSaveOptions {
//   /**
//    * Number of milliseconds to delay the debounce function
//    */
//   wait: number;
//   /**
//    * Maximum number of milliseconds to delay the debounce function. If undefined
//    * there is no maximum delay.
//    */
//   maxWait?: number;
// }
// //
// // const useAutoSaveDocumentAnswers = (documentId: number) => {
// //   const queryClient = useQueryClient();
// //
// //   const { draft, setDraft, queryResult } = useReactQueryAutoSync({
// //     queryOptions: {
// //       queryKey: ['/documentAnswers', documentId],
// //       queryFn: (documentId) => getAllAnswersByDocumentId(documentId),
// //       // if you want to poll the server pass a refetchInterval to react query
// //       refetchInterval: 1000 * 20,
// //     },
// //     // pass standard mutation options for saving data to the server
// //     mutationOptions: {
// //       mutationFn: (syncDocument: AutoSyncDocumentAnswers) => syncDocumentAnswers(syncDocument),
// //       onSuccess: (response) => {
// //         console.log('useUpdateAnswerForAuditItemAndDocument onSuccess response', response);
// //         void queryClient.invalidateQueries(['/documentAnswers', documentId]);
// //       },
// //       onError: (error) => {
// //         console.log(`%c! useUpdateAnswerForAuditItemAndDocument - error!`, 'font-size: 15px; color: red;', error);
// //       },
// //     },
// //     // pass alertIfUnsavedChanges to notify user if they leave with unsaved changes
// //     alertIfUnsavedChanges: true,
// //     // pass autoSaveOptions to automatically save to the server with debouncing
// //     autoSaveOptions: { wait: 1000, maxWait: 3000 },
// //     merge: mergeDocumentRemoteState,
// //   });
// //
// //   return { draft, setDraft, queryResult };
// // };
export {};
