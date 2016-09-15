import jsdom from 'jsdom';
import chai from 'chai';
import dirtyChai from 'dirty-chai';
import sinonChai from 'sinon-chai';
import sinon from 'sinon';
import sinonStubPromise from 'sinon-stub-promise';
import 'isomorphic-fetch';
import timekeeper from 'timekeeper';
import injectTapEventPlugin from 'react-tap-event-plugin';

const doc = jsdom.jsdom('<!doctype html><html><body><div id="ReactApp"></div></body></html>');
const win = doc.defaultView;
const location = win.location;

// Setup globals for use with tests
global.document = doc;
global.window = win;
global.fetch = fetch;
global.timekeeper = timekeeper;
global.location = location;

Object.keys(window).forEach((key) => {
  if (!(key in global)) {
    global[key] = window[key];
  }
});

global.navigator = {
  userAgent: 'node.js',
};

chai.use(dirtyChai);
chai.use(sinonChai);
sinonStubPromise(sinon);

// This is a *quick* fix to handle multiple injection of the same
// plugin when using --watch script
try {
  injectTapEventPlugin();
} catch(err) {
  // do nothing...
}

console.log('-------------- START OF TESTS --------------');
