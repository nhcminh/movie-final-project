import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  Typography,
  Upload,
} from "antd";
import { useFormik } from "formik";
import moment from "moment";
import { AxiosGet, AxiosPost, AxiosPut } from "../../../API/method";
import { notificationAnt } from "../../../Utility/NotificationAnt/notificationAnt";
import * as Yup from "yup";
import { values } from "lodash";
import TextArea from "antd/lib/input/TextArea";
const { Title, Text } = Typography;

// Catch lỗi form
const validationSchema = Yup.object().shape({
  tenPhim: Yup.string().required("Tên phim không được bỏ trống!"),
  trailer: Yup.string().required("Trailer không được bỏ trống!"),
  moTa: Yup.string().required("Mô tả không được bỏ trống!"),
  ngayKhoiChieu: Yup.string().required("Ngày khởi chiếu không được bỏ trống!"),
});

export default function EditFilm(props) {
  const [componentSize, setComponentSize] = useState("default");
  const [imgSrc, setImgSrc] = useState("");
  const [thongTinPhim, setThongTinFilm] = useState({});

  useEffect(() => {
    AxiosGet(`QuanLyPhim/LayThongTinPhim`, `?MaPhim=${props.match.params.id}`)
      .then((res) => {
        setThongTinFilm(res.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      maPhim: thongTinPhim?.maPhim,
      tenPhim: thongTinPhim?.tenPhim,
      trailer: thongTinPhim?.trailer,
      moTa: thongTinPhim?.moTa,
      ngayKhoiChieu: thongTinPhim?.ngayKhoiChieu,
      dangChieu: thongTinPhim?.dangChieu,
      sapChieu: thongTinPhim?.sapChieu,
      hot: thongTinPhim?.hot,
      danhGia: thongTinPhim?.danhGia,
      hinhAnh: null,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      values.maNhom = "GP01";
      values.ngayKhoiChieu = moment(values.ngayKhoiChieu).format("DD/MM/YYYY");
      // Tạo đối tượng formdata
      let formData = new FormData();
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          if (values.hinhAnh !== null) {
            formData.append("File", values.hinhAnh, values.hinhAnh.name);
          }
        }
      }
      // console.log(values);
      // Gọi API gửi các giá trị
      AxiosPost(`QuanLyPhim/CapNhatPhimUpload`, formData)
        .then((res) => {
          notificationAnt("success", "Edit film", "Success!");
          console.log(res);
        })
        .then(() => {
          props.history.push("/admin/films");
        })
        .catch((err) => {
          const { content } = err.response.data;
          notificationAnt("error", "Edit film", `${content}`);
          // console.log(err.response);
        });
    },
  });

  const { handleSubmit, handleChange, setFieldValue, touched, errors, values } =
    formik;

  const handleChangeDatePicker = (value) => {
    let ngayKhoiChieu = moment(value);
    setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
  };

  const handleChangeSwitch = (name) => {
    return (value) => {
      setFieldValue(name, value);
    };
  };

  const handleChangeFile = async (e) => {
    let file = e.target.files[0];
    if (
      file.type === "image/png" ||
      file.type === "image/jpeg" ||
      file.type === "image/gif"
    ) {
      //Đem dữ liệu file lưu vào formik
      await setFieldValue("hinhAnh", file);

      //tạo đối tượng để đọc file
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImgSrc(e.target.result); //Hình base 64
      };
    }
  };

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  return (
    <>
      <Title level={3}>Edit phim</Title>
      <Form
        onSubmitCapture={handleSubmit}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
      >
        <Form.Item label="Form Size" name="size">
          <Radio.Group>
            <Radio.Button value="small">Small</Radio.Button>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="large">Large</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Tên phim">
          <Input
            name="tenPhim"
            onChange={handleChange}
            value={values.tenPhim}
          />
          {touched.tenPhim && <Text type="danger">{errors.tenPhim}</Text>}
        </Form.Item>
        <Form.Item label="Trailer">
          <Input
            name="trailer"
            onChange={handleChange}
            value={values.trailer}
          />
          {touched.trailer && <Text type="danger">{errors.trailer}</Text>}
        </Form.Item>
        <Form.Item label="Mô tả">
          <TextArea
            rows={8}
            name="moTa"
            onChange={handleChange}
            value={values.moTa}
          />
          {touched.moTa && <Text type="danger">{errors.moTa}</Text>}
        </Form.Item>
        <Form.Item label="Ngày khởi chiếu">
          <DatePicker
            name="ngayKhoiChieu"
            format={"DD/MM/YYYY"}
            onChange={handleChangeDatePicker}
            value={moment(values.ngayKhoiChieu)}
          />
          <br></br>
          {touched.ngayKhoiChieu && (
            <Text type="danger">{errors.ngayKhoiChieu}</Text>
          )}
        </Form.Item>

        <Form.Item label="Đang chiếu" valuePropName="checked">
          <Switch
            onChange={handleChangeSwitch("dangChieu")}
            checked={values.dangChieu}
          />
        </Form.Item>
        <Form.Item label="Sắp chiếu" valuePropName="checked">
          <Switch
            onChange={handleChangeSwitch("sapChieu")}
            checked={values.sapChieu}
          />
        </Form.Item>
        <Form.Item label="Hot" valuePropName="checked">
          <Switch onChange={handleChangeSwitch("hot")} checked={values.hot} />
        </Form.Item>
        <Form.Item label="Số sao">
          <InputNumber
            onChange={handleChangeSwitch("danhGia")}
            defaultValue={1}
            min={1}
            max={10}
            value={values.danhGia}
          />
        </Form.Item>
        <Form.Item label="Hình ảnh" extra="">
          <input
            type="file"
            onChange={handleChangeFile}
            accept="image/png, image/jpeg, image/gif"
          ></input>
          <br></br>
          <img
            style={{ width: 150, height: 150 }}
            src={imgSrc === "" ? thongTinPhim.hinhAnh : imgSrc}
            alt="..."
          ></img>
          <br></br>
        </Form.Item>

        <Form.Item label="Tác vụ">
          <Button htmlType="submit" type="primary">
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
