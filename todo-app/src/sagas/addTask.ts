import { AxiosResponse } from "axios";
import { call, put, select } from "redux-saga/effects";

import { ACTION_TYPES } from "../constants/actionTypes";
import { CategoriesService } from "../services/categories";
import { TasksService } from "../services/tasks";

export function* addTask(action: any): any {
  console.log("addTask generator function execution");
  let payload = {};
  
  try {
    const response: AxiosResponse =  yield call(TasksService.post, action.payload);
    
    console.log("response:");
    console.log(response);


    yield put({
      type: ACTION_TYPES.FETCH_CATEGORY,
      payload: { categoryId: action.payload.categoryId },
    });
  } catch (error) {
    console.log("error ocurred inside addTask generator function");
    yield put({ type: ACTION_TYPES.OPERATION_FAILED, payload });
  }
}
