import { combineReducers } from 'redux';
import NavReducer from './NavReducer';
import MenuReducer from './MenuReducer';
const reducers = combineReducers({
  NavReducer,
  MenuReducer
});
export default reducers;
