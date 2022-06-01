import { ACTION_TYPES } from "../../constants/actionTypes";

export function createStepTaskRequest(taskId: string, stepTask: String) {
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

export function markAsCompletedStepTaskRequest(
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

export function editTaskDetailsRequest(payload: any) {
  return {
    type: ACTION_TYPES.EDIT_TASK_DETAILS_REQUEST,
    payload,
    data: {},
  };
}

export function markAsCompletedTaskRequest(
  taskId: string,
  isCompleted: boolean
) {
  return {
    type: ACTION_TYPES.MARK_AS_COMPLETED_TASK_REQUEST,
    payload: {
      taskId,
      data: { isCompleted },
    },
    data: {},
  };
}

export function markAsImportantTaskRequest(
  taskId: string,
  isImportant: boolean
) {
  return {
    type: ACTION_TYPES.MARK_AS_IMPORTANT_TASK_REQUEST,
    payload: {
      taskId,
      data: { isImportant },
    },
    data: {},
  };
}
