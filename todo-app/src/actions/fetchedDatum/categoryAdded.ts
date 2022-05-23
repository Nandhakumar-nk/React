import { ACTION_TYPES } from "../../constants/actionTypes";

export function categoryAdded(categoryName: String) {
  return {
    type: ACTION_TYPES.CATEGORY_ADDED,
    payload: {
        title: categoryName,
      },
  };
}
