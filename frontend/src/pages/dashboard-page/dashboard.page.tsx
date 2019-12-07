import React from 'react';
import {Row, Col, Typography} from 'antd';
import './dashboard.css';

const {Title} = Typography;

const Login: React.FC = props => {
  return (
    <Row align="middle" justify="space-around" type="flex">
      <Col span={16}>
        <Title>Dashboard</Title>
      </Col>
    </Row>
  );
};

export default Login;
