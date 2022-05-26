import { AxiosResponse } from "axios";
import { call, put} from "redux-saga/effects";

import { ACTION_TYPES } from "../constants/actionTypes";
import { StepTasksService } from "../services/stepTasks";

export function* addStepTask(action: any) {
  console.log("addStepTask generator function execution");

  try {
    const response: AxiosResponse = yield call(StepTasksService.post, action.payload);

    console.log("response:");
    console.log(response);

    yield put({
      type: ACTION_TYPES.FETCH_TASK,
      payload: action.payload,
      data:action.data
    });
  } catch (error) {
    console.log("error ocurred inside addCategory generator function");
    yield put({ type: ACTION_TYPES.OPERATION_FAILED });
  }
}
