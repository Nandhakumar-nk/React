import { takeEvery } from "redux-saga/effects";

import { ACTION_TYPES } from "../constants/actionTypes";
import { addCategory, fetchCategory, getUpdatedData } from "./categories";
import { addStepTask, editStepTask } from "./stepTasks";
import { addTask, editTask, fetchTask } from "./tasks";

export function* rootSaga() {
  yield takeEvery(ACTION_TYPES.CREATE_CATEGORY_REQUEST, addCategory);
  yield takeEvery(ACTION_TYPES.FETCH_CATEGORY_REQUEST, fetchCategory);
  yield takeEvery(ACTION_TYPES.FETCH_DEFAULT_CATEGORY_REQUEST, getUpdatedData);

  yield takeEvery(ACTION_TYPES.CREATE_STEPTASK_REQUEST, addStepTask);
  yield takeEvery(ACTION_TYPES.MARK_AS_IMPORTANT_TASK_REQUEST, editTask);
  yield takeEvery(ACTION_TYPES.MARK_AS_COMPLETED_TASK_REQUEST, editTask);
  yield takeEvery(ACTION_TYPES.MARK_AS_COMPLETED_STEPTASK_REQUEST, editStepTask);

  yield takeEvery(ACTION_TYPES.CREATE_TASK_REQUEST, addTask);

  yield takeEvery(ACTION_TYPES.FETCH_TASK_REQUEST, fetchTask);

  yield takeEvery(ACTION_TYPES.GET_UPDATED_DATA, getUpdatedData);
  yield takeEvery(ACTION_TYPES.FETCH_TASK, fetchTask);
  yield takeEvery(ACTION_TYPES.FETCH_CATEGORY, fetchCategory);
}
