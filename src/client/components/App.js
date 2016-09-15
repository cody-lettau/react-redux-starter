import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Translator from 'i18n-react-loader';
import AppBar from '../containers/AppBar';
import AthensTheme from '../resources/theme';

const App = React.createClass({
  propTypes: {
    children: React.PropTypes.object,
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getInitialState() {
    const state = {
      localeKey: 'en', // TODO: Base this on current locale
    };
    const theme = { muiTheme: getMuiTheme(AthensTheme) };
    state.leftNavOpen = false;

    return Object.assign(state, theme);
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  changeLocale(localeKey) {
    if (this.state.localeKey !== localeKey) {
      Translator.setLocale(localeKey)
        .then(() => {
          this.setState({ localeKey });
        });
    }
  },

  render() {
    const currentLocale = Translator.getCurrentLocale();
    return (
      <div key={this.state.localeKey} className="app">
        <AppBar
          {...this.props}
          availableLocals={[{ key: 'en', label: 'English' }, { key: 'sp', label: 'Spanish' }]}
          changeLocale={this.changeLocale}
          locale={currentLocale}
        />
        <div style={{ padding: '10px' }} >
          {this.props.children}
        </div>
      </div>
    );
  },
});

export default App;
