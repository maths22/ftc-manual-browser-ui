import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import searchReducer from './searchReducer';
import { reducer as formReducer } from 'redux-form';
import uiReducer from './uiReducer';

export default (history) => combineReducers({
  search: searchReducer,
  form: formReducer,
  router: connectRouter(history),
  ui: uiReducer,
});