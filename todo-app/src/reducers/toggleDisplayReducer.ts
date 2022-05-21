import { ACTION_TYPES } from "../constants/actionTypes";
import { IAppProps } from "../App";

interface IActionType {
  type: string;
  payload: boolean;
}

export interface IToggleDisplayState extends IAppProps {
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
): IToggleDisplayState {
  switch (action.type) {
    case ACTION_TYPES.TOGGLE_LEFT_CONTAINER:
      return {
        ...state,
        displayLeftContainer:action.payload,
        rootClass: switchRootClass(action.payload, state.displayRightContainer),
      };
      case ACTION_TYPES.TOGGLE_RIGHT_CONTAINER:
      return {
        ...state,
        displayRightContainer: action.payload,
        rootClass: switchRootClass(state.displayLeftContainer,action.payload)
        //rootClass:action.payload.rootClass ? action.payload.rootClass : ""
      };
      case ACTION_TYPES.APPLY_DEFAULT_LAYOUT:
      return {
        ...state,
        displayRightContainer: action.payload,
        displayLeftContainer:action.payload,
        rootClass: ""
        //rootClass:action.payload.rootClass ? action.payload.rootClass : ""
      };
      case ACTION_TYPES.TOGGLE_SHEDULING_ICONS:
      return {
        ...state,
        displayShedulingIcons:action.payload
      };
    default:
      return state;
  }
}

function switchRootClass(displayLeftContainer:boolean, displayRightContainer:boolean):string {
  let rootClass = "";
  if (displayLeftContainer && displayRightContainer) {
    rootClass = "show-both-containers";
  } else if (displayLeftContainer && !displayRightContainer) {
    rootClass = "";
  } else if (!displayLeftContainer && displayRightContainer) {
    rootClass = "hide-left-container";
  } else if (!displayLeftContainer && !displayRightContainer) {
    rootClass = "hide-both-containers";
  }
  return rootClass;
}
