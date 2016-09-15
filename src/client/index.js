import injectTapEventPlugin from 'react-tap-event-plugin';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Translator from 'i18n-react-loader';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import './css/index.css';
import reducers from './reducers';
import Routes from './components/Routes';
// import * as fetchHelpers from './resources/fetch.helpers';

const store = applyMiddleware(thunk)(createStore)(reducers);

try {
  injectTapEventPlugin();
} catch (err) {
  // injectTapEventPlugin called twice...do nothing
}

Translator.init({
  useExternalAPI: false,
  // apiURL: `${fetchHelpers.host()}/i18n/locales`,
  defaultLocale: 'en', // key for default locale
  localSupportedLocales: require('./resources/mock-data').LOCALES, // eslint-disable-line global-require
  localLocaleMap: {
    en: require('./locales/en.json'), // eslint-disable-line global-require
    sp: require('./locales/sp.json'), // eslint-disable-line global-require
  },
}).then(() => {
  ReactDOM.render(
    <Provider store={store}>
      <Routes />
    </Provider>,
    document.getElementById('ReactApp'));
});
