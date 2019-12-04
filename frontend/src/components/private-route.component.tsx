import React from 'react';
import {Redirect} from 'react-router-dom';

import {useAuthDataContext} from './authdata-provider.component';
import RouteWithLayout from './route-with-layout.component';

type PrivateRouteProps = {
  path: string;
  layout: React.ReactType;
  component: React.ReactType;
  exact: boolean;
};

const PrivateRoute = (props: PrivateRouteProps) => {
  const authData = useAuthDataContext();

  if (authData && authData.user) {
    return <RouteWithLayout {...props} />;
  } else {
    return <Redirect to="/not-found" />;
  }
};

export default PrivateRoute;