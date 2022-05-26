import { AxiosResponse } from "axios";
import { call, put } from "redux-saga/effects";

import { ACTION_TYPES } from "../constants/actionTypes";
import { CategoriesService } from "../services/categories";
import { TasksService } from "../services/tasks";

export function* getRecentData(action: any) {
  console.log("getRecentData generator function execution");
  try {
    const categoriesResponse: AxiosResponse = yield call(CategoriesService.get);
    const importantTasksResponse:AxiosResponse = yield call(
      TasksService.get,
      "?isImportant=true&isCompleted=false"
    );

    console.log("categoriesResponse");
    console.log(categoriesResponse);
    console.log("importantTasksResponse");
    console.log(importantTasksResponse);

    action.payload.categories = categoriesResponse.data;
    action.payload.importantTasks = importantTasksResponse.data;
    if (action.payload.categoryTitle === "Important") {
      action.payload.tasks = importantTasksResponse.data;
      action.payload.completedTasks = [];
    }
    yield put({
      type: ACTION_TYPES.OPERATION_SUCCESS,
      payload: action.payload,
    });
  } catch (error) {
    console.log("error ocurred inside getRecentData generator function");
    yield put({ type: ACTION_TYPES.OPERATION_FAILED, payload: action.payload });
  }
}
