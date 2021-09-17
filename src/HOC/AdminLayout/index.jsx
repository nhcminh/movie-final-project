import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { DesktopOutlined, FileOutlined, UserOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
const { Header, Content, Sider } = Layout;

const { SubMenu } = Menu;

export default function AdminLayout(props) {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed) => {
    console.log(collapsed);
    setCollapsed(collapsed);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className='logo' />
        <Menu theme='dark' defaultSelectedKeys={['1']} mode='inline'>
          <SubMenu key='sub1' icon={<UserOutlined />} title='Users'>
            <Menu.Item key='2'>
              <NavLink to='/admin/users'>Users</NavLink>
            </Menu.Item>
          </SubMenu>
          <SubMenu key='sub2' icon={<FileOutlined />} title='Films'>
            <Menu.Item key='4'>
              <NavLink to='/admin/films'>Films</NavLink>
            </Menu.Item>
            <Menu.Item key='5'>
              <NavLink to='/admin/films/addnew'>Add new</NavLink>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key='6' icon={<DesktopOutlined />}>
            Showtime
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className='site-layout'>
        <Header className='site-layout-background' style={{ padding: 0 }} />
        <Content style={{ margin: '10px 16px' }}>{props.children}</Content>
      </Layout>
    </Layout>
  );
}
