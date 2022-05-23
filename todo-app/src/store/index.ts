import { applyMiddleware, createStore } from "redux";

import createSagaMiddleware from "redux-saga";

import rootReducer from "../reducers";
import { IFetchedDatum as IFetchedDatumState } from "../actions/fetchedDatum/changeFetchedDatum";
import { initialToggledisplayState, IToggleDisplayState } from "../reducers/toggleDisplayReducer";
import { initialFetchedDatumState } from "../reducers/fetchedDatumReducer";
import { rootSaga } from "../sagas";

export interface IState {
    fetchedData:IFetchedDatumState;
    toggleDisplay:IToggleDisplayState;
}

const initialState: IState = {
    fetchedData: initialFetchedDatumState,
    toggleDisplay: initialToggledisplayState
}
const sagaMiddleware = createSagaMiddleware();

function configureStore(state:IState = initialState) {
  return createStore(rootReducer, state, applyMiddleware(sagaMiddleware)
  );
}

sagaMiddleware.run(rootSaga);

export default configureStore;