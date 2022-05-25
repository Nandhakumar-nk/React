import { ACTION_TYPES } from "../../constants/actionTypes";

export function inputBoxFocused(displayShedulingIcons:boolean) {
  console.log("inputBoxFocused action creator execution");
  
  return {
    type: ACTION_TYPES.INPUTBOX_FOCUSED,
    payload: {
        displayShedulingIcons
      },
  };
}
