import { toast } from "react-toastify";
import { ACTION_TYPES } from "../constants/actionTypes";
import { switchRootClass } from "../helpers/switchRootClass";
import { initialState, IState } from "../store";

export function rootReducer(state: IState = initialState, action: any): IState {
  let toastId: any = "";

  switch (action.type) {
    case ACTION_TYPES.GET_CATEGORIES_AND_IMPORTANT_TASKS_SUCCESS:
      if (action.payload.loadingId) {
        //toast.update(action.payload.loadingId, { render: "Sorry!Failed to fetch tasks!", type: "error", isLoading: false, autoClose:3000, theme:"colored" });
      }

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
      //toastId = toast.loading("Fetching tasks...", {type: "info",theme:"colored"});
      action.payload.loadingId = toastId;
      action.data.displayRightContainer = true;
      action.data.rootClass = switchRootClass(state.displayLeftContainer, true);
      action.data.displayShedulingIcons = false;

      return state;
    case ACTION_TYPES.CREATE_CATEGORY_REQUEST:
      toastId = toast.loading("Adding Category...", {position: toast.POSITION.TOP_RIGHT,});
      action.payload.toastIds.push(toastId)
    case ACTION_TYPES.FETCH_DEFAULT_CATEGORY_REQUEST:
    case ACTION_TYPES.FETCH_CATEGORY_REQUEST:
      action.data.displayRightContainer = false;
      action.data.rootClass = switchRootClass(
        state.displayLeftContainer,
        false
      );
      return state;
    case ACTION_TYPES.CREATE_CATEGORY_SUCCESS:
      setTimeout(() => {
        toast.dismiss();
        toast.success("Created category successfully!", {
        type: "success",
        autoClose: 3000,
        theme: "colored",
      });
      }, 4000)
      

      return {
        ...state,
        ...action.data,
      };
    case ACTION_TYPES.FETCH_CATEGORY:
      action.data.categoryTitle = state.categoryTitle;
      return state;
    default:
      return state;
  }
}
