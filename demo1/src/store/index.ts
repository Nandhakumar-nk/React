import { createStore } from "redux";

import rootReducer from "../reducers";
import { IFetchedDatum } from "../actions/fetchedData/changeFetchedDatum";
import { initialToggledisplayState, IToggleDisplayState } from "../reducers/toggleDisplayReducer";
import { initialFetchedDataState } from "../reducers/fetchedDataReducer";

interface IState {
    fetchedData:IFetchedDatum;
    toggleDisplay:IToggleDisplayState;
}

const initialState: IState = {
    fetchedData: initialFetchedDataState,
    toggleDisplay: initialToggledisplayState
}

function configureStore(state:IState = initialState) {
  return createStore(rootReducer, state);
}
export default configureStore;