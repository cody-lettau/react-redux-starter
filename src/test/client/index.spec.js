import sinon from 'sinon';
import { expect } from 'chai';
import ReactDOM from 'react-dom';
import Translator from 'i18n-react-loader';

describe('Client: Index', () => {
  let i18nSpy;
  let renderSpy;

  beforeEach(() => {
    i18nSpy = sinon.stub(Translator, 'init').returnsPromise().resolves();
    renderSpy = sinon.stub(ReactDOM, 'render', () => {});
  });

  afterEach(() => {
    i18nSpy.restore();
    renderSpy.restore();
  });

  // Just ensuring that render is ReactDom.render() is being called
  // This could use better tests for sure...
  it('Should render app', () => {
    delete require.cache[require.resolve('../../client/index')];
    require('../../client/index'); // eslint-disable-line global-require

    expect(i18nSpy).to.have.been.called();
    expect(renderSpy).to.have.been.called();
  });
});
