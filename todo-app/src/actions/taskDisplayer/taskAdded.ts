import { ACTION_TYPES } from "../../constants/actionTypes";

export function taskAdded(categoryId: string, task: String) {
  console.log("taskAdded action creator execution");
  
  return {
    type: ACTION_TYPES.TASK_ADDED,
    payload: {
      categoryId,
      task,
      isCompleted: false,
      isImportant: false,
    },
  };
}
