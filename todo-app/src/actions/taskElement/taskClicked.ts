import { ACTION_TYPES } from "../../constants/actionTypes";

export function taskClicked(taskId: String) {
  return {
    type: ACTION_TYPES.TASK_CLICKED,
    payload: taskId
  }
}
