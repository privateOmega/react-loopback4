import React from 'react';
import {BrowserRouter as Router, Switch, Redirect} from 'react-router-dom';

import './App.css';
import {RouteWithLayout} from './components';
import {Minimal as MinimalLayout} from './layouts';
import {NotFound as NotFoundPage} from './pages';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Redirect from="/" to="/dashboard" exact />
          <RouteWithLayout
            path="/not-found"
            layout={MinimalLayout}
            component={NotFoundPage}
            exact
          />
          <Redirect to="/not-found" />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
