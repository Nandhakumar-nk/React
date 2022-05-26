import { AxiosResponse } from "axios";
import { call, put } from "redux-saga/effects";

import { ACTION_TYPES } from "../constants/actionTypes";
import { CategoriesService } from "../services/categories";
import { TasksService } from "../services/tasks";

export function* getRecentData(action: any) {
  try {
    const categoriesResponse: AxiosResponse = yield call(CategoriesService.get);
    const importantTasksResponse: AxiosResponse = yield call(
      TasksService.get,
      "?isImportant=true&isCompleted=false"
    );

    action.data.categories = categoriesResponse.data;
    action.data.importantTasks = importantTasksResponse.data;
    if (action.data.categoryTitle === "Important") {
      action.data.tasks = importantTasksResponse.data;
      action.data.completedTasks = [];
    }

    yield put({
      type: ACTION_TYPES.OPERATION_SUCCESS,
      payload: action.payload,
      data: action.data,
    });
  } catch (error) {
    console.log("error ocurred inside getRecentData generator function");
    console.log(error);
    yield put({ type: ACTION_TYPES.OPERATION_FAILED });
  }
}
