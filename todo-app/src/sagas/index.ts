import { takeEvery } from "redux-saga/effects";
import { ACTION_TYPES } from "../constants/actionTypes";
import { addCategory } from "./addCategory";
import { addStepTask } from "./addStepTask";
import { fetchTask } from "./fetchTask";
import { getRecentData } from "./getRecentData";
import { fetchCategory } from "./fetchCategory";
import { toggleLeftContainer } from "./toggleLeftContainer";
import { patchTask } from "./patchTask";
import { patchStepTask } from "./patchStepTask";
import { addTask } from "./addTask";

export function* rootSaga() {
  yield [
    takeEvery(ACTION_TYPES.CATEGORY_ADDED, addCategory),
    takeEvery(ACTION_TYPES.GET_RECENT_DATA, getRecentData),
    takeEvery(ACTION_TYPES.DYNAMIC_CATEGORY_CLICKED, fetchCategory),
    takeEvery(ACTION_TYPES.DEFAULT_CATEGORY_CLICKED, getRecentData),
    takeEvery(ACTION_TYPES.MENU_BUTTON_CLICKED, toggleLeftContainer),

    takeEvery(ACTION_TYPES.STEPTASK_ADDED, addStepTask),
    takeEvery(ACTION_TYPES.TASK_IMPORTANT_CLICKED, patchTask),
    takeEvery(ACTION_TYPES.TASK_COMPLETED_CLICKED, patchTask),
    takeEvery(ACTION_TYPES.STEPTASK_COMPLETED_CLICKED, patchStepTask),

    takeEvery(ACTION_TYPES.TASK_ADDED, addTask),
    takeEvery(ACTION_TYPES.TASK_CLICKED, fetchTask),

    takeEvery(ACTION_TYPES.FETCH_TASK, fetchTask),
  ];
}
