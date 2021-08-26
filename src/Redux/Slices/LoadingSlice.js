import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: true,
};

const loadingSlice = createSlice({
  name: 'loadingSlice',
  initialState,
  reducers: {
    changeLoading(state, { payload }) {
      state.isLoading = payload;
    },
  },
});

const { actions, reducer } = loadingSlice;
export { actions as LoadingSliceActions, reducer as LoadingSliceReducer };
