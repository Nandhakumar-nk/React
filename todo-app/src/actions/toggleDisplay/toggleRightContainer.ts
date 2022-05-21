import { ACTION_TYPES } from "../../constants/actionTypes";

export function toggleRightContainer(
  displayRightContainer: boolean
) {
  return {
    type: ACTION_TYPES.TOGGLE_RIGHT_CONTAINER,
    payload: displayRightContainer,
  };
}
