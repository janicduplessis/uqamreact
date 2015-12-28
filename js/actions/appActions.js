import AppUtils from '../utils/AppUtils';

export const LOAD_APP_DATA_SUCCESS = 'LOAD_APP_DATA_SUCCESS';

export function loadAppData() {
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

export function setCurrentRoute(route) {
  return {
    type: SET_CURRENT_ROUTE,
    route,
  };
}

export const SET_GRADES_SESSION = 'SET_GRADES_SESSION';

export function setGradesSession(session) {
  return {
    type: SET_GRADES_SESSION,
    session,
  };
}
