import React from 'react';

import {NavBar} from '../components';

const Main: React.FC = props => {
  const {children} = props;

  return (
    <>
      <NavBar />
      <main>{children}</main>
    </>
  );
};

export default Main;
