import { ACTION_TYPES } from "../../constants/actionTypes";

export function categoryAdded(categoryName: String) {
  return {
    type: ACTION_TYPES.CATEGORY_ADDED,
    payload: {
      title: categoryName,
    },
    data: {},
  };
}

export function defaultCategoryClicked(categoryTitle: String) {
  return {
    type: ACTION_TYPES.DEFAULT_CATEGORY_CLICKED,
    payload: {},
    data: {
      categoryTitle,
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

export function dynamicCategoryClicked(categoryId: String) {
  return {
    type: ACTION_TYPES.DYNAMIC_CATEGORY_CLICKED,
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
