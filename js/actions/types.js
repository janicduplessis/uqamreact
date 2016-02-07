/**
 * @flow
 */

export type ThunkAction<T> = (dispatch: (action: T) => void, getState?: () => any) => void;
