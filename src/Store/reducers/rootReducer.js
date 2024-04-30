import { combineReducers } from '@reduxjs/toolkit';
import generalReducer from './generalReducer';

const rootReducer = combineReducers({
  general: generalReducer
});

export default rootReducer;