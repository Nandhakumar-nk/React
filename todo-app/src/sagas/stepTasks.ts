import { call, put, select } from "redux-saga/effects";

import { ACTION_TYPES } from "../constants/actionTypes";
import { editStepTaskDetails, createStepTask } from "../services/stepTasks";

export function* addStepTask(action: any) {
  try {
    yield call(createStepTask, action.payload);
    yield put({
      type: ACTION_TYPES.CREATE_STEPTASK_SUCCESS,
      payload: action.payload,
      data: action.data,
    });
    yield put({
      type: ACTION_TYPES.FETCH_TASK,
      payload: action.payload,
      data: action.data,
    });
  } catch (error) {
    console.log("error ocurred inside addCategory generator function");
    console.log(error);
    yield put({ type: ACTION_TYPES.CREATE_STEPTASK_FAIL });
  }
}

export function* markAsCompletedStepTask(action: any) {
  try {
    yield call(
      editStepTaskDetails,
      action.payload.stepTaskId,
      action.payload.data
    );
    const taskId: string = yield select((state) => state.currentTask._id);

    action.payload.taskId = taskId;

    yield put({
      type: ACTION_TYPES.MARK_AS_COMPLETED_STEPTASK_SUCCESS,
      payload: action.payload,
      data: action.data,
    });
    yield put({
      type: ACTION_TYPES.FETCH_TASK,
      payload: action.payload,
      data: action.data,
    });
  } catch (error) {
    console.log(
      "error ocurred inside markAsCompletedStepTask generator function"
    );
    console.log(error);
    yield put({ type: ACTION_TYPES.MARK_AS_COMPLETED_STEPTASK_FAIL });
  }
}
