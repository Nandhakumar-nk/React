import { AxiosResponse } from "axios";
import { call, put, select } from "redux-saga/effects";

import { ACTION_TYPES } from "../constants/actionTypes";
import { createTask, getTask, editTaskDetails } from "../services/tasks";

export function* addTask(action: any): any {
  try {
    yield call(createTask, action.payload);
    yield put({
      type: ACTION_TYPES.FETCH_CATEGORY,
      payload: action.payload,
      data: action.data,
    });
  } catch (error) {
    console.log("error ocurred inside addTask generator function");
    console.log(error);
    yield put({ type: ACTION_TYPES.CREATE_TASK_FAIL });
  }
}

export function* fetchTask(action: any) {
  try {
    const response: AxiosResponse = yield call(getTask, action.payload.taskId);
    const categoryId: string = yield select(
      (state) => state.selectedCategoryId
    );

    action.payload.categoryId = categoryId;
    action.data.currentTask = response.data;

    yield put({
      type: ACTION_TYPES.FETCH_CATEGORY,
      payload: action.payload,
      data: action.data,
    });
  } catch (error) {
    console.log("error ocurred inside fetchTask generator function");
    console.log(error);
    yield put({ type: ACTION_TYPES.FETCH_TASK_FAIL });
  }
}

export function* editTask(action: any) {
  try {
    const response: AxiosResponse = yield call(
      editTaskDetails,
      action.payload.taskId,
      action.payload.data
    );
    const [categoryId, currentTask]: any[] = yield select((state) => [
      state.selectedCategoryId,
      state.currentTask,
    ]);

    action.payload.categoryId = categoryId;
    if (currentTask._id === response.data._id)
      action.data.currentTask = response.data;

    yield put({
      type: ACTION_TYPES.FETCH_CATEGORY,
      payload: action.payload,
      data: action.data,
    });
  } catch (error) {
    console.log("error ocurred inside patchTask generator function");
    console.log(error);
    //yield put({ type: ACTION_TYPES.GET_CATEGORIES_AND_IMPORTANT_TASKS_FAIL });
  }
}
