import { combineReducers } from 'redux';
import { LoadingSliceReducer } from './Slices/LoadingSlice';
const rootReducer = combineReducers({ LoadingSliceReducer });

export default rootReducer;
