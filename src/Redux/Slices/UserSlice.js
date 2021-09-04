import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { REHYDRATE } from 'redux-persist';
import { USER_LOGIN } from '../../API/constant';
import { userApi } from '../../Services/User/UserService';

export const getMe = createAsyncThunk(
  'user/getMe',
  async (userInfo, { rejectWithValue }) => {
    try {
      console.log(userInfo);
      const res = await userApi.getMe(userInfo);
      return res.content;
    } catch (err) {
      let error = err;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  userInfo: {},
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.userInfo = action.payload;
    });
  },
});

const { actions, reducer } = userSlice;
export { actions as UserSliceActions, reducer as UserSliceReducer };
