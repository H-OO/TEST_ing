import { combineReducers } from 'redux';
import ModeReducer from './ModeReducer';
import ControlReducer from './ControlReducer';
const reducers = combineReducers({
  ModeReducer,
  ControlReducer
});
export default reducers;
