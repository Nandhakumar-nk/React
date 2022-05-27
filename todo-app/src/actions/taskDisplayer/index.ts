import { ACTION_TYPES } from "../../constants/actionTypes";

export function createTaskRequest(categoryId: string, task: String) {
  return {
    type: ACTION_TYPES.CREATE_TASK_REQUEST,
    payload: {
      categoryId,
      task,
      isCompleted: false,
      isImportant: false,
    },
    data: {},
  };
}
