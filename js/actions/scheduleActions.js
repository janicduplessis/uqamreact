/**
 * @flow
 */

import {getSchedule as getScheduleUtil} from '../utils/ScheduleUtils';

import type {ThunkAction} from './types';

export type GetScheduleAction = {
  type: 'GET_SCHEDULE_REQUEST',
} | {
  type: 'GET_SCHEDULE_SUCCESS',
  schedule: any,
} | {
  type: 'GET_SCHEDULE_ERROR',
  error: Error,
}

export const GET_SCHEDULE_REQUEST = 'GET_SCHEDULE_REQUEST';
export const GET_SCHEDULE_SUCCESS = 'GET_SCHEDULE_SUCCESS';
export const GET_SCHEDULE_ERROR = 'GET_SCHEDULE_ERROR';

export function getSchedule(): ThunkAction<GetScheduleAction> {
  return (dispatch) => {
    dispatch({
      type: GET_SCHEDULE_REQUEST,
    });
    getScheduleUtil()
      .then((schedule) => {
        dispatch({
          type: GET_SCHEDULE_SUCCESS,
          schedule,
        });
      }, (error) => {
        dispatch({
          type: GET_SCHEDULE_ERROR,
          error,
        });
      });
  };
}
