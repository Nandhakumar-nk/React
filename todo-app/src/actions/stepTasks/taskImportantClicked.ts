import { ACTION_TYPES } from "../../constants/actionTypes";

export function taskImportantClicked(taskId: string, isImportant: boolean) {
  return {
    type: ACTION_TYPES.TASK_IMPORTANT_CLICKED,
    payload: {
      taskId,
      data: { isImportant },
    },
    data: {},
  };
}
