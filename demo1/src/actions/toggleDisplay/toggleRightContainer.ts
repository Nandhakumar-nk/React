import { IToggleDisplay } from "./toggleLeftContainer";
import { ACTION_TYPES } from "../../constants/actionTypes";

export function toggleRightContainer(
  changedDisplayProperties: IToggleDisplay
) {
  return {
    type: ACTION_TYPES.TOGGLE_RIGHT_CONTAINER,
    payload: changedDisplayProperties,
  };
}
