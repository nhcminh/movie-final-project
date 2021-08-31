import React, { Fragment, useEffect, useState } from "react";
import { Button, Input, Space, Table, Typography } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { AxiosGet } from "../../../API/method";
import { NavLink } from "react-router-dom";

const { Title } = Typography;
const { Search } = Input;

export default function Dashboard(props) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPage, setTotalPage] = useState();
  const [, setOrder] = useState({
    sortedInfo: null,
  });
  useEffect(() => {
    //gọi API get
    AxiosGet(
      `QuanLyPhim/LayDanhSachPhimPhanTrang`,
      `?maNhom=GP01&soTrang=${page}&soPhanTuTrenTrang=${pageSize}`
    )
      .then((res) => {
        //   console.log(res.content);
        let { items, totalCount } = res.content;
        setData(items);
        setTotalPage(totalCount);
      })
      .catch((err) => console.log(err));
  }, [pageSize, page]);

  const handleChange = (sorter) => {
    setOrder({
      sortedInfo: sorter,
    });
  };

  const columns = [
    {
      title: "Mã Phim",
      key: "maPhim",
      dataIndex: "maPhim",
      width: "10%",
      sorter: (a, b) => a.maPhim - b.maPhim,
    },
    {
      title: "Hình ảnh",
      key: "hinhAnh",
      dataIndex: "hinhAnh",
      width: "15%",
      render: (record) => {
        return (
          <img
            src={`${record.replace("movieapinew", "movieapi")}`}
            width="100px"
            alt="phim"
          ></img>
        );
      },
    },
    {
      title: "Tên phim",
      key: "tenPhim",
      dataIndex: "tenPhim",
      width: "25%",
      sorter: (a, b) => {
        let nameA = a.tenPhim.trim().toLowerCase();
        let nameB = b.tenPhim.trim().toLowerCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
      },
    },
    {
      title: "Mô tả",
      key: "moTa",
      dataIndex: "moTa",
      width: "40%",
    },
    {
      title: "Hành động",
      key: "action",
      width: "10%",
      render: (record) => {
        return (
          <Space size="large" align="baseline" direction="horizontal">
            <EditOutlined
              style={{ fontSize: "25px", color: "rgb(247,183,182)" }}
              onClick={() => {}}
            ></EditOutlined>
            <DeleteOutlined
              style={{ fontSize: "25px", color: "rgb(131,122,239)" }}
              twoToneColor="#52c41a"
              onClick={() => {}}
            ></DeleteOutlined>
          </Space>
        );
      },
    },
  ];

  return (
    <Fragment>
      <Title level={2}>Quản lý phim</Title>
      <Button type="primary" ghost>
        <NavLink to="/admin/films/addnew">Thêm phim</NavLink>
      </Button>
      <Search placeholder="input search text" enterButton />

      <Table
        bordered
        dataSource={data}
        columns={columns}
        rowKey={"maPhim"}
        onChange={handleChange}
        pagination={{
          current: page,
          pageSize: pageSize,
          total: totalPage,
          onChange: (page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
          },
        }}
      />
    </Fragment>
  );
}
