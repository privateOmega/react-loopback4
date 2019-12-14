import React from 'react';
import {Menu} from 'antd';
import {RouteComponentProps, withRouter, Link} from 'react-router-dom';

import {authenticationServices} from '../../services';
import {useAuthDataContext} from '../authdata-provider.component';

const {Item} = Menu;

const RightMenu = (props: RouteComponentProps) => {
  const {onLogout} = useAuthDataContext();

  const handleLogout = () => {
    try {
      authenticationServices.logout();
    } catch (error) {
      // NOOP
    } finally {
      onLogout();
      localStorage.removeItem('user');
      props.history.push('/login');
    }
  };

  return (
    <Menu mode="horizontal">
      <Item key="logout">
        <Link to="#" onClick={handleLogout}>
          Logout
        </Link>
      </Item>
    </Menu>
  );
};

export default withRouter(RightMenu);
