import { createStore } from "redux";

import rootReducer from "../reducers";
import { IFetchedDatum as IFetchedDatumState } from "../actions/fetchedDatum/changeFetchedDatum";
import { initialToggledisplayState, IToggleDisplayState } from "../reducers/toggleDisplayReducer";
import { initialFetchedDatumState } from "../reducers/fetchedDatumReducer";

export interface IState {
    fetchedData:IFetchedDatumState;
    toggleDisplay:IToggleDisplayState;
}

const initialState: IState = {
    fetchedData: initialFetchedDatumState,
    toggleDisplay: initialToggledisplayState
}

function configureStore(state:IState = initialState) {
  return createStore(rootReducer, state);
}
export default configureStore;