/**
 * @flow
 */

import GradesUtils from '../utils/GradesUtils';

import {ThunkAction} from './types';

export type GetGradesAction = {
  type: 'GET_GRADES_REQUEST',
} | {
  type: 'GET_GRADES_SUCCESS',
  grades: any,
} | {
  type: 'GET_GRADES_ERROR',
  error: Error,
};

export const GET_GRADES_REQUEST = 'GET_GRADES_REQUEST';
export const GET_GRADES_SUCCESS = 'GET_GRADES_SUCCESS';
export const GET_GRADES_ERROR = 'GET_GRADES_ERROR';

export function getGrades(session: string): ThunkAction<GetGradesAction> {
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
        dispatch({
          type: GET_GRADES_ERROR,
          error,
        });
      });
  };
}
