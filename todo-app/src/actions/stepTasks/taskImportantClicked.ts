import { ACTION_TYPES } from "../../constants/actionTypes";

export function taskImportantClicked(taskId:string, isImportant: boolean) {
  console.log("taskImportantClicked action creator execution");

  return {
    type: ACTION_TYPES.TASK_IMPORTANT_CLICKED,
    payload: {
      taskId,
      data:{isImportant}
    },
  };
}
