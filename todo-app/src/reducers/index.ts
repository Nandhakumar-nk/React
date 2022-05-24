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
        displayLeftContainer: action.payload.displayLeftContainer,
        rootClass:switchRootClass(action.payload.displayLeftContainer, state.displayRightContainer)
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
