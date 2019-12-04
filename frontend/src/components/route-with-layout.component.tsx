import React from 'react';
import {Route} from 'react-router-dom';

type RouteWithLayoutProps = {
  path: string;
  layout: React.ReactType;
  component: React.ReactType;
  exact: boolean;
};

const RouteWithLayout = (props: RouteWithLayoutProps) => {
  const {layout: Layout, component: Component, ...rest} = props;

  return (
    <Route
      render={matchProps => (
        <Layout>
          <Component {...matchProps} />
        </Layout>
      )}
      {...rest}
    ></Route>
  );
};

export default RouteWithLayout;
