import { ACTION_TYPES } from "../constants/actionTypes";
import { switchRootClass } from "../helpers/switchRootClass";
import { initialState, IState } from "../store";

export function rootReducer(state: IState = initialState, action: any): IState {
  switch (action.type) {
    case ACTION_TYPES.API_CALL_SUCCESS:
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
    case ACTION_TYPES.HIDE_RIGHT_CONTAINER_ICON_CLICKED:
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
    case ACTION_TYPES.FETCH_TASK_REQUEST:
      action.data.displayRightContainer = true;
      action.data.rootClass = switchRootClass(state.displayLeftContainer, true);
      action.data.displayShedulingIcons = false;

      return state;
    case ACTION_TYPES.CREATE_CATEGORY_REQUEST:
    case ACTION_TYPES.FETCH_DEFAULT_CATEGORY_REQUEST:
    case ACTION_TYPES.FETCH_CATEGORY_REQUEST:
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
