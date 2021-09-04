import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { LoadingSliceReducer } from './Slices/LoadingSlice';
import { FilmsSliceReducer } from './Slices/FilmsSlice';
import { UserSliceReducer } from './Slices/UserSlice';

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
  whitelist: ['auth'],
};

const rootReducer = combineReducers({
  LoadingSliceReducer,
  FilmsSliceReducer,
  auth: UserSliceReducer,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);

// export default persistReducer(persistConfig, rootReducer);
