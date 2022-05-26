import { takeEvery } from "redux-saga/effects";
import { ACTION_TYPES } from "../constants/actionTypes";
import { addCategory } from "./addCategory";
import { addStepTask } from "./addStepTask";
import { fetchTask } from "./fetchTask";
import { getRecentData } from "./getRecentData";
import { fetchCategory } from "./fetchCategory";
import { patchTask } from "./patchTask";
import { patchStepTask } from "./patchStepTask";
import { addTask } from "./addTask";

export function* rootSaga() {
  console.log("rootSaga execution");

  yield takeEvery(ACTION_TYPES.CATEGORY_ADDED, addCategory);
  yield takeEvery(ACTION_TYPES.DYNAMIC_CATEGORY_CLICKED, fetchCategory);
  yield takeEvery(ACTION_TYPES.DEFAULT_CATEGORY_CLICKED, getRecentData);

  yield takeEvery(ACTION_TYPES.STEPTASK_ADDED, addStepTask);
  yield takeEvery(ACTION_TYPES.TASK_IMPORTANT_CLICKED, patchTask);
  yield takeEvery(ACTION_TYPES.TASK_COMPLETED_CLICKED, patchTask);
  yield takeEvery(ACTION_TYPES.STEPTASK_COMPLETED_CLICKED, patchStepTask);

  yield takeEvery(ACTION_TYPES.TASK_ADDED, addTask);

  yield takeEvery(ACTION_TYPES.TASK_CLICKED, fetchTask);

  yield takeEvery(ACTION_TYPES.GET_RECENT_DATA, getRecentData);
  yield takeEvery(ACTION_TYPES.FETCH_TASK, fetchTask);
  yield takeEvery(ACTION_TYPES.FETCH_CATEGORY, fetchCategory);
}
