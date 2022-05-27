import { ACTION_TYPES } from "../../constants/actionTypes";

export function taskClicked(taskId: String) {
  return {
    type: ACTION_TYPES.FETCH_TASK_REQUEST,
    payload: { taskId },
    data: {},
  };
}
