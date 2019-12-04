import React from 'react';
import {Row, Col, Typography} from 'antd';
const {Title} = Typography;

interface RouteWithLayoutProps {
  layout: React.ReactNode;
  component: React.ReactNode;
}

const NotFound = (props: RouteWithLayoutProps) => {
  return (
    <Row align="middle" justify="space-around" type="flex">
      <Col span={16}>
        <Title>404: The page you are looking for isn’t here</Title>
        <Title level={4}>
          You either tried some shady route or you came here by mistake. Use the
          navigation either way.
        </Title>
      </Col>
    </Row>
  );
};

export default NotFound;
