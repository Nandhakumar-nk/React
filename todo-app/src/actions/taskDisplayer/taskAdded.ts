import { ACTION_TYPES } from "../../constants/actionTypes";

export function taskAdded(categoryId: string, task: String) {
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
