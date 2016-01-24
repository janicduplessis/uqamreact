import {GET_SCHEDULE_SUCCESS} from '../actions/scheduleActions';

export default function grades(state = [], action) {
  switch (action.type) {
    case GET_SCHEDULE_SUCCESS:
      return action.schedule;
    default:
      return state;
  }
}
