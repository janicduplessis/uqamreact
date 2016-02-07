/**
 * @flow
 */

import AppUtils from '../utils/AppUtils';

import type {ThunkAction} from './types';

export type LoadAppDataAction = {
  type: 'LOAD_APP_DATA_SUCCESS',
  data: any,
};

export type SetCurrentRouteAction = {
  type: 'SET_CURRENT_ROUTE',
  route: number,
};

export type SetGradesSessionAction = {
  type: 'SET_GRADES_SESSION',
  session: string,
};

export type SetScheduleSessionAction = {
  type: 'SET_SCHEDULE_SESSION',
  session: string,
};

export const LOAD_APP_DATA_SUCCESS = 'LOAD_APP_DATA_SUCCESS';

export function loadAppData(): ThunkAction<LoadAppDataAction> {
  return (dispatch) => {
    AppUtils.loadAppData().then(data => {
      dispatch({
        type: LOAD_APP_DATA_SUCCESS,
        data,
      });
    });
  };
}

export const SET_CURRENT_ROUTE = 'SET_CURRENT_ROUTE';

export function setCurrentRoute(route: number): SetCurrentRouteAction {
  return {
    type: SET_CURRENT_ROUTE,
    route,
  };
}

export const SET_GRADES_SESSION = 'SET_GRADES_SESSION';

export function setGradesSession(session: string): SetGradesSessionAction {
  return {
    type: SET_GRADES_SESSION,
    session,
  };
}

export const SET_SCHEDULE_SESSION = 'SET_SCHEDULE_SESSION';

export function setScheduleSession(session: string): SetScheduleSessionAction {
  return {
    type: SET_SCHEDULE_SESSION,
    session,
  };
}
