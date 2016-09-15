import React from 'react';
import { browserHistory } from 'react-router';
import MUIAppBar from 'material-ui/AppBar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Drawer from 'material-ui/Drawer';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import AppTheme from '../resources/theme';

const AppBar = React.createClass({
  propTypes: {
    availableLocals: React.PropTypes.array,
    changeLocale: React.PropTypes.func,
    title: React.PropTypes.string,
    location: React.PropTypes.object,
    locale: React.PropTypes.object,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object.isRequired,
  },

  getInitialState() {
    return {
      leftNavOpen: false,
      localeMenuOpen: false,
    };
  },

  getChildContext() {
    return { muiTheme: getMuiTheme(AppTheme) };
  },

  handleMenuOpen() {
    this.setState({
      leftNavOpen: !this.state.leftNavOpen,
    });
  },

  handleLocaleMenuOpen() {
    this.setState({
      localeMenuOpen: !this.state.localeMenuOpen,
    });
  },

  handleLeftNavClientRoute(route) {
    this.setState({
      leftNavOpen: false,
    });
    browserHistory.push(route + this.props.location.search);
  },

  handleLeftNavServerRoute(route) {
    this.setState({
      leftNavOpen: false,
    });
    window.location = route;
  },

  render() {
    const availableLocals = this.props.availableLocals || [];

    return (
      <div>
        <MUIAppBar
          title={this.props.title}
          showMenuIconButton
          onLeftIconButtonTouchTap={this.handleMenuOpen}
          iconElementRight={
            (() => {
              if (!this.props.locale) { return null; }
              return (
                <div className="locale-menu">
                  <IconMenu
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'middle' }}
                    iconButtonElement={<IconButton>Locale</IconButton>}
                    open={this.state.localeMenuOpen}
                  >
                    {availableLocals.map((loc) => (
                      <MenuItem
                        key={loc.key}
                        className="locale-menu-btn"
                        onTouchTap={() => {
                          this.props.changeLocale(loc.key);
                          this.handleLocaleMenuOpen();
                        }}
                        primaryText={loc.label}
                      />
                    ))}
                  </IconMenu>
                  <FlatButton
                    onTouchTap={this.handleLocaleMenuOpen}
                    label={this.props.locale.label}
                    style={{ color: '#fff', height: '48px' }}
                  />
                </div>
              );
            })()
          }
        />
        <Drawer
          docked={false}
          open={this.state.leftNavOpen}
          onRequestChange={(leftNavOpen) => this.setState({ leftNavOpen })}
        >
          <MenuItem
            onTouchTap={() => { this.handleLeftNavClientRoute('/dashboard'); }}
          >Dashboard</MenuItem>
          <Divider />
          <MenuItem
            onTouchTap={() => { this.handleLeftNavServerRoute('/logout'); }}
          >Log Out</MenuItem>
        </Drawer>
      </div>
    );
  },
});

export default AppBar;
