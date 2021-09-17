import React, {
  Fragment,
  useEffect,
  useState,
  useRef,
  useCallback,
} from 'react';
import {
  Button,
  Input,
  Space,
  Table,
  Typography,
  Popconfirm,
  message,
  Modal,
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
// import { AxiosDelete, AxiosGet } from '../../../API/method';
import { NavLink } from 'react-router-dom';
import { userApi } from '../../Services/User/UserService';
import { AxiosDelete } from '../../API/method';
import UserForm from '../../Component/UserForm';

const { Title } = Typography;
const { Search } = Input;

export default function Users(props) {
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
  const [isNew, setIsNew] = useState(true);

  //Modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editUserData, setEditUserData] = useState({
    taiKhoan: '',
    matKhau: '',
    email: '',
    soDt: '',
    maNhom: 'GP01',
    maLoaiNguoiDung: '',
    hoTen: '',
  });

  const addNewUser = () => {
    setIsModalVisible(true);
    setIsNew(true);
    setEditUserData({
      taiKhoan: '',
      matKhau: '',
      email: '',
      soDt: '',
      maNhom: 'GP01',
      maLoaiNguoiDung: '',
      hoTen: '',
    });
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Page
  useEffect(() => {
    // gọi API get
    userApi
      .getDanhSach(page, pageSize, searchData)
      .then((res) => {
        //   console.log(res.content);
        let { items, totalCount } = res.content;
        setData(items);
        setTotalPage(totalCount);
      })
      .catch((err) => console.log(err));
  }, [pageSize, page, get, searchData, isModalVisible]);

  const handleChange = (sorter) => {
    setOrder({
      sortedInfo: sorter,
    });
  };

  // Xử lý PopupConfirm
  const handleDelete = async (taiKhoan) => {
    // console.log(maPhim);
    try {
      const result = await AxiosDelete(
        `QuanLyNguoiDung/XoaNguoiDung`,
        `?TaiKhoan=${taiKhoan}`
      );

      message.success(`xóa thành công!`);
      setGet(!get);
    } catch (err) {
      console.log(err);
    }
  };

  function cancelPopconfirm(e) {}

  // Search
  const handleSearch = (value) => {};

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
      title: 'Tài khoản',
      key: 'taiKhoan',
      dataIndex: 'taiKhoan',
      width: '10%',
      sorter: (a, b) => {
        let nameA = a.taiKhoan.trim().toLowerCase();
        let nameB = b.taiKhoan.trim().toLowerCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
      },
    },
    {
      title: 'Mật khẩu',
      key: 'matKhau',
      dataIndex: 'matKhau',
      width: '10%',
    },
    {
      title: 'Họ tên',
      key: 'hoTen',
      dataIndex: 'hoTen',
      width: '20%',
      sorter: (a, b) => {
        let nameA = a.hoTen.trim().toLowerCase();
        let nameB = b.hoTen.trim().toLowerCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
      },
    },
    {
      title: 'Email',
      key: 'email',
      dataIndex: 'email',
      width: '20%',
    },
    {
      title: 'Số điện thoại',
      key: 'soDt',
      dataIndex: 'soDt',
      width: '10%',
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
                setEditUserData(record);
                setIsNew(false);
                setIsModalVisible(true);
              }}
            ></EditOutlined>
            <Popconfirm
              title='Bạn có chắc muốn xóa?'
              onConfirm={() => {
                handleDelete(record.taiKhoan);
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
      <Title level={2}>Quản lý người dùng</Title>
      <Button type='primary' ghost onClick={addNewUser}>
        Thêm người dùng
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
        rowKey={'taiKhoan'}
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
      <Modal
        title={isNew ? 'Thêm mới người dùng' : 'Chỉnh sửa thông tin người dùng'}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <UserForm data={{ setIsModalVisible, isNew, editUserData }}></UserForm>
      </Modal>
    </Fragment>
  );
}
