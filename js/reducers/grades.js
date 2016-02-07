/**
 * @flow
 */

import {GET_GRADES_REQUEST, GET_GRADES_SUCCESS} from '../actions/gradesActions';

import type {GetGradesAction} from '../actions/gradesActions';

type State = {
  loading: boolean,
  edges: [any],
};

export default function grades(
  state: State = {loading: true, edges: []},
  action: GetGradesAction,
): State {
  switch (action.type) {
    case GET_GRADES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_GRADES_SUCCESS:
      return {
        loading: false,
        edges: action.grades,
      };
    default:
      return state;
  }
}
