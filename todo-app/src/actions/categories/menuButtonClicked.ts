import { ACTION_TYPES } from "../../constants/actionTypes";

export function menuButtonClicked(displayRightContainer: boolean) {
  return {
    type: ACTION_TYPES.MENU_BUTTON_CLICKED,
    payload: {
        displayRightContainer
    }
  }
}
