import { combineReducers } from 'redux';
import restaraunts from './restaraunts';
import loading from './loading';

const rootReducer = combineReducers({ restaraunts, loading });

export default rootReducer;
