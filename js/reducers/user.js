/**
 * @flow
 */

import {
  LOGIN_RESPONSE,
  LOGIN_ERROR,
  USER_LOADED,
} from '../actions/userActions';

import type {LoginAction} from '../actions/userActions';

type State = {
  logged: boolean,
};

export default function user(
  state: ?State = null,
  action: LoginAction,
): ?State {
  switch (action.type) {
    case LOGIN_RESPONSE:
      return {
        logged: true,
        ...action.user,
      };
    case LOGIN_ERROR:
      return {
        logged: false,
        error: action.error,
      };
    case USER_LOADED:
      return {
        logged: !!action.user,
        ...action.user,
      };
    default:
      return state;
  }
}
