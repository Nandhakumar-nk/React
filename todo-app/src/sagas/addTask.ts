import { AxiosResponse } from "axios";
import { call, put} from "redux-saga/effects";

import { ACTION_TYPES } from "../constants/actionTypes";
import { TasksService } from "../services/tasks";

export function* addTask(action: any): any {
  console.log("addTask generator function execution");

  try {
    const response: AxiosResponse = yield call(
      TasksService.post,
      action.payload
    );

    console.log("response:");
    console.log(response);

    yield put({
      type: ACTION_TYPES.FETCH_CATEGORY,
      payload: action.payload,
      data: action.data,
    });
  } catch (error) {
    console.log("error ocurred inside addTask generator function");
    yield put({ type: ACTION_TYPES.OPERATION_FAILED });
  }
}
