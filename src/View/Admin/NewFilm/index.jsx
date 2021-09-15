import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Radio,
  DatePicker,
  InputNumber,
  Switch,
  Typography,
} from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import { AxiosPost } from '../../../API/method';
import { notificationAnt } from '../../../Utility/NotificationAnt/notificationAnt';
import * as Yup from 'yup';

const { Title, Text } = Typography;

// Catch lỗi form
const validationSchema = Yup.object().shape({
  tenPhim: Yup.string().required('Tên phim không được bỏ trống!'),
  trailer: Yup.string().required('Trailer không được bỏ trống!'),
  moTa: Yup.string().required('Mô tả không được bỏ trống!'),
  ngayKhoiChieu: Yup.string().required('Ngày khởi chiếu không được bỏ trống!'),
});

export default function NewFilm(props) {
  const [componentSize, setComponentSize] = useState('default');
  const [imgSrc, setImgSrc] = useState();

  const formik = useFormik({
    initialValues: {
      tenPhim: '',
      trailer: '',
      moTa: '',
      ngayKhoiChieu: '',
      dangChieu: false,
      sapChieu: false,
      hot: false,
      danhGia: 1,
      hinhAnh: {},
    },
    validationSchema,
    onSubmit: (values) => {
      values.maNhom = 'GP01';
      // Tạo đối tượng formdata
      let formData = new FormData();
      for (let key in values) {
        if (key !== 'hinhAnh') {
          formData.append(key, values[key]);
        } else {
          if (values.hinhAnh?.name !== undefined) {
            formData.append('File', values.hinhAnh, values.hinhAnh.name);
          }
        }
      }

      // Gọi API gửi các giá trị
      AxiosPost(`QuanLyPhim/ThemPhimUploadHinh`, formData)
        .then((res) => {
          notificationAnt('success', 'Add new film', 'Success!');
          // console.log(res);
        })
        .catch((err) => {
          const { content } = err.response.data;
          notificationAnt('error', 'Add new film', `${content}`);
          // console.log(err.response.data.message);
        });
    },
  });

  const { handleSubmit, handleChange, setFieldValue, touched, errors } = formik;

  const handleChangeDatePicker = (value) => {
    let ngayKhoiChieu = moment(value).format('DD/MM/YYYY');
    setFieldValue('ngayKhoiChieu', ngayKhoiChieu);
  };

  const handleChangeSwitch = (name) => {
    return (value) => {
      setFieldValue(name, value);
    };
  };

  const handleChangeFile = async (e) => {
    let file = e.target.files[0];
    if (
      file.type === 'image/png' ||
      file.type === 'image/jpeg' ||
      file.type === 'image/gif'
    ) {
      //Đem dữ liệu file lưu vào formik
      setFieldValue('hinhAnh', file);
      //tạo đối tượng để đọc file
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImgSrc(e.target.result); //Hình base 64
      };

      //Đem dữ liệu file lưu vào formik
      setFieldValue('hinhAnh', file);
    }
  };

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  return (
    <>
      <Title level={3}>Thêm phim</Title>
      <Form
        onSubmitCapture={handleSubmit}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout='horizontal'
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
      >
        <Form.Item label='Form Size' name='size'>
          <Radio.Group>
            <Radio.Button value='small'>Small</Radio.Button>
            <Radio.Button value='default'>Default</Radio.Button>
            <Radio.Button value='large'>Large</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label='Tên phim'>
          <Input name='tenPhim' onChange={handleChange} />
          {touched.tenPhim && <Text type='danger'>{errors.tenPhim}</Text>}
        </Form.Item>
        <Form.Item label='Trailer'>
          <Input name='trailer' onChange={handleChange} />
          {touched.trailer && <Text type='danger'>{errors.trailer}</Text>}
        </Form.Item>
        <Form.Item label='Mô tả'>
          <Input name='moTa' onChange={handleChange} />
          {touched.moTa && <Text type='danger'>{errors.moTa}</Text>}
        </Form.Item>
        <Form.Item label='Ngày khởi chiếu'>
          <DatePicker
            name='ngayKhoiChieu'
            format={'DD/MM/YYYY'}
            onChange={handleChangeDatePicker}
          />
          <br></br>
          {touched.ngayKhoiChieu && (
            <Text type='danger'>{errors.ngayKhoiChieu}</Text>
          )}
        </Form.Item>

        <Form.Item label='Đang chiếu' valuePropName='checked'>
          <Switch onChange={handleChangeSwitch('dangChieu')} />
        </Form.Item>
        <Form.Item label='Sắp chiếu' valuePropName='checked'>
          <Switch onChange={handleChangeSwitch('sapChieu')} />
        </Form.Item>
        <Form.Item label='Hot' valuePropName='checked'>
          <Switch onChange={handleChangeSwitch('hot')} />
        </Form.Item>
        <Form.Item label='Số sao'>
          <InputNumber
            onChange={handleChangeSwitch('danhGia')}
            defaultValue={1}
            min={1}
            max={10}
          />
        </Form.Item>
        <Form.Item label='Hình ảnh' extra=''>
          <input
            type='file'
            onChange={handleChangeFile}
            accept='image/png, image/jpeg, image/gif'
          ></input>
          <br></br>
          <img style={{ width: 150, height: 150 }} src={imgSrc} alt='...'></img>
          <br></br>
        </Form.Item>

        <Form.Item label='Tác vụ'>
          <Button htmlType='submit' type='primary'>
            Thêm phim
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
