import { ACTION_TYPES } from "../constants/actionTypes";
import { IFetchedDatum } from "../actions/fetchedData/changeFetchedDatum";

interface IActionType {
    type:string,
    payload:IFetchedDatum
}

export const initialFetchedDataState:IFetchedDatum = {
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
      }
  }


export function fetchedDataReducer(state:IFetchedDatum = initialFetchedDataState, action:IActionType) {
    switch (action.type) {
        case ACTION_TYPES.FETCHED_DATA:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}