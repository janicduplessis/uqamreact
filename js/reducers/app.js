import {
  LOAD_APP_DATA_SUCCESS,
  SET_CURRENT_ROUTE,
  SET_GRADES_SESSION,
} from '../actions/actionCreators';
import AppUtils from '../utils/AppUtils';

export default function app(state = null, action) {
  switch (action.type) {
  case LOAD_APP_DATA_SUCCESS: {
    const data = action.data || {};
    data.route = data.route || 0;
    data.gradesSession = data.gradesSession || '20153';
    return data;
  }
  case SET_CURRENT_ROUTE: {
    const data = {
      ...state,
      route: action.route,
    };
    AppUtils.saveAppData(data);
    return data;
  }
  case SET_GRADES_SESSION: {
    const data = {
      ...state,
      gradesSession: action.session,
    };
    AppUtils.saveAppData(data);
  }
  default:
    return state;
  }
}