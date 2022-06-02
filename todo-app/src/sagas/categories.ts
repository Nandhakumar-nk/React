import { AxiosResponse } from "axios";
import { call, put, select } from "redux-saga/effects";

import { ACTION_TYPES } from "../constants/actionTypes";
import { ITask } from "../components/StepTasks";
import {
  createCategory,
  getCategory,
  getCategories,
} from "../services/categories";
import { getImportantTasks } from "../services/tasks";
import {
  showErrorToaster,
  showLoadingToaster,
  showSuccessToaster,
} from "../helpers/toasters";

export function* addCategory(action: any) {
  console.log("\n\nadd category");
  try {
    showLoadingToaster("Adding Category...");
    const response: AxiosResponse = yield call(createCategory, action.payload);

    showSuccessToaster(action, "Category created successfully!");
    action.data.categoryTitle = response.data.title;
    action.data.selectedCategoryId = response.data._id;
    action.data.tasks = response.data.tasks.filter(
      (task: ITask) => task.isCompleted === false
    );
    action.data.completedTasks = response.data.tasks.filter(
      (task: ITask) => task.isCompleted === true
    );

    yield put({
      type: ACTION_TYPES.CREATE_CATEGORY_SUCCESS,
      payload: action.payload,
      data: action.data,
    });
  } catch (error) {
    console.log(error);
    showErrorToaster("Oops! Category creation failed!");
    yield put({ type: ACTION_TYPES.CREATE_CATEGORY_FAIL });
  }
}

export function* fetchCategory(action: any) {
  try {
    const importantTasksResponse: AxiosResponse = yield call(getImportantTasks);

    action.data.importantTasks = importantTasksResponse.data;
    action.data.completedTasks = [];
    if (
      ((action.payload.categoryId !== '0') && action.data.categoryTitle && (action.data.categoryTitle !== "Important"))
    ) {
      const response: AxiosResponse = yield call(
        getCategory,
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
    }

    yield put({
      type: ACTION_TYPES.FETCH_CATEGORY_SUCCESS,
      payload: action.payload,
      data: action.data,
    });
  } catch (error) {
    console.log(error);
    showErrorToaster("Oops! Tasks loading failed!");
    yield put({ type: ACTION_TYPES.FETCH_CATEGORY_FAIL });
  }
}

export function* fetchCategories(action: any): any {
  try {
    const categoriesResponse: AxiosResponse = yield call(getCategories);
  
    action.data.categories = categoriesResponse.data;
    yield put({
      type: ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
      payload: action.payload,
      data: action.data,
    });
  } catch (error) {
    console.log(error);
    showErrorToaster("Oops! Page refreshing failed!");
    yield put({ type: ACTION_TYPES.FETCH_CATEGORIES_FAIL });
  }
}
