import { AxiosResponse } from "axios";
import { call, put, select } from "redux-saga/effects";

import { ACTION_TYPES } from "../constants/actionTypes";
import { TasksService } from "../services/tasks";

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
    yield put({ type: ACTION_TYPES.OPERATION_FAILED });
  }
}
