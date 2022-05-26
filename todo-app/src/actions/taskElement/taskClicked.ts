import { ACTION_TYPES } from "../../constants/actionTypes";

export function taskClicked(taskId: String) {
  console.log("taskClicked action creator execution");
  
  return {
    type: ACTION_TYPES.TASK_CLICKED,
    payload: {taskId},
    data: {}
  }
}
