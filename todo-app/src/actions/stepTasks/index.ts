import { ACTION_TYPES } from "../../constants/actionTypes";

export function stepTaskAdded(taskId: string, stepTask: String) {
  return {
    type: ACTION_TYPES.NEW_STEPTASK_SUBMITTED,
    payload: {
      taskId,
      stepTask,
      isCompleted: false,
    },
    data: {},
  };
}

export function stepTaskCompletedClicked(
  stepTaskId: string,
  isCompleted: boolean
) {
  return {
    type: ACTION_TYPES.STEPTASK_COMPLETED_ICON_CLICKED,
    payload: {
      stepTaskId,
      data: { isCompleted },
    },
    data: {},
  };
}

export function taskCompletedClicked(taskId: string, isCompleted: boolean) {
  return {
    type: ACTION_TYPES.TASK_COMPLETED_ICON_CLICKED,
    payload: {
      taskId,
      data: { isCompleted },
    },
    data: {},
  };
}

export function taskImportantClicked(taskId: string, isImportant: boolean) {
  return {
    type: ACTION_TYPES.TASK_IMPORTANT_ICON_CLICKED,
    payload: {
      taskId,
      data: { isImportant },
    },
    data: {},
  };
}
