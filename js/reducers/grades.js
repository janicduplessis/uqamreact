import {GET_GRADES_SUCCESS} from '../actions/gradesActions';

export default function grades(state = [], action) {
  switch (action.type) {
  case GET_GRADES_SUCCESS:
    return action.grades;
  default:
    return state;
  }
}
