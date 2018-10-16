import { combineReducers } from 'redux';
import testReducer from './testReducer';
import ListReducer from './ListReducer';
import BannerReducer from './BannerReducer';
const reducers = combineReducers({
  testReducer,
  ListReducer,
  BannerReducer
});
export default reducers;
