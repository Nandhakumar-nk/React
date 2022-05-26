import { AxiosResponse } from "axios";
import { call, put, select } from "redux-saga/effects";

import { ACTION_TYPES } from "../constants/actionTypes";
import { TasksService } from "../services/tasks";

export function* addTask(action: any): any {
  try {
    yield call(TasksService.post, action.payload);
    yield put({
      type: ACTION_TYPES.FETCH_CATEGORY,
      payload: action.payload,
      data: action.data,
    });
  } catch (error) {
    console.log("error ocurred inside addTask generator function");
    console.log(error);
    yield put({ type: ACTION_TYPES.API_CALL_FAILED });
  }
}

export function* fetchTask(action: any) {
  try {
    const response: AxiosResponse = yield call(
      TasksService.get,
      action.payload.taskId
    );
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
    yield put({ type: ACTION_TYPES.API_CALL_FAILED });
  }
}

export function* patchTask(action: any) {
  try {
    const response: AxiosResponse = yield call(
      TasksService.patch,
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
    yield put({ type: ACTION_TYPES.API_CALL_FAILED });
  }
}
