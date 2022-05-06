import { ACTION_TYPES } from "../constants/actionTypes";
import { IToggleDisplay } from "../actions/toggleDisplay/toggleLeftContainer";

interface IActionType {
  type: string;
  payload: IToggleDisplay;
}

export interface IToggleDisplayState {
  displayRightContainer: boolean;
  displayLeftContainer: boolean;
  rootClass: string;
  displayShedulingIcons: boolean;
}

export const initialToggledisplayState: IToggleDisplayState = {
  displayRightContainer: false,
  displayLeftContainer: true,
  rootClass: "",
  displayShedulingIcons: false,
};

export function toggleDisplayReducer(
  state: IToggleDisplayState = initialToggledisplayState,
  action: IActionType
) {
  switch (action.type) {
    case ACTION_TYPES.TOGGLE_LEFT_CONTAINER:
      return {
        ...state,
        displayLeftContainer:action.payload.displayType,
        rootClass:action.payload.rootClass
      };
      case ACTION_TYPES.TOGGLE_RIGHT_CONTAINER:
      return {
        ...state,
        displayRightContainer: action.payload.displayType,
        rootClass:action.payload.rootClass
      };
      case ACTION_TYPES.TOGGLE_SHEDULING_ICONS:
      return {
        ...state,
        displayShedulingIcons:action.payload.displayType
      };
    default:
      return state;
  }
}
