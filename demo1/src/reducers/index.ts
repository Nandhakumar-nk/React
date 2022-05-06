import { combineReducers } from 'redux';

import { fetchedDataReducer } from './fetchedDataReducer';
import { toggleDisplayReducer } from './toggleDisplayReducer';

export default combineReducers({
  fetchedData: fetchedDataReducer,
  toggleDisplay: toggleDisplayReducer
});