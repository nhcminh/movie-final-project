import { AxiosPost, AxiosGet } from '../../API/method';

export const userApi = {
  getMe: (userInfo) => {
    return AxiosPost(`QuanLyNguoiDung/DangNhap`, userInfo);
  },
  getDanhSach: (page = 0, pageSize = 0, searchData = '') => {
    if (searchData === '') {
      return AxiosGet(
        `QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang`,
        `?MaNhom=GP01&soTrang=${page}&soPhanTuTrenTrang=${pageSize}`
      );
    } else {
      return AxiosGet(
        `QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang`,
        `?MaNhom=GP01&tuKhoa=${searchData}&soTrang=${page}&soPhanTuTrenTrang=${pageSize}`
      );
    }
  },
};
