import { ACTION_TYPES } from "../../constants/actionTypes";

export function stepTaskAdded(taskId: string, stepTask: String) {
  return {
    type: ACTION_TYPES.CREATE_STEPTASK_REQUEST,
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
    type: ACTION_TYPES.MARK_AS_COMPLETED_STEPTASK_REQUEST,
    payload: {
      stepTaskId,
      data: { isCompleted },
    },
    data: {},
  };
}

export function taskCompletedClicked(taskId: string, isCompleted: boolean) {
  return {
    type: ACTION_TYPES.MARK_AS_COMPLETED_TASK_REQUEST,
    payload: {
      taskId,
      data: { isCompleted },
    },
    data: {},
  };
}

export function taskImportantClicked(taskId: string, isImportant: boolean) {
  return {
    type: ACTION_TYPES.MARK_AS_IMPORTANT_TASK_REQUEST,
    payload: {
      taskId,
      data: { isImportant },
    },
    data: {},
  };
}
