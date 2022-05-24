import { ACTION_TYPES } from "../../constants/actionTypes";

export function dynamicCategoryClicked(categoryId: String) {
  return {
    type: ACTION_TYPES.DYNAMIC_CATEGORY_CLICKED,
    payload: categoryId
  }
}
