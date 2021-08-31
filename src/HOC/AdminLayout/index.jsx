import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { DesktopOutlined, FileOutlined, UserOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
const { Header, Content, Sider } = Layout;

const { SubMenu } = Menu;

export default function AdminLayout(props) {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className='logo' />
        <Menu theme='dark' defaultSelectedKeys={['1']} mode='inline'>
          <Menu.Item key='1' icon={<UserOutlined />}>
            User
          </Menu.Item>
          <SubMenu key='sub1' icon={<FileOutlined />} title='Films'>
            <Menu.Item key='2'>
              <NavLink to='/admin/films'>Films</NavLink>
            </Menu.Item>
            <Menu.Item key='3'>
              <NavLink to='/admin/films/addnew'>Add new</NavLink>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key='4' icon={<DesktopOutlined />}>
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
