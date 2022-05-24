import { call, put, select } from "redux-saga/effects";

import { ACTION_TYPES } from "../constants/actionTypes";
import { TasksService } from "../services/tasks";

export function* addTask(action: any): any {
  let payload = {};
  try {
    yield call(TasksService.post, action.payload);

    yield put({
      type: ACTION_TYPES.GET_RECENT_DATA,
      payload: { categoryId: action.payload.categoryId },
    });
  } catch (error) {
    console.log("error ocurred inside addTask generator function");
    yield put({ type: ACTION_TYPES.OPERATION_FAILED, payload });
  }
}
