import { combineReducers } from 'redux';
import testReducer from './testReducer';
import ListReducer from './ListReducer';
const reducers = combineReducers({
  testReducer,
  ListReducer
});
export default reducers;
