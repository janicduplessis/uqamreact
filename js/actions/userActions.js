import UserUtils from '../utils/UserUtils';

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
