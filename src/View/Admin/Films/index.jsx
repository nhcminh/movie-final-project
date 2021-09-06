import React, { Fragment, useEffect, useState, useRef } from 'react';
import {
  Button,
  Input,
  Space,
  Table,
  Typography,
  Popconfirm,
  message,
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { AxiosDelete, AxiosGet } from '../../../API/method';
import { NavLink } from 'react-router-dom';
import { filmsApi } from '../../../Services/Films/FilmsService';

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
  const [get, setGet] = useState(false);
  const [searchData, setSearchData] = useState('');
  const searchRef = useRef(null);

  useEffect(() => {
    //gọi API get
    filmsApi
      .getFilm(page, pageSize, searchData)
      .then((res) => {
        //   console.log(res.content);
        let { items, totalCount } = res.content;
        setData(items);
        setTotalPage(totalCount);
      })
      .catch((err) => console.log(err));
  }, [pageSize, page, get, searchData]);

  const handleChange = (sorter) => {
    setOrder({
      sortedInfo: sorter,
    });
  };

  // Xử lý PopupConfirm
  const handleDelete = async (maPhim) => {
    console.log(maPhim);
    try {
      const result = await AxiosDelete(
        `QuanLyPhim/XoaPhim`,
        `?MaPhim=${maPhim}`
      );
      console.log(result);
      message.success(`xóa thành công!`);
      setGet(!get);
    } catch (err) {
      console.log(err);
    }
  };

  function cancelPopconfirm(e) {}

  // Search
  const handleSearch = (value) => {
    // console.log(value);
    // setSearchData(value);
  };

  const handleChangeSearch = (e) => {
    // console.log('search',e.target.value);
    let { value } = e.target;
    
    if (searchRef.current) {
      clearTimeout(searchRef.current);
    }

    searchRef.current = setTimeout(() => {
      setSearchData(value);
    }, 300);

    // console.log('searchRef',searchRef.current);
    // console.log(value);
    console.log(searchData);
  };

  const columns = [
    {
      title: 'Mã Phim',
      key: 'maPhim',
      dataIndex: 'maPhim',
      width: '10%',
      sorter: (a, b) => a.maPhim - b.maPhim,
    },
    {
      title: 'Hình ảnh',
      key: 'hinhAnh',
      dataIndex: 'hinhAnh',
      width: '15%',
      render: (record) => {
        return (
          <img
            src={`${record.replace('movieapinew', 'movieapi')}`}
            width='100px'
            alt='phim'
          ></img>
        );
      },
    },
    {
      title: 'Tên phim',
      key: 'tenPhim',
      dataIndex: 'tenPhim',
      width: '25%',
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
      title: 'Mô tả',
      key: 'moTa',
      dataIndex: 'moTa',
      width: '40%',
    },
    {
      title: 'Hành động',
      key: 'action',
      width: '10%',
      render: (record) => {
        return (
          <Space size='large' align='baseline' direction='horizontal'>
            <EditOutlined
              style={{ fontSize: '25px', color: 'rgb(247,183,182)' }}
              onClick={() => {
                props.history.push(`/admin/films/edit/${record.maPhim}`);
              }}
            ></EditOutlined>
            <Popconfirm
              title='Bạn có chắc muốn xóa?'
              onConfirm={() => {
                handleDelete(record.maPhim);
              }}
              onCancel={cancelPopconfirm}
              okText='Yes'
              cancelText='No'
            >
              <DeleteOutlined
                style={{ fontSize: '25px', color: 'rgb(131,122,239)' }}
                twoToneColor='#52c41a'
              ></DeleteOutlined>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  return (
    <Fragment>
      <Title level={2}>Quản lý phim</Title>
      <Button type='primary' ghost>
        <NavLink to='/admin/films/addnew'>Thêm phim</NavLink>
      </Button>
      <Search
        placeholder='input search text'
        enterButton={<SearchOutlined />}
        onSearch={handleSearch}
        onChange={handleChangeSearch}
      />

      <Table
        bordered
        dataSource={data}
        columns={columns}
        rowKey={'maPhim'}
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
