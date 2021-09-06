import { AxiosGet } from '../../API/method';

export const filmsApi = {
  getFilm: (page = 0, pageSize = 0, searchData = '') => {
    if (searchData === '') {
      return AxiosGet(
        `QuanLyPhim/LayDanhSachPhimPhanTrang`,
        `?maNhom=GP01&soTrang=${page}&soPhanTuTrenTrang=${pageSize}`
      );
    } else {
      return AxiosGet(
        `QuanLyPhim/LayDanhSachPhimPhanTrang`,
        `?maNhom=GP01&tenPhim=${searchData}&soTrang=${page}&soPhanTuTrenTrang=${pageSize}`
      );
    }
  },
};
