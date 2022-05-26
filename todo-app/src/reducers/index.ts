import { ACTION_TYPES } from "../constants/actionTypes";
import { switchRootClass } from "../helpers/switchRootClass";
import { initialState, IState } from "../store";

export function rootReducer(state: IState = initialState, action: any): IState {
  console.log("\nrootReducer reducer execution:" + action.type);
  console.log("state object:");
  console.log(state);
  switch (action.type) {
    case ACTION_TYPES.OPERATION_SUCCESS:
      console.log("OPERATION_SUCCESS reducer execution");
      return {
        ...state,
        ...action.data,
      };
    case ACTION_TYPES.MENU_BUTTON_CLICKED:
      console.log("MENU_BUTTON_CLICKED reducer execution");
      return {
        ...state,
        displayLeftContainer: !state.displayLeftContainer,
        rootClass: switchRootClass(
          !state.displayLeftContainer,
          state.displayRightContainer
        ),
      };
    case ACTION_TYPES.HIDE_ICON_CLICKED:
      console.log("HIDE_ICON_CLICKED reducer execution");
      return {
        ...state,
        displayRightContainer: false,
        rootClass: switchRootClass(state.displayLeftContainer, false),
      };
    case ACTION_TYPES.INPUTBOX_FOCUSED:
      console.log("INPUTBOX_FOCUSED reducer execution");
      return {
        ...state,
        ...action.data,
      };
    case ACTION_TYPES.TASK_CLICKED:
      console.log("TASK_CLICKED reducer execution");
      action.data.displayRightContainer = true;
      action.data.rootClass = switchRootClass(state.displayLeftContainer, true);
      action.data.displayShedulingIcons = false;

      return state;
    case ACTION_TYPES.CATEGORY_ADDED:
    case ACTION_TYPES.DEFAULT_CATEGORY_CLICKED:
    case ACTION_TYPES.DYNAMIC_CATEGORY_CLICKED:
      console.log("CATEGORY_ADDED reducer execution");
      action.data.displayRightContainer = false;
      action.data.rootClass = switchRootClass(
        state.displayLeftContainer,
        false
      );
      return state;
    default:
      console.log("default reducer execution");
      return state;
  }
}
