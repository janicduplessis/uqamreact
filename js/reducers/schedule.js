/**
 * @flow
 */

import {GET_SCHEDULE_REQUEST, GET_SCHEDULE_SUCCESS} from '../actions/scheduleActions';

import type {GetScheduleAction} from '../actions/scheduleActions';

type State = {
  loading: boolean,
  edges: [any],
};

export default function schedule(
  state: State = {loading: true, edges: []},
  action: GetScheduleAction,
): State {
  switch (action.type) {
    case GET_SCHEDULE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_SCHEDULE_SUCCESS:
      return {
        edges: action.schedule,
        loading: false,
      };
    default:
      return state;
  }
}
