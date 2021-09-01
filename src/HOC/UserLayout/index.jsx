import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { Route } from 'react-router-dom';
import { useEffect } from 'react';

const { Sider, Content } = Layout;



export default function UserLayout(props) {
  const [{ width, height }, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    window.onresize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
  }, []);
  return (
    <Layout>
      <Sider
        width={Math.round(width / 2)}
        style={{
          height: height,
          backgroundImage: `url(https://picsum.photos/500)`,
          backgroundSize: '100%',
        }}
      ></Sider>
      <Content>{props.children}</Content>
    </Layout>
  );
}
