import {LOGIN_RESPONSE, USER_LOADED} from '../actions/actionCreators';

export default function user(state = null, action) {
  switch (action.type) {
  case LOGIN_RESPONSE:
    return {
      logged: true,
      ...action.user,
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
