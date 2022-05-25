import { ACTION_TYPES } from "../../constants/actionTypes";

export function taskCompletedClicked(taskId:string, isCompleted: boolean) {
  console.log("taskCompletedClicked action creator execution");

  return {
    type: ACTION_TYPES.TASK_COMPLETED_CLICKED,
    payload: {
      taskId,
      data: {isCompleted}
    },
  };
}
