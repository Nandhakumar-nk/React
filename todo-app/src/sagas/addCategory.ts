import { AxiosResponse } from "axios";
import { call, put } from "redux-saga/effects";

import { ACTION_TYPES } from "../constants/actionTypes";
import { ITask } from "../components/StepTasks";
import { CategoriesService } from "../services/categories";

export function* addCategory(action: any) {
  let payload = {};
  try {
    const response: AxiosResponse = yield call(
      CategoriesService.post,
      action.payload
    );

    payload = {
      categoryTitle: response.data.title,
      selectedCategoryId: response.data.title,
      tasks: response.data.tasks.filter(
        (task: ITask) => task.isCompleted === false
      ),
      completedTasks: response.data.tasks.filter(
        (task: ITask) => task.isCompleted === true
      ),
    };
    yield put({ type: ACTION_TYPES.GET_RECENT_DATA, payload });
  } catch (error) {
    console.log("error ocurred inside addCatgeory generator function");
    yield put({ type: ACTION_TYPES.OPERATION_FAILED, payload });
  }
}
