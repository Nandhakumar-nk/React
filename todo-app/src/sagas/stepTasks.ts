import { call, put, select } from "redux-saga/effects";

import { ACTION_TYPES } from "../constants/actionTypes";
import {
  showErrorToaster,
  showLoadingToaster,
  showSuccessToaster,
} from "../helpers/toasters";
import { editStepTaskDetails, createStepTask } from "../services/stepTasks";

export function* addStepTask(action: any) {
  try {
    showLoadingToaster("Adding StepTask...");
    yield call(createStepTask, action.payload);

    showSuccessToaster(action, "StepTask added successfully!");
    yield put({
      type: ACTION_TYPES.CREATE_STEPTASK_SUCCESS,
      payload: action.payload,
      data: action.data,
    });
  } catch (error) {
    console.log(error);
    showErrorToaster("Oops! StepTask not added to the task!");
    yield put({ type: ACTION_TYPES.CREATE_STEPTASK_FAIL });
  }
}

export function* markAsCompletedStepTask(action: any) {
  const [successMessage, errorMessage, type]: string[] = action.payload.data
    .isCompleted
    ? [
        "Marked as completed steptask!",
        "Oops! Mark as completed steptask failed!",
        "success",
      ]
    : [
        "Removed from completed steptasks!",
        "Oops! Removing from completed stepTasks failed!",
        "info",
      ];
  try {
    yield call(
      editStepTaskDetails,
      action.payload.stepTaskId,
      action.payload.data
    );

    showSuccessToaster(action, successMessage, type);
    const taskId: string = yield select((state) => state.currentTask._id);

    action.payload.taskId = taskId;

    yield put({
      type: ACTION_TYPES.MARK_AS_COMPLETED_STEPTASK_SUCCESS,
      payload: action.payload,
      data: action.data,
    });
  } catch (error) {
    console.log(error);
    showErrorToaster(errorMessage);
    yield put({ type: ACTION_TYPES.MARK_AS_COMPLETED_STEPTASK_FAIL });
  }
}
