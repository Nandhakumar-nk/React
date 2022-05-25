import { ACTION_TYPES } from "../constants/actionTypes";
import { switchRootClass } from "../helpers/switchRootClass";
import { initialState, IState } from "../store";

export function rootReducer(state: IState = initialState, action: any): IState {
  switch (action.type) {
    case ACTION_TYPES.OPERATION_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
      case ACTION_TYPES.MENU_BUTTON_CLICKED:
      return {
        ...state,
        displayLeftContainer: !state.displayLeftContainer,
        rootClass:switchRootClass(!state.displayLeftContainer, state.displayRightContainer)
      };
      case ACTION_TYPES.HIDE_ICON_CLICKED:
      return {
        ...state,
        displayRightContainer: false,
        rootClass:switchRootClass(state.displayLeftContainer, false)
      };
      case ACTION_TYPES.INPUTBOX_FOCUSED:
        return {
          ...state,
          ...action.payload,
        };
    default:
      return state;
  }
}
