import { call, put } from "redux-saga/effects";

import { ACTION_TYPES } from "../constants/actionTypes";
import { CategoriesService } from "../services/categories";
import { TasksService } from "../services/tasks";

export function* getRecentData(action: any): any {
  try {
    const [categoriesResponse, importantTasksResponse] = yield [
      call(CategoriesService.get),
      call(TasksService.get, "?isImportant=true&isCompleted=false"),
    ];

    action.payload.categories = categoriesResponse.data;
    action.payload.importantTasks = importantTasksResponse.data;
    if(action.payload.categoryTitle === "Important") {
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
