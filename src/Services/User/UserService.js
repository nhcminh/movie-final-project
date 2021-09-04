import { AxiosPost } from '../../API/method';

export const userApi = {
  getMe: (userInfo) => {
    return AxiosPost(`QuanLyNguoiDung/DangNhap`, userInfo);
  },
};
