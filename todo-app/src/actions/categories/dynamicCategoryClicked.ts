import { ACTION_TYPES } from "../../constants/actionTypes";

export function dynamicCategoryClicked(categoryId: String) {
  console.log("dynamicCategoryClicked action creator execution");

  return {
    type: ACTION_TYPES.DYNAMIC_CATEGORY_CLICKED,
    payload: {categoryId},
    data:{}
  }
}
