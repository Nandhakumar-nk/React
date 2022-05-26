import { AxiosResponse } from "axios";
import { call, put } from "redux-saga/effects";

import { ACTION_TYPES } from "../constants/actionTypes";
import { ITask } from "../components/StepTasks";
import { CategoriesService } from "../services/categories";

export function* fetchCategory(action: any) {
  console.log("fetchCategory generator function execution");
  console.log(action);

  try {
    const response: AxiosResponse = yield call(
      CategoriesService.get,
      action.payload.categoryId
    );

    console.log("response:");
    console.log(response);

    action.data.categoryTitle = response.data.title;
    action.data.selectedCategoryId = response.data._id;
    action.data.tasks = response.data.tasks.filter(
      (task: ITask) => task.isCompleted === false
    );
    action.data.completedTasks = response.data.tasks.filter(
      (task: ITask) => task.isCompleted === true
    );

    yield put({
      type: ACTION_TYPES.GET_RECENT_DATA,
      payload: action.payload,
      data: action.data,
    });
  } catch (error) {
    console.log("error ocurred inside fetchCategory generator function");
    yield put({ type: ACTION_TYPES.OPERATION_FAILED });
  }
}
