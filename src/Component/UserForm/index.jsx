import React, { useState, useEffect } from 'react';
import { Form, Button, Input, Select } from 'antd';
import { useFormik } from 'formik';
import { notificationAnt } from '../../Utility/NotificationAnt/notificationAnt';
import { AxiosPost, AxiosPut } from '../../API/method';
import * as Yup from 'yup';
import { AxiosGet } from '../../API/method';
import Text from 'antd/lib/typography/Text';

const validationSchema = Yup.object().shape({
  // Form đăng nhập
  taiKhoan: Yup.string().required('Tài khoản không được bỏ trống!'),
  matKhau: Yup.string()
    .required('Mật khẩu không được bỏ trống!')
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
    .max(32, 'Mật khẩu phải có tối đa 32 ký tự'),
  hoTen: Yup.string().required('Họ tên không được bỏ trống!'),
  email: Yup.string()
    .required('Email không được bỏ trống!')
    .email('Email không hợp lệ!'),
  soDt: Yup.string()
    .required('Số điện thoại không được bỏ trống!')
    .matches(/^[0-9]+$/, 'Số điện thoại không hợp lệ!')
    .min(10, 'Số điện thoại không hợp lệ!')
    .max(11, 'Số điện thoại không hợp lệ!'),
});

export default function UserForm(props) {
  const { setIsModalVisible, isNew, editUserData } = props.data;
  const [loaiND, setLoaiND] = useState([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const { content } = await AxiosGet(
      `QuanLyNguoiDung/LayDanhSachLoaiNguoiDung`
    );
    setLoaiND(content);
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: editUserData?.taiKhoan,
      matKhau: editUserData?.matKhau,
      email: editUserData?.email,
      soDt: editUserData?.soDt,
      maNhom: 'GP01',
      maLoaiNguoiDung: isNew
        ? loaiND[0]?.maLoaiNguoiDung
        : editUserData?.maLoaiNguoiDung,
      hoTen: editUserData?.hoTen,
    },
    onSubmit: async (values, { resetForm }) => {
      values.maNhom = 'GP01';
      console.log(values);
      if (isNew) {
        try {
          const result = await AxiosPost(
            `QuanLyNguoiDung/ThemNguoiDung`,
            values
          );
          notificationAnt('success', 'Add User', 'Success!');
          resetForm();
          setIsModalVisible(false);
        } catch (error) {
          console.log('error', error.response?.data);
          const { content } = error.response.data;
          notificationAnt('error', 'Add User', `${content}`);
        }
      } else {
        try {
          const result = await AxiosPut(
            `QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
            values
          );
          notificationAnt('success', 'Edit User', 'Success!');
          setIsModalVisible(false);
        } catch (error) {
          console.log('error', error.response?.data);
          const { content } = error.response.data;
          notificationAnt('error', 'Edit User', `${content}`);
        }
      }
    },
    validationSchema,
  });

  const handleChangemaLoaiNguoiDung = (value) => {
    formik.setFieldValue('maLoaiNguoiDung', value);
  };

  return (
    <Form
      name='basic'
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onSubmitCapture={formik.handleSubmit}
    >
      <Form.Item label='Họ tên'>
        <Input
          name='hoTen'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder='Nhập họ tên'
          value={formik.values.hoTen}
        />
        {formik.touched.hoTen && (
          <Text type='danger'>{formik.errors.hoTen}</Text>
        )}
      </Form.Item>
      <Form.Item label='Tài khoản'>
        <Input
          name='taiKhoan'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.taiKhoan}
          placeholder='Nhập tài khoản'
        />
        {formik.touched.taiKhoan && (
          <Text type='danger'>{formik.errors.taiKhoan}</Text>
        )}
      </Form.Item>
      <Form.Item label='Mật khẩu'>
        <Input.Password
          name='matKhau'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder='Nhập mật khẩu'
          value={formik.values.matKhau}
        />
        {formik.touched.matKhau && (
          <Text type='danger'>{formik.errors.matKhau}</Text>
        )}
      </Form.Item>
      <Form.Item label='Email'>
        <Input
          name='email'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder='Nhập email'
          value={formik.values.email}
        />
        {formik.touched.email && (
          <Text type='danger'>{formik.errors.email}</Text>
        )}
      </Form.Item>
      <Form.Item label='Số điện thoại'>
        <Input
          name='soDt'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder='Nhập số điện thoại'
          value={formik.values.soDt}
        />
        {formik.touched.soDt && <Text type='danger'>{formik.errors.soDt}</Text>}
      </Form.Item>
      <Form.Item label='Loại người dùng'>
        <Select
          options={loaiND.map((item, index) => ({
            label: item.tenLoai,
            value: item.maLoaiNguoiDung,
          }))}
          onChange={handleChangemaLoaiNguoiDung}
          placeholder='Chọn loại người dùng'
          value={formik.values.maLoaiNguoiDung}
        ></Select>
      </Form.Item>
      <Form.Item label='Chức năng'>
        <Button htmlType='submit'>{isNew ? 'Thêm' : 'Lưu'}</Button>
      </Form.Item>
    </Form>
  );
}
