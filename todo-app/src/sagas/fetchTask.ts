import { AxiosResponse } from "axios";
import { call, put, select } from "redux-saga/effects";

import { ACTION_TYPES } from "../constants/actionTypes";
import { TasksService } from "../services/tasks";

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
    yield put({ type: ACTION_TYPES.OPERATION_FAILED });
  }
}
