import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { Route } from 'react-router-dom';
import { useEffect } from 'react';

const { Sider, Content } = Layout;

export default function UserLayout(props) {
  return (
    <Layout>
      <Sider
        width="50vw"
        style={{
          height: "100vh",
          backgroundImage: `url(https://picsum.photos/500)`,
          backgroundSize: '100%',
        }}
      ></Sider>
      <Content>{props.children}</Content>
    </Layout>
  );
}
