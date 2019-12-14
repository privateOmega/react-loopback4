import React from 'react';
import {Menu} from 'antd';
import {Link} from 'react-router-dom';

const {Item} = Menu;

const LeftMenu: React.FC = props => {
  return (
    <Menu mode="horizontal">
      <Item key="dashboard">
        <Link to="/dashboard">Dashboard</Link>
      </Item>
    </Menu>
  );
};

export default LeftMenu;
