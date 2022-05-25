import { ACTION_TYPES } from "../../constants/actionTypes";

export function categoryAdded(categoryName: String) {
  console.log("categoryAdded action creator execution");
  
  return {
    type: ACTION_TYPES.CATEGORY_ADDED,
    payload: {
        title: categoryName,
      },
  };
}
