import { AxiosResponse } from "axios";
import { call, put, select } from "redux-saga/effects";

import { ACTION_TYPES } from "../constants/actionTypes";
import { StepTasksService } from "../services/stepTasks";

export function* patchStepTask(action: any): any {
  let payload = {};
  try {
    const response: AxiosResponse = yield call(
      StepTasksService.patch,
      action.payload.stepTaskId,
      action.payload.data
    );

    const currentTask = yield select((state) =>
      state.currentTask,
    );

    yield put({ type: ACTION_TYPES.FETCH_TASK, payload:{taskId:currentTask._id} });
  } catch (error) {
    console.log("error ocurred inside patchStepTask generator function");
    yield put({ type: ACTION_TYPES.OPERATION_FAILED, payload });
  }
}
