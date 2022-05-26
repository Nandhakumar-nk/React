import { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";

import { ACTION_TYPES } from "../constants/actionTypes";
import { ITask } from "../components/StepTasks";
import { CategoriesService } from "../services/categories";
import { TasksService } from "../services/tasks";

export function* addCategory(action: any) {
  try {
    const response: AxiosResponse = yield call(
      CategoriesService.post,
      action.payload
    );

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
    console.log("error ocurred inside addCategory generator function");
    console.log(error);
    yield put({ type: ACTION_TYPES.API_CALL_FAILED });
  }
}

export function* fetchCategory(action: any) {
  try {
    const response: AxiosResponse = yield call(
      CategoriesService.get,
      action.payload.categoryId
    );

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
    console.log(error);
    yield put({ type: ACTION_TYPES.API_CALL_FAILED });
  }
}

export function* getRecentData(action: any):any {
  try {
    yield takeEvery(ACTION_TYPES.GET_RECENT_DATA, getRecentData);
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
      type: ACTION_TYPES.API_CALL_SUCCESS,
      payload: action.payload,
      data: action.data,
    });
  } catch (error) {
    console.log("error ocurred inside getRecentData generator function");
    console.log(error);
    yield put({ type: ACTION_TYPES.API_CALL_FAILED });
  }
}
