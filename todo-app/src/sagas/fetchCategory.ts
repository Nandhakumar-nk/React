import { AxiosResponse } from "axios";
import { call, put, select } from "redux-saga/effects";

import { ACTION_TYPES } from "../constants/actionTypes";
import { ITask } from "../components/StepTasks";
import { CategoriesService } from "../services/categories";

export function* fetchCategory(action: any) {
  console.log("fetchCategory generator function execution");
  let payload:any;

  try {
    const response: AxiosResponse = yield call(
      CategoriesService.get,
      action.payload.categoryId
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

    if(action.payload.data) payload.currentTask = action.payload.data;
    yield put({ type: ACTION_TYPES.GET_RECENT_DATA, payload });
  } catch (error) {
    console.log("error ocurred inside fetchCategory generator function");
    payload={};
    yield put({ type: ACTION_TYPES.OPERATION_FAILED, payload });
  }
}
