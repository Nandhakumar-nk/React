import { AxiosResponse } from "axios";
import { call, put, select } from "redux-saga/effects";

import { ACTION_TYPES } from "../constants/actionTypes";
import { TasksService } from "../services/tasks";

export function* fetchTask(action: any) {
  console.log("fetchTask generator function execution");
  let payload = {};

  try {
    const response: AxiosResponse = yield call(
      TasksService.get,
      action.payload.taskId
    );

    console.log("response:");
    console.log(response);

    const categoryId:string= yield select(state => state.selectedCategoryId);

    payload = { categoryId };
    let data = { currentTask: response.data, ...action.data };
    yield put({ type: ACTION_TYPES.FETCH_CATEGORY, payload, data });
  } catch (error) {
    console.log("error ocurred inside fetchTask generator function");
    yield put({ type: ACTION_TYPES.OPERATION_FAILED, payload });
  }
}
