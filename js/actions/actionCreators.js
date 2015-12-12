import UserUtils from '../utils/UserUtils';
import GradesUtils from '../utils/GradesUtils';
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

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_RESPONSE = 'LOGIN_RESPONSE';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export function login(code, nip) {
  return (dispatch) => {
    dispatch({
      type: LOGIN_REQUEST,
    });

    UserUtils.login(code, nip)
      .then((user) => {
        dispatch({
          type: LOGIN_RESPONSE,
          user,
        });
      }, (error) => {
        dispatch({
          type: LOGIN_ERROR,
          error,
        });
      });
  };
}

export const USER_LOADED = 'USER_LOADED';

export function loadUser() {
  return (dispatch) => {
    UserUtils.loadUser()
      .then((user) => {
        dispatch({
          type: USER_LOADED,
          user,
        });
      });
  };
}

export function logout() {
  return (dispatch) => {
    UserUtils.logout();
    dispatch({
      type: USER_LOADED,
      user: null,
    });
  };
}

export const GET_GRADES_REQUEST = 'GET_GRADES_REQUEST';
export const GET_GRADES_SUCCESS = 'GET_GRADES_SUCCESS';
export const GET_GRADES_ERROR = 'GET_GRADES_ERROR';

export function getGrades(session) {
  return (dispatch) => {
    dispatch({
      type: GET_GRADES_REQUEST,
    });
    GradesUtils.getGrades(session)
      .then((grades) => {
        dispatch({
          type: GET_GRADES_SUCCESS,
          grades,
        });
      }, (error) => {
        console.log(error);
        dispatch({
          type: GET_GRADES_ERROR,
          error,
        });
      });
  };
}
