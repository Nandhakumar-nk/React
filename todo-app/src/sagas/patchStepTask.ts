import { AxiosResponse } from "axios";
import { call, put, select } from "redux-saga/effects";

import { ACTION_TYPES } from "../constants/actionTypes";
import { StepTasksService } from "../services/stepTasks";

export function* patchStepTask(action: any) {
  console.log("patchStepTask generator function execution");
  let payload = {};

  try {
    const response: AxiosResponse = yield call(
      StepTasksService.patch,
      action.payload.stepTaskId,
      action.payload.data
    );

    console.log("response:");
    console.log(response);

    const taskId: string = yield select((state) => state.currentTask._id);

    yield put({ type: ACTION_TYPES.FETCH_TASK, payload: { taskId } });
  } catch (error) {
    console.log("error ocurred inside patchStepTask generator function");
    yield put({ type: ACTION_TYPES.OPERATION_FAILED, payload });
  }
}
