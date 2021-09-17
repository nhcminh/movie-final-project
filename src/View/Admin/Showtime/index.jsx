import {
  Form,
  DatePicker,
  InputNumber,
  Button,
  Select,
  Typography,
} from 'antd';
import { useFormik } from 'formik';
import React, { useState, useEffect, Fragment } from 'react';
import moment from 'moment';
import { AxiosGet, AxiosPost } from '../../../API/method';
import { notificationAnt } from '../../../Utility/NotificationAnt/notificationAnt';
import * as Yup from 'yup';
import Text from 'antd/lib/typography/Text';

const { Title } = Typography;
let film = {};

const validationSchema = Yup.object().shape({
  // Form đăng nhập
  ngayChieuGioChieu: Yup.string().required(
    'Ngày chiếu giờ chiếu không được bỏ trống!'
  ),
  maRap: Yup.string().required('Mã rạp không được bỏ trống!'),
  giaVe: Yup.string().required('Giá vé không được bỏ trống!'),
});

export default function Showtime(props) {
  const [state, setState] = useState({
    heThongRapChieu: [],
    cumRapChieu: [],
  });
  const formik = useFormik({
    initialValues: {
      maPhim: props.match.params.id,
      ngayChieuGioChieu: '',
      maRap: '',
      giaVe: '',
    },
    onSubmit: async (values) => {
      try {
        const result = await AxiosPost(`QuanLyDatVe/TaoLichChieu`, values);
        notificationAnt('success', 'Add showcase', 'Success!');
      } catch (error) {
        console.log('error', error.response?.data);
        const { content } = error.response.data;
        notificationAnt('error', 'Add showcase', `${content}`);
      }
    },
    validationSchema,
  });
  
  
  console.log(state.heThongRapChieu);
  useEffect(() => {
    async function getHeThongRap() {
      try {
        let result = await AxiosGet(`QuanLyRap/LayThongTinHeThongRap`);
        setState({
          ...state,
          heThongRapChieu: result.content,
        });
      } catch (err) {
        console.log(err);
      }
    }
    getHeThongRap();
  }, []);

  const handleChangeHeThongRap = async (value) => {
    // từ hệ thống rạp call API lấy thông tin rạp
    try {
      let result = await AxiosGet(
        `QuanLyRap/LayThongTinCumRapTheoHeThong`,
        `?maHeThongRap=${value}`
      );
      //Gán giá trị cụm rạp vào state cụm rạp
      setState({
        ...state,
        cumRapChieu: result.content,
      });
    } catch (err) {
      console.log('error', err.response.data);
    }
  };

  const handleChangeCumRap = (value) => {
    formik.setFieldValue('maRap', value);
  };

  const convertSelectHTR = () => {
    return state.heThongRapChieu?.map((htr, index) => {
      return { label: htr.tenHeThongRap, value: htr.tenHeThongRap };
    });
  };

  const onChangeDate = (value) => {
    formik.setFieldValue(
      'ngayChieuGioChieu',
      moment(value).format('DD/MM/YYYY hh:mm:ss')
    );
  };

  const onOk = (value) => {
    formik.setFieldValue(
      'ngayChieuGioChieu',
      moment(value).format('DD/MM/YYYY hh:mm:ss')
    );
  };
  const onChangeInputNumber = (value) => {
    formik.setFieldValue('giaVe', value);
  };

  if (localStorage.getItem('filmParams')) {
    film = JSON.parse(localStorage.getItem('filmParams'));
  }
  return (
    <Fragment>
      <Title level={2}>Tạo lịch chiếu - {props.match.params.tenphim}</Title>
      <img src={film.hinhAnh} alt='...' />
      <Form
        name='basic'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onSubmitCapture={formik.handleSubmit}
      >
        <Form.Item label='Hệ thống rạp'>
          <Select
            options={convertSelectHTR()}
            onChange={handleChangeHeThongRap}
            placeholder='Chọn hệ thống rạp'
          ></Select>
        </Form.Item>
        <Form.Item label='Cụm rạp'>
          <Select
            options={state.cumRapChieu?.map((cumRap, index) => ({
              label: cumRap.tenCumRap,
              value: cumRap.maCumRap,
            }))}
            onChange={handleChangeCumRap}
            placeholder='Chọn cụm rạp'
          ></Select>
          {formik.touched.maRap && (
            <Text type='danger'>{formik.errors.maRap}</Text>
          )}
        </Form.Item>
        <Form.Item label='Ngày chiếu giờ chiếu'>
          <DatePicker
            format='DD/MM/YYYY hh:mm:ss'
            showTime
            onChange={onChangeDate}
            onOk={onOk}
          ></DatePicker>
          <br />
          {formik.touched.ngayChieuGioChieu && (
            <Text type='danger'>{formik.errors.ngayChieuGioChieu}</Text>
          )}
        </Form.Item>
        <Form.Item label='Giá vé'>
          <InputNumber
            min={75000}
            max={150000}
            onChange={onChangeInputNumber}
          />
          <br />
          {formik.touched.giaVe && (
            <Text type='danger'>{formik.errors.giaVe}</Text>
          )}
        </Form.Item>
       
        <Form.Item label='Chức năng'>
          <Button htmlType='submit'>Tạo lịch chiếu</Button>
        </Form.Item>
      </Form>
    </Fragment>
  );
}
