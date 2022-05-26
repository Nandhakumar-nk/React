import { AxiosResponse } from "axios";
import { call, put } from "redux-saga/effects";

import { ACTION_TYPES } from "../constants/actionTypes";
import { ITask } from "../components/StepTasks";
import { CategoriesService } from "../services/categories";

export function* addCategory(action: any) {
  console.log("addCategory generator function execution");
  let payload = {};

  try {
    const response: AxiosResponse = yield call(
      CategoriesService.post,
      action.payload
    );
    
    console.log("response:");
    console.log(response);

    payload = {
      categoryTitle: response.data.title,
      selectedCategoryId: response.data._id,
      tasks: response.data.tasks.filter(
        (task: ITask) => task.isCompleted === false
      ),
      completedTasks: response.data.tasks.filter(
        (task: ITask) => task.isCompleted === true
      ),
    };
    yield put({ type: ACTION_TYPES.GET_RECENT_DATA, payload });
  } catch (error) {
    console.log("error ocurred inside addCategory generator function");
    yield put({ type: ACTION_TYPES.OPERATION_FAILED, payload });
  }
}
