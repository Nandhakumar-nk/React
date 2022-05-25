import { AxiosResponse } from "axios";
import { call, put, select } from "redux-saga/effects";

import { ACTION_TYPES } from "../constants/actionTypes";
import { TasksService } from "../services/tasks";

export function* fetchTask(action: any):any {
  console.log("fetchTask generator function execution");
  let payload = {};

  try {
    const response: AxiosResponse = yield call(
      TasksService.get,
      action.payload.taskId
    );

    const categoryId = yield select(state => state.selectedCategoryId);

    payload = { categoryId, data: { currentTask: response.data } };
    yield put({ type: ACTION_TYPES.FETCH_CATEGORY, payload });
  } catch (error) {
    console.log("error ocurred inside fetchTask generator function");
    yield put({ type: ACTION_TYPES.OPERATION_FAILED, payload });
  }
}
