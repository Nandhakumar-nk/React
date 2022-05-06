import { ACTION_TYPES } from "../../constants/actionTypes";

export interface IToggleDisplay {
  displayType: boolean;
  rootClass?: string;
}

export function toggleLeftContainer(
  changedDisplayProperties: IToggleDisplay
) {
  return {
    type: ACTION_TYPES.TOGGLE_LEFT_CONTAINER,
    payload: changedDisplayProperties,
  };
}
