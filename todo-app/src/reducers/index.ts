import { ACTION_TYPES } from "../constants/actionTypes";
import { switchRootClass } from "../helpers/switchRootClass";
import { initialState, IState } from "../store";

export function rootReducer(state: IState = initialState, action: any): IState {
  switch (action.type) {
    case ACTION_TYPES.OPERATION_SUCCESS:
      return {
        ...state,
        ...action.data,
      };
    case ACTION_TYPES.MENU_BUTTON_CLICKED:
      return {
        ...state,
        displayLeftContainer: !state.displayLeftContainer,
        rootClass: switchRootClass(
          !state.displayLeftContainer,
          state.displayRightContainer
        ),
      };
    case ACTION_TYPES.HIDE_ICON_CLICKED:
      return {
        ...state,
        displayRightContainer: false,
        rootClass: switchRootClass(state.displayLeftContainer, false),
      };
    case ACTION_TYPES.INPUTBOX_FOCUSED:
      return {
        ...state,
        ...action.data,
      };
    case ACTION_TYPES.TASK_CLICKED:
      action.data.displayRightContainer = true;
      action.data.rootClass = switchRootClass(state.displayLeftContainer, true);
      action.data.displayShedulingIcons = false;

      return state;
    case ACTION_TYPES.CATEGORY_ADDED:
    case ACTION_TYPES.DEFAULT_CATEGORY_CLICKED:
    case ACTION_TYPES.DYNAMIC_CATEGORY_CLICKED:
      action.data.displayRightContainer = false;
      action.data.rootClass = switchRootClass(
        state.displayLeftContainer,
        false
      );
      return state;
    default:
      return state;
  }
}
