import { ACTION_TYPES } from "../../constants/actionTypes";

export function stepTaskAdded(taskId:string,stepTask: String) {
  return {
    type: ACTION_TYPES.STEPTASK_ADDED,
    payload: {
      taskId,
      stepTask,
      isCompleted: false
    },
  };
}
