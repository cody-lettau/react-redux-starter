import { browserHistory, Router, Route, Redirect } from 'react-router';
import React from 'react';
import App from './App';
import Dashboard from '../containers/dashboard/Dashboard';
import NoRouteMatch from '../containers/NoRouteMatch';

const Routes = () => (
  <Router history={browserHistory}>
    <Redirect from="/" to="/dashboard" />
    <Route path="/" component={App}>
      <Route path="dashboard" component={Dashboard} props={{ title: 'Dashboard' }} />
      <Route path="*" component={NoRouteMatch} props={{ title: 'Page Not Found' }} />
    </Route>
  </Router>
);

export default Routes;
