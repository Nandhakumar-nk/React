import { takeEvery } from "redux-saga/effects";

import { ACTION_TYPES } from "../constants/actionTypes";
import { addCategory, fetchCategory, fetchCategories } from "./categories";
import { addStepTask, markAsCompletedStepTask } from "./stepTasks";
import {
  addTask,
  fetchTask,
  markAsCompletedTask,
  markAsImportantTask,
} from "./tasks";

export function* rootSaga() {
  yield takeEvery(ACTION_TYPES.CREATE_CATEGORY_REQUEST, addCategory);
  yield takeEvery(ACTION_TYPES.FETCH_CATEGORY_REQUEST, fetchCategory);
  yield takeEvery(ACTION_TYPES.FETCH_DEFAULT_CATEGORY_REQUEST, fetchCategory);

  yield takeEvery(ACTION_TYPES.CREATE_STEPTASK_REQUEST, addStepTask);
  yield takeEvery(
    ACTION_TYPES.MARK_AS_IMPORTANT_TASK_REQUEST,
    markAsImportantTask
  );
  yield takeEvery(
    ACTION_TYPES.MARK_AS_COMPLETED_TASK_REQUEST,
    markAsCompletedTask
  );
  yield takeEvery(
    ACTION_TYPES.MARK_AS_COMPLETED_STEPTASK_REQUEST,
    markAsCompletedStepTask
  );

  yield takeEvery(ACTION_TYPES.CREATE_TASK_REQUEST, addTask);

  yield takeEvery(ACTION_TYPES.FETCH_TASK_REQUEST, fetchTask);

  yield takeEvery(ACTION_TYPES.FETCH_CATEGORIES, fetchCategories);

  yield takeEvery(ACTION_TYPES.CREATE_CATEGORY_SUCCESS, fetchCategories);
  yield takeEvery(ACTION_TYPES.FETCH_CATEGORY_SUCCESS, fetchCategories);

  yield takeEvery(ACTION_TYPES.CREATE_TASK_SUCCESS, fetchCategory);
  yield takeEvery(ACTION_TYPES.FETCH_TASK_SUCCESS, fetchCategory);
  yield takeEvery(ACTION_TYPES.MARK_AS_IMPORTANT_TASK_SUCCESS, fetchCategory);
  yield takeEvery(ACTION_TYPES.MARK_AS_COMPLETED_TASK_SUCCESS, fetchCategory);

  yield takeEvery(ACTION_TYPES.CREATE_STEPTASK_SUCCESS, fetchTask);
  yield takeEvery(ACTION_TYPES.MARK_AS_COMPLETED_STEPTASK_SUCCESS, fetchTask);
}
