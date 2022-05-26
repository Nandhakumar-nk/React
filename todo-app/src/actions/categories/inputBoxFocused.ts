import { ACTION_TYPES } from "../../constants/actionTypes";

export function inputBoxFocused(displayShedulingIcons: boolean) {
  return {
    type: ACTION_TYPES.INPUTBOX_FOCUSED,
    payload: {},
    data: { displayShedulingIcons },
  };
}
