/**
 * @flow
 */

import {
  LOAD_APP_DATA_SUCCESS,
  SET_CURRENT_ROUTE,
  SET_GRADES_SESSION,
  SET_SCHEDULE_SESSION,
} from '../actions/appActions';
import AppUtils from '../utils/AppUtils';
import {getCurrentSession} from '../utils/SessionUtils';

import type {
  LoadAppDataAction,
  SetCurrentRouteAction,
  SetGradesSessionAction,
} from '../actions/appActions';

type State = ?{
  route: number,
  gradesSession: string,
  scheduleSession: string,
};

type Action = LoadAppDataAction | SetCurrentRouteAction | SetGradesSessionAction;

export default function app(state: State = null, action: Action): State {
  switch (action.type) {
    case LOAD_APP_DATA_SUCCESS: {
      const data = action.data || {};
      data.route = data.route || 0;
      const curSession = getCurrentSession(new Date());
      data.gradesSession = data.gradesSession || curSession;
      data.scheduleSession = data.scheduleSession || curSession;
      return {
        ...state,
        ...data,
      };
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
      return data;
    }
    case SET_SCHEDULE_SESSION: {
      const data = {
        ...state,
        scheduleSession: action.session,
      };
      AppUtils.saveAppData(data);
      return data;
    }
    default:
      return state;
  }
}
