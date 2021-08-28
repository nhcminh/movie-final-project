import { combineReducers } from "redux";
import { LoadingSliceReducer } from "./Slices/LoadingSlice";
import { FilmsSliceReducer } from "./Slices/FilmsSlice";
const rootReducer = combineReducers({ LoadingSliceReducer, FilmsSliceReducer });

export default rootReducer;
