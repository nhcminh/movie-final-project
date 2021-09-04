import { Form, Input, InputNumber, Button, Space, Typography } from 'antd';
import { NavLink } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Fragment } from 'react';
import Text from 'antd/lib/typography/Text';
import { AxiosPost } from '../../API/method';
import { notificationAnt } from '../../Utility/NotificationAnt/notificationAnt';

const { Title } = Typography;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const validationSchema = Yup.object().shape({
  // Form đăng nhập
  hoTen: Yup.string().required('Họ tên không được bỏ trống!'),
  taiKhoan: Yup.string().required('Tài khoản không được bỏ trống!'),
  matKhau: Yup.string()
    .required('Mật khẩu không được bỏ trống!')
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
    .max(32, 'Mật khẩu phải có tối đa 32 ký tự'),
  email: Yup.string()
    .required('Email không được bỏ trống!')
    .email('Email không hợp lệ!'),
  soDt: Yup.string()
    .required('Số điện thoại không được bỏ trống!')
    .matches(/^[0-9]+$/, 'Số điện thoại không hợp lệ!')
    .min(10, 'Số điện thoại không hợp lệ!')
    .max(11, 'Số điện thoại không hợp lệ!'),
});
function SignUp(props) {
  const formik = useFormik({
    initialValues: {
      taiKhoan: '',
      matKhau: '',
      email: '',
      soDt: '',
      maNhom: 'GP01',
      hoTen: '',
    },
    onSubmit: (values) => {
      console.log(values);
      //  Gọi API
      AxiosPost(`QuanLyNguoiDung/DangKy`, values)
        .then((res) => {
          notificationAnt(
            `success`,
            `Đăng ký tài khoản`,
            `Đăng ký thành công!`
          );
          props.history.push('/signin');
        })
        .catch((err) => {
          let { content } = err.response.data;
          notificationAnt(`error`, `Đăng ký tài khoản`, `${content}`);
        });
    },
    validationSchema,
  });

  const { handleChange, handleSubmit, handleBlur, errors, touched } = formik;
  return (
    <Fragment>
      <Title level={2}>Đăng ký</Title>
      <Form {...layout} onSubmitCapture={handleSubmit}>
        <Form.Item label='Họ tên'>
          <Input name='hoTen' onBlur={handleBlur} onChange={handleChange} />
          {touched.hoTen && <Text type='danger'>{errors.hoTen}</Text>}
        </Form.Item>
        <Form.Item label='Tài khoản'>
          <Input name='taiKhoan' onBlur={handleBlur} onChange={handleChange} />
          {touched.taiKhoan && <Text type='danger'>{errors.taiKhoan}</Text>}
        </Form.Item>
        <Form.Item label='Mật khẩu'>
          <Input.Password
            name='matKhau'
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {touched.matKhau && <Text type='danger'>{errors.matKhau}</Text>}
        </Form.Item>
        <Form.Item label='Email'>
          <Input name='email' onBlur={handleBlur} onChange={handleChange} />
          {touched.email && <Text type='danger'>{errors.email}</Text>}
        </Form.Item>
        <Form.Item label='Số điện thoại'>
          <Input name='soDt' onBlur={handleBlur} onChange={handleChange} />
          {touched.soDt && <Text type='danger'>{errors.soDt}</Text>}
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Space>
            <Button type='primary' htmlType='submit'>
              Đăng ký
            </Button>
            <Button type='primary'>
              <NavLink to='/signin'>Trở về trang đăng nhập</NavLink>
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Fragment>
  );
}
export default SignUp;
