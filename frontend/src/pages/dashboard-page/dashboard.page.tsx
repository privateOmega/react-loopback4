import React from 'react';
import {Row, Col, Typography} from 'antd';

import './dashboard.css';
import {useAuthDataContext} from '../../components/authdata-provider.component';

const {Title} = Typography;

const Login: React.FC = props => {
  const {user} = useAuthDataContext();
  return (
    <Row align="middle" justify="space-around" type="flex">
      <Col span={16}>
        <Title>Dashboard {user.name}</Title>
      </Col>
    </Row>
  );
};

export default Login;
