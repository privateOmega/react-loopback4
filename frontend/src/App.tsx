import React from 'react';
import {BrowserRouter as Router, Switch, Redirect} from 'react-router-dom';

import './App.css';
import {RouteWithLayout, AuthDataProvider, PrivateRoute} from './components';
import {Minimal as MinimalLayout, Main as MainLayout} from './layouts';
import {
  NotFound as NotFoundPage,
  Login as LoginPage,
  Register as RegisterPage,
  Forgot as ForgotPage,
  Dashboard as DashboardPage,
} from './pages';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <AuthDataProvider>
          <Switch>
            <Redirect from="/" to="/dashboard" exact />
            <RouteWithLayout
              path="/login"
              layout={MinimalLayout}
              component={LoginPage}
              exact
            />
            <RouteWithLayout
              path="/register"
              layout={MinimalLayout}
              component={RegisterPage}
              exact
            />
            <RouteWithLayout
              path="/forgot"
              layout={MinimalLayout}
              component={ForgotPage}
              exact
            />
            <RouteWithLayout
              path="/not-found"
              layout={MinimalLayout}
              component={NotFoundPage}
              exact
            />
            <PrivateRoute
              path="/dashboard"
              layout={MainLayout}
              component={DashboardPage}
              exact
            />
            <Redirect to="/not-found" />
          </Switch>
        </AuthDataProvider>
      </div>
    </Router>
  );
};

export default App;
