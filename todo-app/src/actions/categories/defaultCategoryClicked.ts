import { ACTION_TYPES } from "../../constants/actionTypes";

export function defaultCategoryClicked(categoryTitle: String) {
  console.log("defaultCategoryClicked action creator execution");

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
