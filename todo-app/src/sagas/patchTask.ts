import { AxiosResponse } from "axios";
import { call, put, select } from "redux-saga/effects";

import { ACTION_TYPES } from "../constants/actionTypes";
import { TasksService } from "../services/tasks";

export function* patchTask(action: any): any {
  console.log("patchTask generator function execution");
  let payload = {};

  try {
    const response: AxiosResponse = yield call(
      TasksService.patch,
      action.payload.taskId,
      action.payload.data
    );

    const [categoryId, currentTask] = yield select((state) => [
      state.selectedCategoryId,
      state.currentTask,
    ]);

    if (currentTask._id === response.data._id)
      payload = { categoryId, data: { currentTask: response.data } };
    else payload = { categoryId };
    yield put({ type: ACTION_TYPES.FETCH_CATEGORY, payload });
  } catch (error) {
    console.log("error ocurred inside patchTask generator function");
    yield put({ type: ACTION_TYPES.OPERATION_FAILED, payload });
  }
}
