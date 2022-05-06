import { combineReducers } from 'redux';

import { fetchedDatumReducer } from './fetchedDatumReducer';
import { toggleDisplayReducer } from './toggleDisplayReducer';

export default combineReducers({
  fetchedData: fetchedDatumReducer,
  toggleDisplay: toggleDisplayReducer
});