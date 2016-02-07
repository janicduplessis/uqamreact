/**
 * @flow
 */

import UserUtils from '../utils/UserUtils';

import type {ThunkAction} from './types';

export type LoginAction = {
  type: 'LOGIN_REQUEST',
} | {
  type: 'LOGIN_RESPONSE',
  user: any,
} | {
  type: 'LOGIN_ERROR',
  error: Error,
};

export type LoadUserAction = {
  type: 'USER_LOADED',
  user: any,
};

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_RESPONSE = 'LOGIN_RESPONSE';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export function login(code: string, nip: string): ThunkAction<LoginAction> {
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

export function loadUser(): ThunkAction<LoadUserAction> {
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

export function logout(): ThunkAction<LoadUserAction> {
  return (dispatch) => {
    UserUtils.logout();
    dispatch({
      type: USER_LOADED,
      user: null,
    });
  };
}
