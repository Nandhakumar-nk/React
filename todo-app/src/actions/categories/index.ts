import { ACTION_TYPES } from "../../constants/actionTypes";

export function createCategoryRequest(categoryName: String) {
  return {
    type: ACTION_TYPES.CREATE_CATEGORY_REQUEST,
    payload: {
      title: categoryName,
    },
    data: {},
  };
}

export function fetchDefaultCategoryRequest(categoryId: String) {
  return {
    type: ACTION_TYPES.FETCH_DEFAULT_CATEGORY_REQUEST,
    payload: {
      categoryId: "0",
    },
    data: {
      categoryTitle: categoryId,
      tasks: [],
      completedTasks: [],
      currentTask: {
        _id: "0",
        task: "",
        stepTasks: [],
        isCompleted: false,
        isImportant: false,
      },
    },
  };
}

export function fetchCategoryRequest(categoryId: String) {
  return {
    type: ACTION_TYPES.FETCH_CATEGORY_REQUEST,
    payload: { categoryId },
    data: {},
  };
}

export function inputBoxFocused(displayShedulingIcons: boolean) {
  return {
    type: ACTION_TYPES.INPUTBOX_FOCUSED,
    payload: {},
    data: { displayShedulingIcons },
  };
}
