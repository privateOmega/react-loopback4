import React, {useState} from 'react';
import {Drawer, Button} from 'antd';

import LeftMenu from './left-menu.component';
import RightMenu from './right-menu.component';
import './navbar.css';

const NavBar: React.FC = props => {
  const [visible, setVisible] = useState(false);

  return (
    <nav className="menu-bar">
      <div className="logo"></div>
      <div className="menu-group">
        <div className="left-menu">
          <LeftMenu />
        </div>
        <div className="right-menu">
          <RightMenu />
        </div>
        <Button className="bars-menu" onClick={() => setVisible(true)}>
          <span className="bars-button"></span>
        </Button>
        <Drawer
          placement="right"
          closable={false}
          onClose={() => setVisible(false)}
          visible={visible}
        >
          <LeftMenu />
          <RightMenu />
        </Drawer>
      </div>
    </nav>
  );
};

export default NavBar;
