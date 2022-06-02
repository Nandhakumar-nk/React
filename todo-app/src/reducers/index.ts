import { ACTION_TYPES } from "../constants/actionTypes";
import { initialState, IState } from "../store";
import { switchRootClass } from "../helpers/switchRootClass";

export function rootReducer(state: IState = initialState, action: any): IState {
  switch (action.type) {
    case ACTION_TYPES.CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
        isCategoriesLoading: true,
        displayRightContainer: false,
        rootClass: switchRootClass(state.displayLeftContainer, false),
        ...action.data,
      };
    case ACTION_TYPES.CREATE_CATEGORY_FAIL:
      return state;
    case ACTION_TYPES.FETCH_DEFAULT_CATEGORY_REQUEST:
    case ACTION_TYPES.FETCH_CATEGORY_REQUEST:
      return {
        ...state,
        isTasksLoading: true,
        displayRightContainer: false,
        rootClass: switchRootClass(state.displayLeftContainer, false),
      };
    case ACTION_TYPES.FETCH_CATEGORY_SUCCESS:
      return {
        ...state,
        isTasksLoading: false,
        isCategoriesLoading: true,
        ...action.data,
      };
    case ACTION_TYPES.FETCH_CATEGORY_FAIL:
      return {
        ...state,
        isTasksLoading: false,
      };
    case ACTION_TYPES.FETCH_CATEGORIES:
      return {
        ...state,
        isCategoriesLoading: true,
      };
    case ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        isCategoriesLoading: false,
        ...action.data,
      };
    case ACTION_TYPES.FETCH_CATEGORIES_FAIL:
      return {
        ...state,
        isCategoriesLoading: false,
      };
    case ACTION_TYPES.CREATE_STEPTASK_SUCCESS:
      return {
        ...state,
        isStepTasksLoading: true,
      };
    case ACTION_TYPES.CREATE_STEPTASK_FAIL:
      return state;
    case ACTION_TYPES.FETCH_TASK_REQUEST:
      return {
        ...state,
        displayRightContainer: true,
        rootClass: switchRootClass(state.displayLeftContainer, true),
        displayShedulingIcons: false,
        isStepTasksLoading: true,
      };
    case ACTION_TYPES.FETCH_TASK_SUCCESS:
      return {
        ...state,
        isStepTasksLoading: false,
        isTasksLoading: true,
        ...action.data,
      };
    case ACTION_TYPES.FETCH_TASK_FAIL:
      return {
        ...state,
        isStepTasksLoading: false,
      };
    case ACTION_TYPES.MARK_AS_IMPORTANT_TASK_SUCCESS:
    case ACTION_TYPES.MARK_AS_COMPLETED_TASK_SUCCESS:
      return {
        ...state,
        isTasksLoading: true,
      };
    case ACTION_TYPES.MARK_AS_IMPORTANT_TASK_FAIL:
    case ACTION_TYPES.MARK_AS_COMPLETED_TASK_FAIL:
      return state;

    case ACTION_TYPES.MARK_AS_COMPLETED_STEPTASK_SUCCESS:
      return {
        ...state,
        isStepTasksLoading: true,
      };
    case ACTION_TYPES.MARK_AS_COMPLETED_STEPTASK_FAIL:
      return {
        ...state,
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
    default:
      return state;
  }
}
