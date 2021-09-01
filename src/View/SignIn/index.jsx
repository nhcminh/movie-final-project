import React, { Fragment } from 'react';
import { Form, Input, Button, Checkbox, Space, Typography } from 'antd';
import { useState } from 'react';
import { useFormik } from 'formik';
import { NavLink } from 'react-router-dom';
import * as Yup from 'yup';
import Text from 'antd/lib/typography/Text';
import { AxiosPost } from '../../API/method';
import { notificationAnt } from '../../Utility/NotificationAnt/notificationAnt';
import { useDispatch } from 'react-redux';
import { getSignIn } from '../../Redux/Action/UserAction';

const { Title } = Typography;

// Catch lỗi form
const validationSchema = Yup.object().shape({
  taiKhoan: Yup.string().required('Tài khoản không được bỏ trống!'),
  matKhau: Yup.string().required('Mật khẩu không được bỏ trống!'),
});

function SignIn(props) {
  const [size, setSize] = useState('small');
  const dispatch = useDispatch();

  // Formik
  const formik = useFormik({
    initialValues: {
      taiKhoan: '',
      matKhau: '',
    },
    validationSchema,
    onSubmit: (values) => {
      // console.log(typeof values);
      console.log(values);
      // Gọi APi đăng nhặp
      dispatch(getSignIn(values));
    },
  });

  const { handleChange, handleSubmit, errors, touched } = formik;
  return (
    <Fragment>
      <Title level={3}>Sign In</Title>
      <Form
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        onSubmitCapture={handleSubmit}
      >
        <Space size={size} direction='vertical'>
          <Form.Item label='Tài khoản'>
            <Input name='taiKhoan' onChange={handleChange} />
            {touched.taiKhoan && <Text type='danger'>{errors.taiKhoan}</Text>}
          </Form.Item>

          <Form.Item label='Mật khẩu'>
            <Input.Password name='matKhau' onChange={handleChange} />
            {touched.matKhau && <Text type='danger'>{errors.matKhau}</Text>}
          </Form.Item>

          <Form.Item
            name='remember'
            valuePropName='checked'
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Space>
              <Button type='primary' htmlType='submit'>
                Đăng nhập
              </Button>
              <Button type='primary'>
                <NavLink to='/signup'> Đăng ký</NavLink>
              </Button>
            </Space>
          </Form.Item>
        </Space>
      </Form>
    </Fragment>
  );
}

export default SignIn;
