import { ACTION_TYPES } from "../../constants/actionTypes";

export function toggleLeftContainer(
  displayLeftContainer: boolean
) {
  return {
    type: ACTION_TYPES.TOGGLE_LEFT_CONTAINER,
    payload: displayLeftContainer,
  };
}
