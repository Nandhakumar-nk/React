import { takeEvery } from "redux-saga/effects";

import { ACTION_TYPES } from "../constants/actionTypes";
import { addCategory, fetchCategory, getUpdatedData } from "./categories";
import { addStepTask, editStepTask } from "./stepTasks";
import { addTask, editTask, fetchTask } from "./tasks";

export function* rootSaga() {
  yield takeEvery(ACTION_TYPES.NEW_CATEGORY_SUBMITTED, addCategory);
  yield takeEvery(ACTION_TYPES.DYNAMIC_CATEGORY_CLICKED, fetchCategory);
  yield takeEvery(ACTION_TYPES.DEFAULT_CATEGORY_CLICKED, getUpdatedData);

  yield takeEvery(ACTION_TYPES.NEW_STEPTASK_SUBMITTED, addStepTask);
  yield takeEvery(ACTION_TYPES.TASK_IMPORTANT_ICON_CLICKED, editTask);
  yield takeEvery(ACTION_TYPES.TASK_COMPLETED_ICON_CLICKED, editTask);
  yield takeEvery(ACTION_TYPES.STEPTASK_COMPLETED_ICON_CLICKED, editStepTask);

  yield takeEvery(ACTION_TYPES.NEW_TASK_SUBMITTED, addTask);

  yield takeEvery(ACTION_TYPES.TASK_CLICKED, fetchTask);

  yield takeEvery(ACTION_TYPES.GET_UPDATED_DATA, getUpdatedData);
  yield takeEvery(ACTION_TYPES.FETCH_TASK, fetchTask);
  yield takeEvery(ACTION_TYPES.FETCH_CATEGORY, fetchCategory);
}
