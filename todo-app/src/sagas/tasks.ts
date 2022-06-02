import { AxiosResponse } from "axios";
import { call, put, select } from "redux-saga/effects";

import { ACTION_TYPES } from "../constants/actionTypes";
import { createTask, getTask, editTaskDetails } from "../services/tasks";
import {
  showErrorToaster,
  showLoadingToaster,
  showSuccessToaster,
} from "../helpers/toasters";

export function* addTask(action: any): any {
  try {
    showLoadingToaster("Adding Task...");
    yield call(createTask, action.payload);

    showSuccessToaster(action, "Task added successfully!");
    const categoryTitle: string = yield select((state) => state.categoryTitle);

    action.data.categoryTitle = categoryTitle;
    yield put({
      type: ACTION_TYPES.CREATE_TASK_SUCCESS,
      payload: action.payload,
      data: action.data,
    });
  } catch (error) {
    console.log(error);
    showErrorToaster("Oops! Task not added to the category!");
    yield put({ type: ACTION_TYPES.CREATE_TASK_FAIL });
  }
}

export function* fetchTask(action: any) {
  try {
    const response: AxiosResponse = yield call(getTask, action.payload.taskId);
    const [categoryId, categoryTitle]: string[] = yield select((state) => [
      state.selectedCategoryId,
      state.categoryTitle,
    ]);

    action.payload.categoryId = categoryId;
    action.data.currentTask = response.data;
    action.data.categoryTitle = categoryTitle;

    yield put({
      type: ACTION_TYPES.FETCH_TASK_SUCCESS,
      payload: action.payload,
      data: action.data,
    });
  } catch (error) {
    console.log(error);
    showErrorToaster("Oops! StepTasks loading failed!");
    yield put({ type: ACTION_TYPES.FETCH_TASK_FAIL });
  }
}

export function* markAsImportantTask(action: any) {
  const [successMessage, errorMessage, type]: string[] = action.payload.data
    .isImportant
    ? [
        "Marked as important task!",
        "Oops! Mark as important task failed!",
        "success",
      ]
    : [
        "Removed from important tasks!",
        "Oops! Removing from important Tasks Failed!",
        "info",
      ];

  try {
    const response: AxiosResponse = yield call(
      editTaskDetails,
      action.payload.taskId,
      action.payload.data
    );

    showSuccessToaster(action, successMessage, type);
    const [categoryId, currentTask, categoryTitle]: any[] = yield select(
      (state) => [
        state.selectedCategoryId,
        state.currentTask,
        state.categoryTitle,
      ]
    );

    action.payload.categoryId = categoryId;
    if (currentTask._id === response.data._id)
      action.data.currentTask = response.data;
    action.data.categoryTitle = categoryTitle;

    yield put({
      type: ACTION_TYPES.MARK_AS_IMPORTANT_TASK_SUCCESS,
      payload: action.payload,
      data: action.data,
    });
  } catch (error) {
    console.log(error);
    showErrorToaster(errorMessage);
    yield put({ type: ACTION_TYPES.MARK_AS_IMPORTANT_TASK_FAIL });
  }
}

export function* markAsCompletedTask(action: any) {
  const [successMessage, errorMessage, type]: string[] = action.payload.data
    .isCompleted
    ? [
        "Marked as completed task!",
        "Oops! Mark as completed task failed!",
        "success",
      ]
    : [
        "Removed from completed tasks!",
        "Oops! Removing from completed Tasks failed!",
        "info",
      ];

  try {
    const response: AxiosResponse = yield call(
      editTaskDetails,
      action.payload.taskId,
      action.payload.data
    );

    showSuccessToaster(action, successMessage, type);
    const [categoryId, currentTask, categoryTitle]: any[] = yield select(
      (state) => [
        state.selectedCategoryId,
        state.currentTask,
        state.categoryTitle,
      ]
    );

    action.payload.categoryId = categoryId;
    if (currentTask._id === response.data._id)
      action.data.currentTask = response.data;
    action.data.categoryTitle = categoryTitle;

    yield put({
      type: ACTION_TYPES.MARK_AS_COMPLETED_TASK_SUCCESS,
      payload: action.payload,
      data: action.data,
    });
  } catch (error) {
    console.log(error);
    showErrorToaster(errorMessage);
    yield put({ type: ACTION_TYPES.MARK_AS_COMPLETED_TASK_FAIL });
  }
}
