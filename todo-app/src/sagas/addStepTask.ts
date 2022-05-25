import { call, put} from "redux-saga/effects";

import { ACTION_TYPES } from "../constants/actionTypes";
import { StepTasksService } from "../services/stepTasks";

export function* addStepTask(action: any) {
  console.log("addStepTask generator function execution");
  let payload = {};

  try {
    yield call(StepTasksService.post, action.payload);

    yield put({
      type: ACTION_TYPES.FETCH_TASK,
      payload: { taskId: action.payload.taskId },
    });
  } catch (error) {
    console.log("error ocurred inside addCategory generator function");
    yield put({ type: ACTION_TYPES.OPERATION_FAILED, payload });
  }
}
