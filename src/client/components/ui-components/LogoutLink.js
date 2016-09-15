import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppTheme from '../../resources/theme';

const LogoutLink = React.createClass({
  propTypes: {
    marginTop: React.PropTypes.string,
    onClick: React.PropTypes.func.isRequired,
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

  render() {
    return (
      <RaisedButton
        label="Log Out"
        linkButton
        href="/logout"
        primary
        style={{ marginTop: this.props.marginTop }}
        onTouchTap={this.props.onClick()}
      />
  );
  },
});

export default LogoutLink;
