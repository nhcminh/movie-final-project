import { combineReducers } from 'redux';
import { LoadingSliceReducer } from './Slices/LoadingSlice';
import { FilmsSliceReducer } from './Slices/FilmsSlice';
import { UserSliceReducer } from './Slices/UserSlice';

const rootReducer = combineReducers({
  LoadingSliceReducer,
  FilmsSliceReducer,
  UserSliceReducer,
});

export default rootReducer;
