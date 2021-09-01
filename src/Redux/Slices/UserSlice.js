import { createSlice } from '@reduxjs/toolkit';
import { USER_LOGIN } from '../../API/constant';

// Tự động cập nhật lại userInfo khi người dùng tắt thiết bị
let user = {};
if (localStorage.getItem(USER_LOGIN)) {
  user = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const initialState = {
  userInfo: user,
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    getUserInfo(state, { payload }) {
      state.userInfo = payload;
    },
  },
});

const { actions, reducer } = userSlice;
export { actions as UserSliceActions, reducer as UserSliceReducer };
