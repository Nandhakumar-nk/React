import { ACTION_TYPES } from "../../constants/actionTypes";

export function taskAdded(categoryId: string, task: String) {
  return {
    type: ACTION_TYPES.NEW_TASK_SUBMITTED,
    payload: {
      categoryId,
      task,
      isCompleted: false,
      isImportant: false,
    },
    data: {},
  };
}
