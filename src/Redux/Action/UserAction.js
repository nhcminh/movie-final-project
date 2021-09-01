import { STATUS_CODE, TOKEN, USER_LOGIN } from '../../API/constant';
import { AxiosPost } from '../../API/method';
import { notificationAnt } from '../../Utility/NotificationAnt/notificationAnt';
import { UserSliceActions } from '../Slices/UserSlice';
import { history } from '../../Utility/History/history';

const { getUserInfo } = UserSliceActions;

export const getSignIn = (userInfo) => {
  return async (dispatch) => {
    try {
      const { content, statusCode } = await AxiosPost(
        `QuanLyNguoiDung/DangNhap`,
        userInfo
      );

      if (statusCode === STATUS_CODE.SUCCESS) {
        dispatch(getUserInfo(content));
        localStorage.setItem(TOKEN, content.accessToken);
        localStorage.setItem(USER_LOGIN, JSON.stringify(content));
        notificationAnt(`success`, `Đăng nhập`, `Đăng nhập thành công!`);
        history.push('/');
      }
    } catch (err) {
      console.log(err);
      let { content } = err.response.data;
      notificationAnt(`error`, `Đăng nhập`, `${content}`);
    }
  };
};
