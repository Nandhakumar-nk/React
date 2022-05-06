import { ACTION_TYPES } from "../constants/actionTypes";
import { IFetchedDatum as IFetchedDatumReducer } from "../actions/fetchedDatum/changeFetchedDatum";

interface IActionType {
  type: string;
  payload: IFetchedDatumReducer;
}

export const initialFetchedDatumState: IFetchedDatumReducer = {
  categories: [],
  tasks: [],
  categoryTitle: "My Day",
  selectedCategoryId: "0",
  importantTasks: [],
  completedTasks: [],
  currentTask: {
    _id: "0",
    task: "",
    stepTasks: [],
    isCompleted: false,
    isImportant: false,
  },
};

export function fetchedDatumReducer(
  state: IFetchedDatumReducer = initialFetchedDatumState,
  action: IActionType
): IFetchedDatumReducer {
  switch (action.type) {
    case ACTION_TYPES.FETCHED_DATA:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
