import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppTheme from '../resources/theme';
import { populateTitle } from '../resources/helpers';

const NoRouteMatch = React.createClass({
  propTypes: {
    onLoad: React.PropTypes.func.isRequired,
    route: React.PropTypes.object.isRequired,
    title: React.PropTypes.string,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object.isRequired,
  },

  getChildContext() {
    return { muiTheme: getMuiTheme(AppTheme) };
  },

  componentDidMount() {
    populateTitle(this.props);
  },

  render() {
    return (
      <div className="pagenotfound">
        <h1>Oops! Page Not Found.</h1>
        <RaisedButton
          label="Return to homepage"
          primary
          linkButton
          href="/"
        />
      </div>
    );
  },
});

export default NoRouteMatch;
