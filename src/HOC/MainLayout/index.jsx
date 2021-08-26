import React from 'react';
import { Button, Col, Layout, Menu, Row, Space } from 'antd';
import logo from '../../logo.svg';
import { Link } from 'react-router-dom';
function MainLayout(props) {
  return (
    <Layout>
      <Layout.Header>
        <Row justify='space-between'>
          <Col span={2}>
            <img src={logo} alt='logo-brand' width='50%' />
          </Col>
          <Col>
            <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['home']}>
              <Menu.Item key='home'>
                <Link to='/home'>Home</Link>
              </Menu.Item>
              <Menu.Item key='news'>News</Menu.Item>
              <Menu.Item key='contact'>Contact</Menu.Item>
            </Menu>
          </Col>
          <Col>
            <Space>
              <Button>Sign In</Button>
              <Button>Sign Up</Button>
            </Space>
          </Col>
        </Row>
      </Layout.Header>
      <Layout.Content>{props.children}</Layout.Content>
    </Layout>
  );
}

export default MainLayout;
